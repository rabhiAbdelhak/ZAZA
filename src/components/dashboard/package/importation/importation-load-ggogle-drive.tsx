import { Button } from '@mui/material'
import useDrivePicker from 'react-google-drive-picker'
import { GoogleIcon } from '@/icons/google-icon'
import axios from 'axios'
import { useEffect } from 'react'
import { PickerCallback } from 'react-google-drive-picker/dist/typeDefs'

type CompProps = {
  handleChange: (file: any) => void
}

const ImportaionGoogleDrive = (props: CompProps) => {
  const { handleChange } = props
  const [openPicker, data] = useDrivePicker()

  useEffect(() => {
    localStorage.setItem('google_token', data?.access_token || '')
  }, [data])

  const getCsvFile = async (fileUrl: string, fileName: string) => {
    let file: File | null = null

    const response = await axios(fileUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('google_token'),
      },
      responseType: 'blob',
    })
    file = new File([response.data], fileName)
    return file ? file : null
  }

  const handleOpenPicker = () => {
    openPicker({
      clientId:
        '906361809660-mp62ohjkt2iu910vll6ibo4cr8b3i56r.apps.googleusercontent.com',
      developerKey: 'AIzaSyAaEFOQwMOqtD56mcMJHJ8NcK091ek59Sk',
      viewId: 'SPREADSHEETS',
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      viewMimeTypes: 'application/vnd.google-apps.spreadsheet',
      callbackFunction: async (picker: PickerCallback) => {
        let fileUrl = picker?.docs?.[0].url || ''
        fileUrl = fileUrl.replace('edit', 'export?mimeType=text/csv')
        const fileName = picker?.docs?.[0].name || 'Your File'
        if (fileUrl) {
          const file = await getCsvFile(fileUrl, fileName)
          if (file) {
            handleChange(file)
          }
        }
      },
    })
  }
  return (
    <Button
      onClick={() => handleOpenPicker()}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        p: 1,
        color: 'text.primary',
      }}
      startIcon={<GoogleIcon />}
    >
      Sign in with google
    </Button>
  )
}

export default ImportaionGoogleDrive
