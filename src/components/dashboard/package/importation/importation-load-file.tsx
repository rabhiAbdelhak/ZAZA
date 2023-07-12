import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImportaionGoogleDrive from './importation-load-ggogle-drive'

type CompProps = {
  onChangeFile: (file: File | null) => void
  fileType: ImportOption
  resetFileType: () => void
}

const boxStyle = {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 1,
}

const ImportationLoadFile = (props: CompProps) => {
  const { onChangeFile, fileType, resetFileType } = props
  const [currentFile, setCurrentFile] = useState<File | null>()
  const { t } = useTranslation()
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newFile = event.currentTarget.files?.[0]
    setCurrentFile(newFile)
  }

  const uploadContent = () => {
    if (fileType.id === 'sheet') {
      return (
        <Box sx={boxStyle}>
          <Typography variant="subtitle1" color="textPrimary">
            Connect to your Google account to select a file from your Google
            Drive
          </Typography>
          <ImportaionGoogleDrive handleChange={setCurrentFile} />
          <Button variant="outlined" color="secondary" onClick={resetFileType}>
            Back To data Type Selection
          </Button>
        </Box>
      )
    }

    if (fileType.id === 'excel') {
      return (
        <Box sx={boxStyle}>
          <Typography variant="subtitle1" color="textPrimary">
            Click on the button to select a file from your computer
          </Typography>
          <Button variant="outlined" component={'span'}>
            Browse Files
          </Button>
          <Button variant="outlined" color="secondary" onClick={resetFileType}>
            Back To data Type Selection
          </Button>
        </Box>
      )
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '350px',
      }}
    >
      <Box sx={boxStyle}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={fileType?.icon}
            height={70}
            width={70}
            alt="filetypeicon"
          />
        </Box>
        <Typography variant="h2" color="textPrimary">
          Import Data from {fileType?.label}
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          This will let you upload and choose which fields to import
        </Typography>
      </Box>
      <form onSubmit={(e) => e.preventDefault()}>
        <label id="upload-file">
          <input
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            value={''}
            id="upload-file"
            onChange={changeHandler}
            type="file"
            style={{ display: 'none' }}
          />
          {!currentFile && uploadContent()}
        </label>
      </form>
      {currentFile && (
        <Box sx={boxStyle}>
          <Typography>
            {t('File')} : {currentFile?.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={(e) => {
                e.stopPropagation()
                setCurrentFile(null)
              }}
            >
              {t('Back')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onChangeFile(currentFile)}
            >
              {t('Next')}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ImportationLoadFile
