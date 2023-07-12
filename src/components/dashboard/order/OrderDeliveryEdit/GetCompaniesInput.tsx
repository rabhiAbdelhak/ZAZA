import React from 'react'
import PropTypes from 'prop-types'
import { getDeliveryCompanies } from '../../../../queries/delivery'
import { Alert, Button, Box, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import NoData from '@/components/no-data'
import { Refresh } from '@mui/icons-material'
import Image from 'next/image'
import ZimouRadio from '@/components/ZimouRadio'

function GetCompaniesInput({ onChangeValue, wilayaId, companyId, setFieldValue }: any) {
  const { data, isLoading, error, refetch } = getDeliveryCompanies(wilayaId)
  const { t } = useTranslation()
  return (
    <Box sx={{ paddingInline: 7 }}>
      {data && data.data.length == 0 && (
        <>
          <NoData />{' '}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {' '}
            <Button
              variant="text"
              startIcon={isLoading ? <CircularProgress /> : <Refresh />}
              sx={{
                width: '70%',
                marginTop: 2,
              }}
              onClick={() => refetch()}
            >
              {t('Refresh')}
            </Button>{' '}
          </div>
        </>
      )}

      {isLoading && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBlock: 27,
          }}
        >
          <CircularProgress />
        </div>
      )}
      {error && (
        <Alert severity="error">
          {t('error_unexpected')}{' '}
          <a
            onClick={() => refetch()}
            style={{ fontWeight: 700, cursor: 'pointer' }}
          >
            {t('try_again')}
          </a>
        </Alert>
      )}
      <div
        className="zimou-checks"
        style={{ flexWrap: 'wrap', position: 'relative' }}
      >
        {data &&
          data?.data.map((item: any) => (
            <ZimouRadio
              key={item.id}
              className="zimou-check-item"
              checked={companyId == item.id}
              width={'25%'}
              onChangeValue={setFieldValue}
              name="delivery_company_id"
              value={item.id}
              id={item.id}
            >
              <Image src={item.logo} width={150} height={60} alt={item.name} />
            </ZimouRadio>
          ))}
      </div>
    </Box>
  )
}

GetCompaniesInput.propTypes = {
  onChangeValue: PropTypes.func,
  wilayaId: PropTypes.any,
  setFieldValue: PropTypes.func,
  companyId: PropTypes.any,
}

export default GetCompaniesInput
