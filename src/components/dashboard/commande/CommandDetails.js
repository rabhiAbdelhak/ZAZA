import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'

import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import { commandsApi } from '../../../api/commands'

import { Button, Divider, Tooltip } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
const TextItem = ({ title, value }) => {
  return (
    <ListItem
      sx={{
        px: 3,
        py: 0.5,
      }}
    >
      <ListItemText
        disableTypography
        primary={
          <Typography color="textPrimary" variant="subtitle2" noWrap={true}>
            {title} :
          </Typography>
        }
        secondary={
          <Typography color="textSecondary" variant="body2" noWrap={true}>
            {value}
          </Typography>
        }
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'row',
          my: 0,
        }}
      />
    </ListItem>
  )
}

const ProductRow = ({ photoLink, productName, totalPrice, UnitPrice, Qte }) => (
  <Box
    sx={{
      display: 'flex',
      p: '20px',
      justifyContent: 'space-between',
    }}
  >
    <Tooltip
      title={
        <Avatar
          alt={'produit 01'}
          src={photoLink}
          sx={{
            width: 150,
            height: 150,
          }}
          variant="rounded"
        />
      }
    >
      <Avatar
        alt={'produit 01'}
        src={{ photoLink }}
        sx={{
          width: 64,
          height: 64,
        }}
        variant="rounded"
      />
    </Tooltip>
    <List>
      <TextItem title={'Nom du produit '} value={productName} />
      <TextItem title="Prix" value={UnitPrice} />
    </List>
    <List>
      <TextItem title={'Qte'} value={Qte} />
      <TextItem title={'Total prix'} value={totalPrice} />
    </List>
    <Avatar
      sx={{
        width: 20,
        height: 20,
      }}
    >
      <HelpIcon />
    </Avatar>
  </Box>
)

const ProductList = ({ products }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        flexGrow: 0.2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          pb: '35px',
        }}
      >
        Products :
      </Typography>

      <List
        sx={{
          py: '25px',
          px: '0px',
          overflowY: 'auto',
          maxHeight: '300px',
        }}
      >
        {products.products.map((product) => {
          return (
            <React.Fragment key={product.id}>
              <ProductRow
                photoLink={product.media.original_url}
                productName={product.name}
                totalPrice={product.pivot.price * product.pivot.quantity}
                UnitPrice={product.pivot.price}
                Qte={product.pivot.quantity}
              />
              <Divider />
            </React.Fragment>
          )
        })}
      </List>

      <Box
        sx={{
          display: 'flex',
          pt: '35px',
        }}
      >
        <TextItem title={'Total des Produit'} value={'3'} />
        <TextItem title={'Prix de livraison'} value={'2500 DZD '} />
        <TextItem title={'Total A payer'} value={'63000 DZD'} />
      </Box>
    </Box>
  )
}

const StoreInformation = ({ details }) => {
  const [storeName, setStoreName] = useState('')
  const [storePhone, setStorePhone] = useState('')

  return (
    <Box>
      <Typography variant="h5">Store Informations :</Typography>
      <List
        disablePadding
        sx={{
          py: '25px',
        }}
      >
        <TextItem title={'nom'} value={details.store.name} />

        <TextItem title={'Numero'} value={details.store.phones} />
      </List>
    </Box>
  )
}
const OrderInformations = ({ details }) => {
  return (
    <Box>
      <Typography variant="h5">Order Informations :</Typography>
      <List
        disablePadding
        sx={{
          py: '25px',
        }}
      >
        <TextItem title={'Adress'} value={details.client_address} />

        <TextItem
          title={'Name'}
          value={details.client_first_name + ' ' + details.client_last_name}
        />

        <TextItem title={'Phone'} value={details.client_phone} />
        {/*
            make an enum to delevery type
            */}
        <TextItem title={'Type de livraison'} value={details.free_delivery} />

        <TextItem title={'Gratuits a partir '} value={details.free_delivery} />

        <TextItem title={'Wilaya'} value={details.wilaya.name} />

        <TextItem title={'Commune'} value={details.commune.name} />
        {/*correct the type here 

*/}
        <TextItem title={'Type de Colis'} value={details.free_delivery} />
      </List>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          gap: '10px',
        }}
      >
        <Button
          variant="contained"
          color="success"
          size="small"
          sx={{
            backgroundColor: '#2E7D32',
          }}
        >
          CONFIRM
        </Button>
        <Button
          variant="contained"
          color="success"
          size="small"
          sx={{
            backgroundColor: '#E65100',
          }}
        >
          FAILED
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{
            backgroundColor: '#C62828',
          }}
        >
          CANCEL
        </Button>
      </Box>
    </Box>
  )
}

function CommandDetails({ id }) {
  const [isDetailsLoading, setIsDetailsLoading] = useState(true)
  const [details, setDetails] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await commandsApi.getCommand(id)

        setDetails(result)
        setIsDetailsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [id])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {isDetailsLoading ? (
        <Skeleton variant="rectangular" width={800} height={400} />
      ) : (
        <>
          <StoreInformation details={details} />
          <OrderInformations details={details} />
          <ProductList products={details} />
        </>
      )}
    </Box>
  )
}

export default CommandDetails
