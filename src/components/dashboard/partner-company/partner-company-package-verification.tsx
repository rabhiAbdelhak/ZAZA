import {
  TextField,
  Box,
  Typography,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TextareaAutosize,
  Button,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material'
import {
  usePaymentVerification,
  usePaymentConfirmation,
} from '@/queries/payment'
import toast from 'react-hot-toast'
import { DateTimePicker } from '@mui/lab'
import { X as XIcon } from '../../../icons/x'
import { useTranslation } from 'react-i18next'
import React, { useState, useEffect } from 'react'
export default function PartnerCompanyPackageVerification({
  open,
  onClose,
}: any) {
  const [ReturnedString, setReturnedString] = useState('')
  const [DeliveredString, setDeliveredString] = useState('')
  const [AmountToVerify, setAmountToVerify] = useState<Number>(15)
  const [VerificationCompletion, setVerificationCompletion] = useState(false)
  const [DeliveredArray, setDeliveredArray] = useState<any>([])
  const [ReturnedArray, setReturnedArray] = useState<any>([])
  const [PackageArray, setPackageArray] = useState<any>([])
  const { t: translate } = useTranslation()
  const {
    mutate: mutatePaymentVerification,
    data: verifStatus,
    isLoading,
    isError,
    error,
  } = usePaymentVerification()
  const { mutate: mutateConfirmpayement, data: paymentStatus } =
    usePaymentConfirmation()
  function handleParsingDeliveredChange(e: any) {
    setDeliveredString(e.target.value)
  }
  function handleParsingReturnedChange(e: any) {
    setReturnedString(e.target.value)
  }
  function handleAmountChange(e: any) {
    setAmountToVerify(e.target.value)
  }
  function handleparseBothStrings() {
    handleparseString1()
    handleparseString2()
  }

  function handleparseString1() {
    if (DeliveredString !== '') {
      const lines = DeliveredString.trim().split('\n')

      const objects = []

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const trackingCode = line
        const packageInfo = { trackingCode, packageStatus: 'delivered' }
        objects.push(packageInfo)
      }
      setDeliveredArray(objects)
      setDeliveredString('')
    }
  }
  function handleparseString2() {
    if (ReturnedString !== '') {
      const lines = ReturnedString.trim().split('\n')

      const objects = []

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const trackingCode = line
        const packageInfo = { trackingCode, packageStatus: 'returned' }
        objects.push(packageInfo)
      }
      setReturnedString('')
      setReturnedArray(objects)
    }
  }
  useEffect(() => {
    if (DeliveredArray.length !== 0 || ReturnedArray.length !== 0) {
      mutatePaymentVerification({
        amount: 0,
        delivered_packages: DeliveredArray.map(
          (item: any) => item.trackingCode,
        ),
        returned_packages: ReturnedArray.map((item: any) => item.trackingCode),
      })
      // var x = JSON.parse(JSON.stringify(verifStatus))
      // console.log(verifStatus?.data.data.calculated_amount)
      setVerificationCompletion(true)
    }

    if (ReturnedString === '' && DeliveredString === '') {
      setVerificationCompletion(false)
    }

    // eslint-disable-next-line
  }, [DeliveredArray, ReturnedArray])

  async function handleVerification() {
    handleparseBothStrings()
    verifStatus?.error !== undefined && toast.error(verifStatus?.error?.message)
  }

  function handleConfirmation() {
    mutateConfirmpayement({
      total: AmountToVerify,
      package_ids: verifStatus?.data.data.package_ids,
    })
    paymentStatus?.error === undefined &&
      (toast.success('Confirmation Complete.'), onClose())

    paymentStatus?.error !== undefined &&
      toast.error(paymentStatus?.error?.message)
  }

  const renderContent = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            maxWidth: '100%',
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              mt: 2,
            }}
          >
            <Grid item xs={6}>
              <Typography sx={{ mb: 2 }}> DELIVERED PACKAGES</Typography>
              <TextField
                fullWidth
                label="Paste your package orders separated by a newline"
                minRows={5}
                multiline
                onChange={handleParsingDeliveredChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ mb: 2 }}> RETURNED PACKAGES</Typography>
              <TextField
                fullWidth
                label="Paste your package orders separated by a newline"
                minRows={5}
                multiline
                onChange={handleParsingReturnedChange}
              />
            </Grid>
          </Grid>
        </Box>

        {/* <Button onClick={handleparseBothStrings}>Sort Packages</Button> */}

        <Grid sx={{ mt: 0 }} container spacing={2}>
          <Grid
            sx={{
              display: 'flex',

              justifyContent: 'center',
            }}
            item
            xs={12}
          >
            <Button
              variant="contained"
              sx={{
                width: '50%',
                color: 'primary.contrast',
                '&:hover': {
                  backgroundColor: 'primary.800',
                },
              }}
              onClick={handleVerification}
            >
              Verify Amount
            </Button>
          </Grid>
          <Divider light variant="middle" />
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            item
            xs
          >
            {/* {!VerificationCompletion &&
              !isError &&
              !isLoading &&
              (verifStatus?.data?.verified ? (
                <Typography
                  sx={{ textAlign: 'center', border: '1px green solid' }}
                  color="success.main"
                >
                  {' '}
                  The Count is right{' '}
                </Typography>
              ) : (
                <Typography
                  sx={{ textAlign: 'center', border: '1px #EB6D57 solid' }}
                  color="error"
                >
                  {' '}
                  Count is wrong, the amount should be{' '}
                  {verifStatus?.data?.calculated_amount}
                </Typography>
              ))}{' '} */}
          </Grid>
        </Grid>
        {verifStatus?.data && !isLoading && (
          <Grid
            sx={{
              mt: 0,
            }}
            container
            spacing={2}
          >
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                required
                defaultValue={verifStatus?.data?.data.calculated_amount || 0}
                label="Calculated Amount"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                defaultValue={verifStatus?.data?.data.calculated_amount || 0}
                label="Your amount?"
                onChange={handleAmountChange}
              />
            </Grid>

            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
              item
              xs={6}
            >
              {' '}
              Do you want to confirm the payment?
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
              item
              xs={6}
            >
              {' '}
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  color: 'primary.contrast',
                  '&:hover': {
                    backgroundColor: 'primary.800',
                  },
                }}
                onClick={handleConfirmation}
              >
                Confirm Payment
              </Button>
            </Grid>
          </Grid>
        )}
        {/* {DeliveredArray.length !== 0 && ReturnedArray.length !== 0 && (
          <>
            <Divider sx={{ mt: 2 }} />
            <Typography sx={{ mt: 2 }}>Packages</Typography>
            <Table sx={{ mt: 2 }} size="medium" stickyHeader>
              <TableHead>
                <TableCell> Tracking Number</TableCell>
                <TableCell> Status</TableCell>
              </TableHead>

              <TableBody>
                {[...DeliveredArray, ...ReturnedArray].map(
                  (elementTable: any) => (
                    <TableRow key={elementTable.trackingCode}>
                      <TableCell> {elementTable.trackingCode}</TableCell>
                      <TableCell> {elementTable.packageStatus}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </>
        )} */}
      </Box>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose?.()}
      PaperProps={{
        sx: {
          maxWidth: 700,
          width: '100%',
        },
      }}
    >
      <DialogTitle
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="inherit" color="textPrimary">
          {' '}
          Add a new payment{' '}
        </Typography>
        <IconButton onClick={() => onClose?.()} size="small">
          <XIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          py: 4,
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'column',
        }}
      >
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}
