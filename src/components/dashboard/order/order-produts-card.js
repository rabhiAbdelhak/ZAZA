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
import OrderProductRow from './order-product-row'

const OrderProductsCard = ({ loading, order, Editable }) => {
  const products = order?.products
  const delivery_price = order?.delivery_price
  const { t } = useTranslation()
  const totalSellingPrice = useMemo(() => {
    return products?.reduce((accu, product) => {
      const sellingPrice =
        product?.selling_price || product?.order_product?.price
      return sellingPrice * product?.quantity + accu
    }, 0)
  }, [products])

  const totalPrice = useMemo(() => {
    return products?.reduce((accu, product) => {
      return removeComma(product.price) * product?.quantity + accu
    }, 0)
  }, [products])

  if (loading) {
    return (
      <Card sx={{ mt: 5 }}>
        <CardHeader
          title={t('cart.Cart')}
          sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
        />
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Scrollbar>
              <Table sx={{ minWidth: 650 }}>
                <TableBody>
                  {products?.map((item) => (
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
      </Card>
    )
  }

  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader
        title={t('Cart')}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      <CardContent sx={{ p: 0 }}>
        <Scrollbar>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell>{t('Attributes.Name')}</TableCell>
                <TableCell>{t('Attributes.Price')}</TableCell>
                <TableCell>{t('Attributes.Selling price')}</TableCell>
                <TableCell>{t('Attributes.QTY')}</TableCell>
                <TableCell>{t('Attributes.Selling Price total')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item) => (
                <OrderProductRow
                  key={item.product_id}
                  product={item}
                  Editable={Editable}
                />
              ))}
              <TableRow>
                <TableCell colSpan={4}>
                  {t('Attributes.Selling price sub-total')}{' '}
                </TableCell>
                <TableCell>
                  <Typography noWrap variant="inherit">
                    {dinarFormat(totalSellingPrice)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  {t('Attributes.Price sub-total')}{' '}
                </TableCell>
                <TableCell>
                  <Typography noWrap variant="inherit">
                    {dinarFormat(totalPrice)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  {' '}
                  {t('Attributes.Profit Margin')}{' '}
                </TableCell>
                <TableCell color="success">
                  <Typography noWrap variant="h6" color="success.main">
                    {dinarFormat(totalSellingPrice - totalPrice)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}> {t('Attributes.Delivery')} </TableCell>
                <TableCell color="success">
                  <Typography noWrap variant="h6" color="text.primary">
                    {dinarFormat(delivery_price)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography noWrap variant="h6" color="text.primary">
                    {t('Attributes.Total')}
                  </Typography>
                </TableCell>
                <TableCell color="">
                  <Typography noWrap variant="h6" color="text.primary">
                    {dinarFormat(totalPrice + delivery_price)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Scrollbar>
      </CardContent>
    </Card>
  )
}

export default OrderProductsCard
