import { InputField } from '@/components/input-field'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { FormEvent, useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'
import { useCreateDomainMutation } from '@/queries/domains'
import { useTranslation } from 'react-i18next'

const isValidDomain = (domain: string) =>
  /^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/.test(
    domain,
  )

const columns = ['type', 'Name', 'value']

export default function AddDomain() {
  const [domain, setDomain] = useState('')
  const [open, setOpen] = useState(false)
  const mutation = useCreateDomainMutation()
  const { t } = useTranslation()

  const { user } = useAuth()

  const domainValue = `zimou-verification=${user?.store?.name}`

  const copyContent = () => {
    navigator.clipboard
      .writeText(domainValue)
      .then(() => toast(t('domain.copiedToClipboard')))
      .catch(() => toast.error(t('domain.failedCopiedToClipboard')))
  }

  const openDialog = () => setOpen(true)
  const closeDialog = () => {
    setDomain('')
    setOpen(false)
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    openDialog()
  }

  const createDomain = () => {
    toast.promise(mutation.mutateAsync(domain), {
      loading: t('toast.Removing'),
      success: () => {
        closeDialog()
        return t('toast.RemovedSuccessfully')
      },
      error: (error) => error.response.data?.message,
    })
  }

  return (
    <>
      <Box
        component="form"
        display="flex"
        gap={2}
        alignItems="center"
        onSubmit={submitHandler}
      >
        <InputField
          value={domain}
          onChange={(e: any) => setDomain(e.target.value?.toLowerCase())}
          placeholder="mywebsite.com"
          fullWidth
        />
        <Button
          type="submit"
          disabled={!isValidDomain(domain)}
          variant="contained"
        >
          {t('domain.add')}
        </Button>
      </Box>

      <Dialog open={open} fullWidth>
        <DialogTitle>{domain}</DialogTitle>
        <DialogContent>
          {t('domain.setFollowingRecord')}
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                {columns.map((el) => (
                  <TableCell key={el}>{el}</TableCell>
                ))}
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>TXT</TableCell>
              <TableCell>@</TableCell>
              <TableCell>{domainValue}</TableCell>
              <TableCell align="right" sx={{ px: 2, py: 0 }}>
                <IconButton onClick={copyContent}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button disabled={mutation.isLoading} onClick={closeDialog}>
            {t('domain.cancel')}
          </Button>
          <Button
            disabled={mutation.isLoading}
            variant="contained"
            onClick={createDomain}
          >
            {t('domain.create')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
