import React from 'react'
import PropTypes from 'prop-types'
import { getDeliveryCompanies } from '../../../../queries/delivery'
import { Alert, Button, CircularProgress, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import NoData from '@/components/no-data'
import { Refresh } from '@mui/icons-material'
import Image from 'next/image'
import ZimouRadio from '@/components/ZimouRadio'

function GetCompaniesInput({ onChangeValue, wilayaId, companyId }: any) {
  const { data, isLoading, error, refetch } = getDeliveryCompanies(wilayaId)

  const { t } = useTranslation()
  return (
    <>
      {data?.data.length == 0 && (
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
      {data &&
        <div
          className="zimou-checks"
          style={{ flexWrap: 'wrap', position: 'relative' }}
        >
          {data?.data.map((item: any) => (
            <ZimouRadio
              key={item.id}
              className="zimou-check-item"
              checked={companyId == item.id}
              width={'25%'}
              onChangeValue={onChangeValue}
              name="delivery_company_id"
              value={item.id}
              id={item.id}
            >
              {item.logo && <Image src={item.logo} width={150} height={60} alt={item.name} />}
              <Typography sx={{
                opacity: item.logo ? 0 : 1,
                fontSize: item.logo ? 13 : 14,
                marginTop: item.logo ? 1 : 0,
                transform: item.logo ? 'translateY(30px)' : 'translateY(0px)'
              }}
                className={item.logo ? 'text-name' : 'text-name-only'}>{item.name}</Typography>
            </ZimouRadio>
          ))}
        </div>
      }
    </>
  )
}

GetCompaniesInput.propTypes = {
  onChangeValue: PropTypes.func,
  wilayaId: PropTypes.any,
  companyId: PropTypes.any,
}

export default GetCompaniesInput
