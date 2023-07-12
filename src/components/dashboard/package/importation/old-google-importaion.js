// import { Button } from '@mui/material'
// import useDrivePicker from 'react-google-drive-picker'
// import { GoogleIcon } from '@/icons/google-icon'
// import axios from 'axios'
// import { useEffect } from 'react'

// type CompProps = {
//   handleChange: (file: any) => void
// }

// const ImportaionGoogleDrive = (props: CompProps) => {
//   const { handleChange } = props
//   const [openPicker, authResponse] = useDrivePicker()
//   const handleOpenPicker = () => {
//     openPicker({
//       clientId:
//         '906361809660-mp62ohjkt2iu910vll6ibo4cr8b3i56r.apps.googleusercontent.com',
//       developerKey: 'AIzaSyAaEFOQwMOqtD56mcMJHJ8NcK091ek59Sk',
//       viewId: 'SPREADSHEETS',
//       showUploadView: true,
//       showUploadFolders: true,
//       supportDrives: true,
//       multiselect: false,
//       viewMimeTypes: 'application/vnd.google-apps.spreadsheet',
//       callbackFunction: (data) => {
//         if (data.action === 'cancel') {
//           console.log('User clicked cancel/close button')
//         }

//         const fileUrl = data?.docs?.[0].url || ''
//         if (fileUrl) {
//           // const url = fileUrl.replace('/edit', '/export?format=csv')
//           console.log(data.docs, authResponse)
//           // gapi.client.drive.files
//           //   .get({
//           //     fileId: data?.docs?.[0].id,
//           //     alt: 'media',
//           //   })
//           //   .then((response: any) => {
//           //     console.log(response)
//           //   })
//           //   .catch((error: any) => {
//           //     console.error('Error getting file content:', error)
//           //   })
//         }
//         handleChange(data?.docs?.[0])
//       },
//     })
//   }
//   return (
//     <Button
//       onClick={() => handleOpenPicker()}
//       sx={{
//         border: '1px solid',
//         borderColor: 'divider',
//         p: 1,
//         color: 'text.primary',
//       }}
//       startIcon={<GoogleIcon />}
//     >
//       Sign in with google
//     </Button>
//   )
// }

// export default ImportaionGoogleDrive
