import { ChangeEvent, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import { AuthGuard } from '@/components/authentication/auth-guard'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Container } from '@mui/material'
import ImportWelcome from '@/components/dashboard/importation/welcome-import'
import { Stepper } from '@/components/stepper'
import ImportationLoadFile from '@/components/dashboard/package/importation/importation-load-file'
import SheetWizard from '@/components/sheet-importation/SheetWizard'
import toast from 'react-hot-toast'
import { MapInnerItem } from '@/components/sheet-importation/SheetMapping'
import ImportationSuccess from '@/components/dashboard/package/importation/importaion-sucsses'
import {
  orderMapping,
  packageMapping,
  productMapping,
} from '@/constants/importation-maps'
import { useImportDataMutation } from '@/queries/importation'

const importOptions: ImportOption[] = [
  {
    id: 'excel',
    label: 'Excel',
    icon: '/static/excel.png',
  },
  {
    id: 'sheet',
    label: 'Google Sheet',
    icon: '/static/sheet.png',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: '/static/facebook.png',
  },
  {
    id: 'wooocommerce',
    label: 'WooCommerce',
    icon: '/static/woocommerce.png',
  },
  {
    id: 'shopify',
    label: 'Shopify',
    icon: '/static/shopify.png',
  },
]

const importSteps: { title: string }[] = [
  { title: 'DATA IMPORT' },
  { title: 'DATA MAPPING' },
  { title: 'IMPORTING' },
]

const ImportEntities: ImportEntity[] = [
  {
    id: 'products',
    label: 'Products',
    link: '/dashboard/products',
    mapping: productMapping,
  },
  {
    id: 'orders',
    label: 'Orders',
    link: '/dashboard/orders',
    mapping: orderMapping,
  },
  {
    id: 'packages',
    label: 'Packages',
    link: '/dashboard/packages',
    mapping: packageMapping,
  },
  {
    id: 'suppliers',
    label: 'Supplliers',
    link: '/dashboard/suppliers',
    mapping: orderMapping,
  },
  {
    id: 'clients',
    label: 'Clients',
    link: '/dashboard/clients',
    mapping: orderMapping,
  },
]

const Page: NextPageWithLayout = () => {
  const [file, setFile] = useState<File | null>()
  const [fileType, setFileType] = useState<ImportOption | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [entity, setEntity] = useState<ImportEntity>(ImportEntities[1])
  const ImportMutation = useImportDataMutation()
  const handleFileTypeChange = (filetype: ImportOption | null) => {
    setFileType(filetype)
  }

  const onChangeFile = async (file: File | null) => {
    setFile(file)
    setCurrentStep((prev) => prev + 1)
  }

  const onSelectEntity = (id: ImportEntity['id']) => {
    const newEntity = ImportEntities.find((en) => en.id === id)
    newEntity && setEntity(newEntity)
  }

  const onSendData = (data: any) => {
    ImportMutation.mutateAsync({ data, entity: entity.id })
      .then((data) => {
        if (data?.errors.length) {
          let message = data?.errors
            .map((err: any) => {
              if (typeof err.message === 'string') {
                return err.message
              } else {
                let msg = ''
                for (let key in err.message) {
                  msg = `${msg} | ${key} : ${err.message[key]}`
                }
                return msg
              }
            })
            .join(' | ')
          toast.error(message)
        } else if (data?.success_created) {
          setCurrentStep(2)
        }
        console.log(data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Container maxWidth={false}>
      {!fileType && (
        <ImportWelcome
          title="Welcome to Zimou Express importer"
          subtitle="You can easily import your data from multiple platforms over to Zimou
          Express. Get started by selecting where you want to import from:"
          options={importOptions}
          ChangeOption={handleFileTypeChange}
        />
      )}
      {fileType && (
        <>
          <Stepper
            steps={importSteps}
            currentStep={currentStep}
            orientation={'horizontal'}
          />
          {currentStep === 0 && (
            <ImportationLoadFile
              onChangeFile={onChangeFile}
              fileType={fileType}
              resetFileType={() => handleFileTypeChange(null)}
            />
          )}

          {currentStep === 1 && (
            <SheetWizard
              loading={ImportMutation.isLoading}
              mappingModel={entity.mapping}
              backToPrev={() => setCurrentStep((prev) => prev - 1)}
              file={file}
              entity={entity}
              entities={ImportEntities}
              onSelectEntity={onSelectEntity}
              onSend={onSendData}
            />
          )}
          {currentStep === 2 && (
            <ImportationSuccess
              reImport={() => {
                setCurrentStep(0)
                handleFileTypeChange(null)
              }}
              entity={entity}
              totalImports={15}
            />
          )}
        </>
      )}
    </Container>
  )
}

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Page
