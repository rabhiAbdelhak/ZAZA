import { alpha, Box, Button, Skeleton, Tabs, Typography } from '@mui/material'
import { FormHelperText, Tab } from '@mui/material/node'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  useDeliveryWilayaIdQuery,
  getDeliveryCompanies,
  useOfficeDeliveryQuery,
} from '../queries/delivery'
import { useEffect, useState } from 'react'
import { dinarFormat } from '../utils/formats'
import Image from 'next/image'
import DeliverySkeleton from './dashboard/order/OrderDelivery/DeliverySkeleton'
import GetCompaniesInput from './dashboard/order/OrderDelivery/GetCompaniesInput'
function DeliveryItem({
  title,
  price,
  address,
  selected = false,
  onClick,
  image = `/apple-touch-icon.png`,
  sx,
}) {
  const hasPrice = typeof price !== 'undefined'
  return (
    <Button
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        border: '2px solid',
        borderRadius: '8px',
        textAlign: 'left',
        px: 2,
        py: 1,
        gap: 0.01,
        minHeight: 60,
        borderColor: selected ? 'primary.main' : 'divider',
        '& > *': {
          display: 'block',
        },
        ...(selected && {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
        }),
        ...sx,
      }}
      onClick={onClick}
    >
      {title && (
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>
      )}
      {hasPrice && (
        <Typography variant="caption" color="text.primary" noWrap>
          {dinarFormat(price)}
        </Typography>
      )}
      {address && (
        <Typography variant="caption" color="text.secondary">
          {address}
        </Typography>
      )}
      {image && <Image src={image} width={40} height={40} alt="" />}
    </Button>
  )
}
function DeliveryCompanyImage({
  selected = false,
  sx,
  image = `/apple-touch-icon.png`,
  id,
  handleChange,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        border: '2px solid',
        borderRadius: '8px',
        textAlign: 'left',
        px: 2,
        py: 1,
        marginBottom: 3,
        gap: 0.01,
        minHeight: 60,
        borderColor: selected ? 'primary.main' : 'divider',
        '& > *': {
          display: 'block',
        },
        ...(selected && {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
        }),
        ...sx,
      }}
    >
      <input
        type="radio"
        id={`delevery-img-radio-${id}`}
        onChange={handleChange}
        name="deleveryImgRadio"
        value={id}
      />
      <label htmlFor={`delevery-img-radio-${id}`}>
        <Image src={image} width={40} height={40} alt="" />
      </label>
    </Box>
  )
}

DeliveryItem.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  address: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  sx: PropTypes.object,
}

function DeliveryCategoryInput({
  isOfficeDelivery = false,
  onChangeValue,
  sx,
}) {
  const { t } = useTranslation()
  const changeHandler = (isOffice) => () => {
    if (onChangeValue) {
      onChangeValue(isOffice)
    }
  }
  return (
    <Box
      display="flex"
      gap={2}
      sx={{ '& > button': { flex: 1, alignItems: 'center' } }}
    >
      <DeliveryItem
        onClick={changeHandler(false)}
        title={t('delivery.DirectDelivery')}
        selected={!isOfficeDelivery}
      />
      <DeliveryItem
        onClick={changeHandler(true)}
        title={t('delivery.RelayPoint')}
        selected={isOfficeDelivery}
      />
    </Box>
  )
}

DeliveryCategoryInput.propTypes = {
  isOfficeDelivery: PropTypes.bool,
  onChangeValue: PropTypes.func,
  sx: PropTypes.object,
}

function DirectDeliveryInput({ value, onChangeValue, wilayaId }) {
  const { data, isLoading } = useDeliveryWilayaIdQuery(wilayaId, {
    enabled: Boolean(wilayaId),
  })
  const changeHandler = (type) => () => {
    if (onChangeValue) {
      onChangeValue({
        delivery_type_id: type.delivery_type_id,
        delivery_type_name: type.name,
        office_id: '',
        price: type.price,
      })
    }
  }

  if (isLoading) {
    return <DeliverySkeleton />
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: 'repeat(auto-fit, minmax(148px, 1fr))',
      }}
    >
      {data?.map((item) => (
        <DeliveryItem
          key={item.delivery_type_id}
          onClick={changeHandler(item)}
          title={item.name}
          price={item.price}
          selected={item.delivery_type_id === value}
        />
      ))}
    </Box>
  )
}

DirectDeliveryInput.propTypes = {
  value: PropTypes.number,
  wilayaId: PropTypes.number,
  onChangeValue: PropTypes.func,
}

