import { Product } from '@/types/product'
import { Fade, Paper, Popper, Typography, Box } from '@mui/material'
import { AnyARecord } from 'dns'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

//local imports
import { useSearchProductsQuery } from '../../../queries/product'
import { debounce } from '../../../utils/debounce'
import { InputField } from '../../input-field'
import TableLoading from '../../table-loading'
import ProductToSelectRow from '../productto-select-row'

type CompProps = {
  onApplyFilter: (newFilter: any) => void
  filter: any
  value: string
}

const OrderSearchProductFilter = (props: CompProps) => {
  const { onApplyFilter, filter, value } = props
  const { t } = useTranslation()
  const [term, setTerm] = useState('')
  const searchRef = useRef(null) as any
  const {
    data: searchedProducts,
    isLoading,
    isError,
    error,
  } = useSearchProductsQuery({ term, options: {} }) as any
  const popTarget = useRef(null) as any
  const [openPoper, setOpenPoper] = useState(false)

  const handleSearchChange = (e: any) => {
    setTerm(e.target.value)
  }

  useEffect(() => {
    if (!filter.product) {
      setTerm('')
    }
  }, [filter.product])

  return (
    <>
      <Box>
        <InputField
          fullWidth
          label={t('Attributes.Product Name')}
          onBlur={() => setOpenPoper(false)}
          value={term}
          onChange={handleSearchChange}
          InputProps={{
            onFocus: () => setOpenPoper(true),
          }}
        />
        <div ref={popTarget} style={{ width: '100%' }}></div>
      </Box>
      <Popper
        sx={{ width: `${popTarget.current?.clientWidth}px`, zIndex: 4000 }}
        open={openPoper}
        anchorEl={popTarget.current}
        placement="bottom"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ maxHeight: '220px', overflow: 'auto' }}>
              {searchedProducts && searchedProducts.length > 0 ? (
                <Box>
                  {searchedProducts.map((product: Product) => {
                    return (
                      <ProductToSelectRow
                        key={product.id}
                        product={product}
                        handleAdd={() => {
                          onApplyFilter({ ...filter, product: product.name })
                          setOpenPoper(false)
                          setTerm(product.name)
                        }}
                        isSelected={() => false}
                      />
                    )
                  })}
                </Box>
              ) : isLoading ? (
                <TableLoading />
              ) : (
                <Box sx={{ p: 1 }}>
                  <Typography variant="caption" color="secondary">
                    No results
                  </Typography>
                </Box>
              )}
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default OrderSearchProductFilter
