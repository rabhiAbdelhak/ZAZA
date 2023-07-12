import { useEffect, useMemo, useState } from 'react'
import { getJsonDataFromFile } from './utils'
import { Box, Button, Grid } from '@mui/material'
import SheetHeaderSelection from './SheetHeaderSelection'
import PageStepHeader from '../PageStepHeader'
import SheetMapping from './SheetMapping'
import SheetPreview from './SheetPreview'
import LostMappingAlert from './LostMappingAlert'
import ImportLoading from './import-loading'
import { useTranslation } from 'react-i18next'

const steps = [
  {
    title: 'First, let’s select your header',
    step: 'step 1 of 2',
    content: 'This will ensure that the correct data gets imported',
  },
  {
    title: 'Choose a type and map your columns to it',
    step: 'step 2 of 2',
    content: 'This will ensure that the correct data gets imported',
  },
]

export type MapItem = Omit<MapInnerItem, 'mappedFiled'>

export type SheetWizardProps = {
  file?: File | null
  onSend?: (data: any[]) => void
  mappingModel: MapInnerItem[]
  onSelectEntity: (id: ImportEntity['id']) => void
  entities: ImportEntity[]
  entity: ImportEntity
  loading: boolean
  backToPrev: () => void
}

export default function SheetWizard({
  file,
  onSend,
  mappingModel,
  onSelectEntity,
  entities,
  entity,
  loading,
  backToPrev,
}: SheetWizardProps) {
  const [data, setData] = useState<any[]>()
  const [xlsColumns, setXLSXColumns] = useState<string[]>()
  const [headerRow, setHeaderRow] = useState(1)
  const [step, setStep] = useState(0)
  const [mapping, setMapping] = useState<MapInnerItem[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setMapping(mappingModel.map((el) => ({ ...el, mappedFiled: '' })))
  }, [mappingModel])

  const headers = useMemo(
    () =>
      Object.values(data?.[headerRow - 1] || {}).map((el) => String(el).trim()),
    [data, headerRow],
  )

  const rows = useMemo(() => {
    return (
      data?.slice(headerRow, data.length).map((el, index) => {
        const rowEl = headers.map((h, hIndex) => [h, el[hIndex]])
        return Object.fromEntries([...rowEl, ['zimouId', index]])
      }) || []
    )
  }, [data, headerRow, headers])

  const isFirstStep = step === 0
  const isLastStep = step === steps.length - 1
  const { t } = useTranslation()
  const disabledSubmit = useMemo(
    () => mapping.find((el) => Boolean(el.required && !el.mappedFiled)),
    [mapping],
  )

  const sendCSV = () => {
    const formattedRow = rows.map((el) => {
      const newEl = mapping.map((map) => [map.field, el[map.mappedFiled] || ''])
      return Object.fromEntries(newEl)
    })
    onSend && onSend(formattedRow)
  }

  const goNextHandler = () => {
    if (isLastStep) {
      sendCSV()
      return
    }
    setStep((prev) => prev + 1)
  }

  const goPrevHandler = () => {
    if (isFirstStep) {
      backToPrev()
      return
    }
    const shouldShowAlert = mapping.find((el) => Boolean(el.mappedFiled))
    if (step - 1 == 0 && shouldShowAlert) {
      setOpen(true)
      return
    }
    setStep((prev) => prev - 1)
  }
  const closeAlert = () => setOpen(false)
  const onAgreeAlert = () => {
    setMapping(mappingModel)
    closeAlert()
    setStep((prev) => prev - 1)
  }
  useEffect(() => {
    if (!file) {
      setData(undefined)
      setHeaderRow(1)
      setXLSXColumns(undefined)
      return
    }
    getJsonDataFromFile(file).then((response) => {
      setData(response.data)
      setHeaderRow(response.headerRow)
      setXLSXColumns(response.xlsColumns)
    })
  }, [file])

  if (!data) {
    return null
  }

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 290px)',
      }}
    >
      <PageStepHeader
        title={steps[step].title}
        step={steps[step].step}
        entities={entities}
        entity={entity}
        onSelectEntity={onSelectEntity}
        content={steps[step].content}
        sx={{ my: 1, p: 1 }}
      />

      {loading ? (
        <ImportLoading />
      ) : (
        <Box sx={{ flex: 1 }}>
          {isFirstStep && (
            <SheetHeaderSelection
              onSelectedRow={setHeaderRow}
              data={data}
              selectedRow={headerRow}
              headers={xlsColumns}
            />
          )}
          {isLastStep && (
            <Grid container spacing={2} pl={2}>
              <Grid item xs={4}>
                <SheetMapping
                  sx={{ width: '100%' }}
                  pt={1 / 2}
                  mapping={mapping}
                  onMap={setMapping}
                  headers={headers}
                />
              </Grid>
              <Grid item xs={8}>
                <SheetPreview data={rows} mapping={mapping} />
              </Grid>
            </Grid>
          )}
        </Box>
      )}

      <Box display="flex" justifyContent="space-between" gap={2} p={2}>
        <Button variant="outlined" color="secondary" onClick={goPrevHandler}>
          {t('Go back')}
        </Button>
        <Button
          disabled={disabledSubmit && isLastStep}
          variant="contained"
          onClick={goNextHandler}
        >
          {isLastStep ? t('Validate') : t('Next')}
        </Button>
      </Box>

      <LostMappingAlert
        open={open}
        onClose={closeAlert}
        onDisagree={closeAlert}
        onAgree={onAgreeAlert}
      />
    </Box>
  )
}
