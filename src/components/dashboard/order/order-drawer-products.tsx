import { Order } from '@/types/order'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { dinarFormat, removeComma } from '../../../utils/formats'
import { Scrollbar } from '../../scrollbar'
import OrderDrawerAddProduct from './order-drawer-add-product'
import OrderProductRow from './order-product-row'
import NoData from '@/components/no-data'

type CompProps = {
  loading: boolean
  order: Order
  onUpdate: (infoToUpdate: any, helpers?: any) => any
}

const OredrDrawerProducts = (props: CompProps) => {
  const { loading, order, onUpdate } = props
  const products = order?.products
  const delivery_price = order?.delivery_price
  const total_price = order?.total_price
  const sub_total_purchase_price = order?.sub_total_purchase_price
  const price = order?.price
  const profit_margin = order?.profit_margin


  const { t } = useTranslation()

  const updateSellingPrice = (id: number, sellingPrice: number) => {
    const newProducts = products.map((product: any) => {
      const {
        order_product: { product_id, price, quantity },
      } = product
      return product.id === id
        ? { product_id, price: sellingPrice, quantity }
        : { product_id, price, quantity }
    })
    onUpdate({ products: newProducts })
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    const newProducts = products.map((product: any) => {
      const {
        order_product: { product_id, price, quantity },
      } = product
      return product.id === id
        ? { product_id, price, quantity: newQuantity }
        : { product_id, price, quantity }
    })
    onUpdate({ products: newProducts })
  }

  const handleAddProduct = (product: {
    price: number
    product_id: number
    quantity: number
  }) => {
    let newProducts = order && order?.products.map((pr: any) => {
      return {
        product_id: pr.id,
        price: pr?.order_product?.price,
        quantity: pr?.order_product.quantity,
      }
    })
    if (Boolean(newProducts.find((pro: any) => pro.id === product.product_id)))
      return
    newProducts.push(product)
    onUpdate({ products: newProducts })
  }

  const handleDeleteProduct = (id: number) => {
    let newProducts = order?.products.map((pr: any) => {
      return {
        product_id: pr.id,
        price: pr?.order_product?.price,
        quantity: pr?.order_product.quantity,
      }
    })
    newProducts = newProducts.filter((pr: any) => pr.product_id !== id)
    onUpdate({ products: newProducts })
  }

  return (
    <>
      {loading && <Card sx={{ mt: 5 }}>
        <CardHeader
          title={t('cart.Cart')}
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        />
        <CardContent sx={{ p: 0 }}>
          {products?.length !== 0 && <NoData />}
          <TableContainer>
            <Scrollbar>
              <Table sx={{ minWidth: 650 }}>
                <TableBody>
                  {products?.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Skeleton
                            variant="text"
                            width={40}
                            height={70}
                            sx={{ borderRadius: '25px' }}
                          />
                          <Box>
                            <Skeleton
                              variant="text"
                              width={70}
                              height={25}
                              sx={{ borderRadius: '15px' }}
                            />
                            <Skeleton
                              variant="text"
                              width={40}
                              height={25}
                              sx={{ borderRadius: '15px' }}
                            />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton
                          variant="text"
                          width={70}
                          height={25}
                          sx={{ borderRadius: '15px' }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton
                          variant="text"
                          width={70}
                          height={25}
                          sx={{ borderRadius: '15px' }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton
                          variant="text"
                          width={15}
                          height={25}
                          sx={{ borderRadius: '5px' }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Skeleton
                          variant="text"
                          width={70}
                          height={25}
                          sx={{ borderRadius: '15px' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Skeleton
                        variant="text"
                        width={70}
                        height={25}
                        sx={{ borderRadius: '15px' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton
                        variant="text"
                        width={70}
                        height={25}
                        sx={{ borderRadius: '15px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Skeleton
                        variant="text"
                        width={40}
                        height={25}
                        sx={{ borderRadius: '15px' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton
                        variant="text"
                        width={40}
                        height={25}
                        sx={{ borderRadius: '15px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Skeleton
                        variant="text"
                        width={70}
                        height={25}
                        sx={{ borderRadius: '15px' }}
                      />
                    </TableCell>
                    <TableCell color="success">
                      <Skeleton
                        variant="text"
                        width={70}
                        height={25}
                        sx={{ borderRadius: '15px' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Skeleton
                        variant="text"
                        width={40}
                        height={25}
                        sx={{ borderRadius: '15px' }}
                      />
                    </TableCell>
                    <TableCell color="success">
                      <Skeleton
                        variant="text"
                        width={70}
                        height={25}
                        sx={{ borderRadius: '15px' }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </CardContent>
      </Card>}
      <Card sx={{ mt: 3 }}>
        <CardHeader
          title={t('Cart')}
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        />
        <CardContent sx={{ p: 0, width: '100%', minWidth: '100%' }}>
          <Scrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('Attributes.Name')}</TableCell>
                  <TableCell>{t('Attributes.Price')}</TableCell>
                  <TableCell>{t('Attributes.Selling price')}</TableCell>
                  <TableCell>{t('Attributes.QTY')}</TableCell>
                  <TableCell>{t('Attributes.Selling Price total')}</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((item: any, index: number) => (
                  <OrderProductRow
                    totalProducts={products?.length}
                    Editable={true}
                    key={'item' + index}
                    product={item}
                    updateQuantity={updateQuantity}
                    updateSellingPrice={updateSellingPrice}
                    onDelete={handleDeleteProduct}
                  />
                ))}
                <TableRow>
                  <TableCell colSpan={6}>
                    <OrderDrawerAddProduct
                      order={order}
                      selectedProducts={products}
                      onAdd={handleAddProduct}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    {t('Attributes.Selling price sub-total')}{' '}

                  </TableCell>
                  <TableCell>
                    <Typography noWrap variant="inherit">
                      {dinarFormat(sub_total_purchase_price)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    {t('Attributes.Price sub-total')}{' '}
                  </TableCell>
                  <TableCell>
                    <Typography noWrap variant="inherit">
                      {dinarFormat(price)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    {' '}
                    {t('Attributes.Profit Margin')}{' '}
                  </TableCell>
                  <TableCell color="success">
                    <Typography noWrap variant="h6" color="success.main">
                      {dinarFormat(profit_margin)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    {' '}
                    {t('Attributes.Delivery')}{' '}
                  </TableCell>
                  <TableCell color="success">
                    <Typography noWrap variant="h6" color="text.primary">
                      {dinarFormat(delivery_price)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography noWrap variant="h6" color="text.primary">
                      {t('Attributes.Total')}
                    </Typography>
                  </TableCell>
                  <TableCell color="">
                    <Typography noWrap variant="h6" color="text.primary">
                      {dinarFormat(total_price)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Scrollbar>
        </CardContent>
      </Card>
    </>
  )
}

export default OredrDrawerProducts