function OfficeDeliveryInput({ value, onChangeValue, wilayaId }) {
  const { t } = useTranslation()
  const { data, isLoading } = useOfficeDeliveryQuery(
    {
      'filter[wilaya_id]': wilayaId,
      include: 'societe_partenaire.user,commune',
    },
    {
      enabled: Boolean(wilayaId),
    },
  )

  const providers =
    data?.reduce((prev, next) => {
      const find = prev.find(
        (el) => el.id === next.societe_partenaire?.user?.id,
      )
      return find
        ? prev
        : [
            ...prev,
            {
              id: next.societe_partenaire?.user?.id,
              name: next.societe_partenaire?.user?.name,
            },
          ]
    }, []) || []

  const [selectedProviderId, setSelectedProviderId] = useState(0)

  const filterDate = data?.filter(
    (el) =>
      el.societe_partenaire?.user.id === providers[selectedProviderId]?.id,
  )

  useEffect(() => {
    setSelectedProviderId(0)
  }, [wilayaId])

  const changeHandler = (office) => () => {
    if (onChangeValue) {
      onChangeValue({
        delivery_type_id: 3,
        delivery_type_name: t('delivery.RelayPoint'),
        office_id: office.id,
        price: office.delivery_price,
      })
    }
  }

  const changeTab = (tabIndex) => {
    setSelectedProviderId(tabIndex)
    if (onChangeValue) {
      onChangeValue({
        delivery_type_id: 3,
        delivery_type_name: t('delivery.RelayPoint'),
        office_id: '',
        price: '',
      })
    }
  }

  if (isLoading) {
    return <DeliverySkeleton />
  }

  return (
    <Box>
      <Tabs
        sx={{ mb: 2 }}
        onChange={(event, value) => changeTab(value)}
        value={selectedProviderId}
        allowScrollButtonsMobile
      >
        {providers.map((el, index) => (
          <Tab key={el.id} label={el.name} value={index} />
        ))}
      </Tabs>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fit, minmax(148px, 1fr))',
        }}
      >
        {filterDate?.map((item) => (
          <DeliveryItem
            key={item.id}
            onClick={changeHandler(item)}
            title={item?.commune.name}
            price={item.delivery_price}
            selected={item.id === value}
          />
        ))}
      </Box>
    </Box>
  )
}

OfficeDeliveryInput.propTypes = {
  value: PropTypes.number,
  wilayaId: PropTypes.number,
  onChangeValue: PropTypes.func,
}

export default function DeliveryPriceInput({
  wilayaId,
  onChange,
  error = false,
  helperText = '',
  typeId,
  officeId,
}) {
  const [isOfficeDelivery, setIsOfficeDelivery] = useState(
    Boolean(typeId === 3),
  )
  const { t } = useTranslation()

  useEffect(() => {
    setIsOfficeDelivery(typeId === 3)
  }, [typeId])

  const onChangeCategorie = (isDelivery) => {
    if (isDelivery === isOfficeDelivery) {
      return
    }

    if (onChange) {
      onChange({
        delivery_type_id: isDelivery ? 3 : '',
        delivery_type_name: t('delivery.RelayPoint'),
        office_id: '',
      })
    }
  }

  const hasWilaya = Boolean(wilayaId)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="subtitle2" color="text.primary" gutterBottom>
            {t('delivery.DeliveryType')}
          </Typography>

          {/* {hasWilaya && (
            <GetCompaniesInput
              wilayaId={wilayaId}
              onChangeValue={onChange}
              //value={typeId}
            />
          )} */}

          {hasWilaya && (
            <DeliveryCategoryInput
              isOfficeDelivery={isOfficeDelivery}
              onChangeValue={onChangeCategorie}
            />
          )}

          {!hasWilaya && (
            <Box
              sx={{ padding: 2, bgcolor: 'neutral.100', textAlign: 'center' }}
            >
              <Typography variant="caption" color="info.main">
                {t('delivery.noWilayaSelected')}
              </Typography>
            </Box>
          )}
        </Box>

        {hasWilaya && (
          <Box>
            <Typography variant="subtitle2" color="text.primary" gutterBottom>
              {t('delivery.DeliveryProvider')}
            </Typography>

            {!isOfficeDelivery && (
              <DirectDeliveryInput
                value={typeId}
                wilayaId={wilayaId}
                onChangeValue={onChange}
              />
            )}

            {isOfficeDelivery && (
              <OfficeDeliveryInput
                value={officeId}
                wilayaId={wilayaId}
                onChangeValue={onChange}
              />
            )}
          </Box>
        )}
      </Box>
      <FormHelperText sx={{ mt: 1 }} error={error}>
        {helperText}
      </FormHelperText>
    </>
  )
}

DeliveryPriceInput.propTypes = {
  onChange: PropTypes.func,
  typeId: PropTypes.number,
  officeId: PropTypes.number,
  wilayaId: PropTypes.number,
  error: PropTypes.bool,
  helperText: PropTypes.string,
}
