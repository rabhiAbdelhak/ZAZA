import { Fragment, useCallback, useEffect, useMemo } from 'react'
import Head from 'next/head'
import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Typography,
} from '@mui/material'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { AccountLayout } from '../../../components/dashboard/account/account-layout'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import { gtm } from '../../../lib/gtm'
import { useAsync } from '../../../hooks/useAsync'

import * as notificationAPI from '../../../api/notification'
import toast from 'react-hot-toast'
import TableLoading from '../../../components/dashboard/table-loading'
import { ResourceError } from '../../../components/resource-error'
import { useTranslation } from 'react-i18next'

const NOTIFICATIONS_STATIC_LIST = [
  {
    i18nKey: 'EmailPackagesChangeStatus',
    code: 'email.packages.change-status',
  },
  { i18nKey: 'EmailTicketsChangeStatus', code: 'email.tickets.change-status' },
  { i18nKey: 'EmailPaymentsGenerated', code: 'email.payments.generated' },
  { i18nKey: 'EmailDailySummary', code: 'email.daily.summary' },
]

const AccountNotifications = () => {
  const {
    data: notifications,
    isLoading,
    isSuccess,
    isError,
    run,
    setData: setNotifications,
  } = useAsync({ status: 'pending', data: [] })
  const { t } = useTranslation()

  const notificationsCodes = useMemo(
    () => notifications?.map((el) => el.notification_name) || [],
    [notifications],
  )

  const loadNotifications = useCallback(
    () => run(notificationAPI.getSubscribed()).catch((err) => console.log(err)),
    [run],
  )

  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  const isUnsubcribedfromAll = !notifications?.length

  const isChecked = (notification) =>
    notificationsCodes.includes(notification?.code)

  const handleChange = (notification) => {
    const foundNotification = notifications?.find(
      (el) => el.notification_name === notification.code,
    )

    const notificationHandler = foundNotification
      ? () => notificationAPI.unsubscribe(foundNotification.id)
      : () => notificationAPI.subscribe(notification.code)

    toast.promise(notificationHandler(), {
      loading: t('toast.Saving'),
      success: (response) => {
        const newNotifications = foundNotification
          ? notifications?.filter((el) => el.id !== foundNotification.id)
          : response
        setNotifications(newNotifications)
        return t('toast.SavedSuccessfully')
      },
      error: (err) => err?.response?.data?.message,
    })
  }

  const unsubscribeAllHandler = () => {
    if (isUnsubcribedfromAll) {
      return
    }

    if (isUnsubcribedfromAll) {
      return
    }

    const promises =
      notifications?.map((el) => notificationAPI.unsubscribe(el.id)) || []

    toast.promise(Promise.all(promises), {
      loading: t('toast.Saving'),
      success: () => {
        setNotifications([])
        return t('toast.SavedSuccessfully')
      },
      error: (err) => err?.response?.data?.message,
    })
  }

  return (
    <>
      <Head>
        <title>Account: Notifications | ZIMOU Express</title>
      </Head>
      <Card>
        <CardHeader
          subheader={t('notificationsPage.ManageYourAlertNotifications')}
          title={t('notificationsPage.EmailNotifications')}
        />
        <Divider />
        {isError && <ResourceError onReload={loadNotifications} />}
        {isLoading && <TableLoading />}
        {isSuccess && (
          <List>
            {NOTIFICATIONS_STATIC_LIST.map((notification, index) => (
              <Fragment key={notification.code}>
                <ListItem key={notification.code}>
                  <ListItemText
                    primary={t(`notificationsPage.${notification.i18nKey}`)}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={isChecked(notification)}
                      color="primary"
                      name={notification.code}
                      onChange={() => handleChange(notification)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                {NOTIFICATIONS_STATIC_LIST.length > index + 1 && <Divider />}
              </Fragment>
            ))}
          </List>
        )}
      </Card>

      {isSuccess && (
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: {
              sm: 'row',
              xs: 'column',
            },
            pt: 3,
          }}
        >
          <Box>
            <Typography color="textPrimary" sx={{ mb: 1 }} variant="h6">
              {t('notificationsPage.UnsubscribeNotifications')}
            </Typography>
            {/* <Typography color="textSecondary" variant="body2">
              Keep in mind that security notifications cannot be turned off
            </Typography> */}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <FormControlLabel
            control={
              <Switch
                checked={isUnsubcribedfromAll}
                color="primary"
                name="unsubscribeAll"
                onChange={unsubscribeAllHandler}
              />
            }
            label={t('notificationsPage.Unsubscribe')}
          />
        </Box>
      )}
    </>
  )
}

AccountNotifications.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <AccountLayout>{page}</AccountLayout>
    </DashboardLayout>
  </AuthGuard>
)

export default AccountNotifications
