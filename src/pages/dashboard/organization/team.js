import { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { Scrollbar } from '../../../components/scrollbar'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import { OrganizationRemoveDialog } from '../../../components/dashboard/organization/organization-remove-dialog'
import { OrganizationLayout } from '../../../components/dashboard/organization/organization-layout'
import { Plus as PlusIcon } from '../../../icons/plus'
import { gtm } from '../../../lib/gtm'
import { useAsync } from '../../../hooks/useAsync'
import * as employeeAPI from '../../../api/employee'
import { ROLES } from '../../../constants/roles'
import TableLoading from '../../../components/dashboard/table-loading'
import { ResourceError } from '../../../components/resource-error'
import { OrganizationInviteDialog } from '../../../components/dashboard/organization/organization-invite-dialog'
import toast from 'react-hot-toast'
import { RolesGuard } from '../../../components/authentication/roles-guard'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const OrganizationTeam = () => {
  const employees = useAsync({ status: 'pending', data: [] })
  const [isRemoveLoading, setIsRemoveLoading] = useState(false)

  const { t } = useTranslation()

  const [employee, setEmployee] = useState(null)
  const [removeEmployee, setRemoveEmployee] = useState(null)

  const loadEmployees = useCallback(() => {
    employees.run(employeeAPI.getEmployees()).catch((err) => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees.run])

  const onSubmit = async (values, helpers) => {
    const isEdit = Boolean(employee?.id)
    const { commune, role, email, name, password, phone } = values
    const api = isEdit ? employeeAPI.updateEmploye : employeeAPI.createEmploye
    const data = {
      commune_id: commune?.id,
      role,
      email,
      name,
      id: employee?.id,
      password,
      phone,
    }

    try {
      const response = await api(data)
      const newData = isEdit
        ? employees.data.map((el) => (el.id === employee.id ? response : el))
        : [response, ...employees.data]
      helpers.setStatus({ success: true })
      helpers.setSubmitting(false)
      setEmployee(null)
      employees.setData(newData)
      toast.success(
        isEdit
          ? t('toast.UpdatedSuccessfully')
          : t('toast.CreatedSuccessfully'),
      )
    } catch (err) {
      helpers.setStatus({ success: false })
      helpers.setErrors({ submit: err?.response?.data?.message })
      helpers.setSubmitting(false)
    }
  }

  const onCloseRemoveEmployee = () => setRemoveEmployee(null)
  const onRemoveEmployee = () => {
    setIsRemoveLoading(true)
    employeeAPI
      .removeEmploye(removeEmployee?.id)
      .then(() => {
        const newData = employees.data.filter(
          (el) => el.id !== removeEmployee?.id,
        )
        employees.setData(newData)
        toast.success(t('toast.RemovedSuccessfully'))
        onCloseRemoveEmployee()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err)
      })
      .finally(() => setIsRemoveLoading(false))
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
    loadEmployees()
  }, [loadEmployees])

  return (
    <>
      <Head>
        <title>Organization: Team | Carpatin Dashboard</title>
      </Head>
      <Card>
        <CardHeader
          action={
            <Button
              color="primary"
              onClick={() => setEmployee({})}
              size="small"
              startIcon={<PlusIcon />}
              variant="contained"
            >
              {t('organisationPage.Invite')}
            </Button>
          }
          title="Members"
        />
        <Divider />
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>{t('organisationPage.Name')}</TableCell>
                <TableCell>{t('organisationPage.Email')}</TableCell>
                <TableCell>{t('organisationPage.Phone')}</TableCell>
                <TableCell>{t('organisationPage.Role')}</TableCell>
                <TableCell>{t('organisationPage.Actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.data?.map((member) => {
                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Avatar
                          alt={member.name}
                          src={member.avatar}
                          sx={{ mr: 1 }}
                        />
                        <Typography
                          color="textPrimary"
                          noWrap
                          variant="subtitle2"
                        >
                          {member.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member?.phone}</TableCell>
                    <TableCell>{ROLES[member?.roles]}</TableCell>
                    <TableCell sx={{ width: 145 }}>
                      <Box sx={{ display: 'flex' }}>
                        <Typography
                          onClick={() => setEmployee(member)}
                          color="primary"
                          sx={{ cursor: 'pointer' }}
                          variant="subtitle2"
                        >
                          {t('form.Edit')}
                        </Typography>
                        {member.role !== 'administrator' && (
                          <>
                            <Divider
                              flexItem
                              orientation="vertical"
                              sx={{ mx: 2 }}
                            />
                            <Typography
                              color="primary"
                              sx={{ cursor: 'pointer' }}
                              variant="subtitle2"
                              onClick={() => setRemoveEmployee(member)}
                            >
                              {t('form.Remove')}
                            </Typography>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          {employees.isLoading && <TableLoading />}
          {employees.isError && (
            <ResourceError
              error={employees?.error?.message}
              onReload={loadEmployees}
            />
          )}
        </Scrollbar>
      </Card>
      {Boolean(employee) && (
        <OrganizationInviteDialog
          onSubmit={onSubmit}
          employee={employee}
          onClose={() => setEmployee(null)}
          open={Boolean(employee)}
        />
      )}

      <OrganizationRemoveDialog
        title={t('organisationPage.RemoveTeamMember')}
        content={t('organisationPage.AreYouSureYouWantRemove', {
          name: removeEmployee?.name,
        })}
        onAgree={onRemoveEmployee}
        onDisagree={onCloseRemoveEmployee}
        open={Boolean(removeEmployee)}
        isLoading={isRemoveLoading}
        isDisable={isRemoveLoading}
      />
    </>
  )
}

OrganizationTeam.getLayout = (page) => (
  <AuthGuard>
    <RolesGuard authorizedRoles={['store', 'employe_manager']} redirection>
      <DashboardLayout>
        <OrganizationLayout>{page}</OrganizationLayout>
      </DashboardLayout>
    </RolesGuard>
  </AuthGuard>
)

export default OrganizationTeam
