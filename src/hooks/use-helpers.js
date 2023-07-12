import { useEffect, useRef, useState } from 'react'
import * as helpersApi from '../api/helpers'
import {
  AttachMoneyOutlined,
  AutoAwesomeSharp,
  CloudDoneOutlined,
  StorefrontOutlined,
  ViewInArOutlined,
} from '@mui/icons-material'

const delivery_prices = []
const useHelpers = (wilaya_id, setFieldValue) => {
  const [helpers, setHelpers] = useState({
    deliveryTypes: delivery_prices,
    storePaymentSatuses: [],
    packageTypes: [],
    wilayas: [],
    communes: [],
  })

  const firstUpdate = useRef(true)

  useEffect(() => {
    const asnycFn = async () => {
      const result = await helpersApi.getHelpers()
      if (result?.data) {
        const { wilayas, storePaymentSatuses, packageTypes } = result.data
        setHelpers((prev) => {
          return { ...prev, wilayas, storePaymentSatuses, packageTypes }
        })
      }
    }
    asnycFn()
  }, [])

  // here we fetch communes each time we change the wilaya_id
  useEffect(() => {
    if (!wilaya_id) {
      setHelpers((prevState) => {
        return { ...prevState, communes: [] }
      })
      setFieldValue('commune_id', '')
      return
    }

    const asnycFn = async () => {
      const communes = await helpersApi.getWlayaCommunes(wilaya_id)
      const { data: deliveryPrices } =
        await helpersApi.getWilayasDeliveryPrices(wilaya_id)

      //here we prevent the commune_id from being initialized if its the firt render
      if (firstUpdate.current) {
        firstUpdate.current = false
      } else {
        setFieldValue?.('commune_id', '')
      }

      setHelpers((prev) => {
        return {
          ...prev,
          communes,
          deliveryTypes: deliveryPrices.map((type) => {
            return {
              id: type.delivery_type_id,
              name: type.name,
              price: type.price,
            }
          }),
        }
      })
    }
    asnycFn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wilaya_id])

  return helpers
}

export default useHelpers
