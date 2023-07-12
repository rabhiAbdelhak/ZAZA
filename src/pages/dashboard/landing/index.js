import { Box, Button, Card, Container, Typography } from '@mui/material'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthGuard } from '../../../components/authentication/auth-guard'
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout'
import Landingfilter from '../../../components/dashboard/landing/landing-filter'
import LandingTable from '../../../components/dashboard/landing/landing-table'
import { useSelection } from '../../../hooks/use-selection'
import * as landingApi from '../../../api/landing'
import toast from 'react-hot-toast'
import EditLandingDrawer from '../../../components/landing/edit-landing-drawer'
import { useGetLandingsQuery } from '../../../queries/landing'
import { useRouter } from 'next/router'

const initialFilter = {}

const LandingPages = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [filter, setFilter] = useState({
    'filter[name]': '',
    page: 0,
  })

  const { data, isLoading, isError, error } = useGetLandingsQuery({ filter })

  const [
    selectedLandings,
    handleSelect,
    handleSelectAll,
    handleClearSelected,
    handleSelectOneRow,
  ] = useSelection(data?.data || [])

  const [drawerLandingId, setDrawerLandingId] = useState()

  const handleChangeQuery = (newQuery) => {
    setFilter((prev) => ({ ...prev, 'filter[name]': newQuery }))
  }

  const openLandingDetails = (landingId) => setDrawerLandingId(landingId)
  const closeLandingDetails = () => setDrawerLandingId(undefined)

  const goNextLanding = () => {
    const item = landingState?.landings.find((el) => el.id)
    const index = landingState?.landings.indexOf(item)
    const nextEl =
      landingState?.landings[index + 1] || landingState?.landings[0]
    setDrawerLandingId(nextEl.id)
  }
  const goPrevLanding = () => {
    const item = landingState?.landings.find((el) => el.id)
    const index = landingState?.landings.indexOf(item)
    const nextEl =
      landingState?.landings[index - 1] || landingState?.landings[0]
    setDrawerLandingId(nextEl.id)
  }

  const handleDelete = useCallback((id) => {
    landingApi
      .deleteLanding(id)
      .then((data) => {
        toast.success('Landing Page deleted')
        fetchLandings()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handlePageChange = (newPage) => {
    setFilter((prev) => ({ ...prev, page: newPage }))
  }

  return (
    <>
      <Head>
        <title>{t('Landing pages Managemen')}t</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            gap: 2,
            height: 'calc(100vh - 215px)',
          }}
        >
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            {!Boolean(drawerLandingId) && (
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography color="textPrimary" variant="h4">
                    {t('landing.Landing Pages')}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ color: 'primary.contrast' }}
                    onClick={() => router.push('/dashboard/landing/new')}
                  >
                    {t('landing.New Landing Page')}
                  </Button>
                </Box>
              </Box>
            )}
            <Landingfilter
              query={filter['filter[name]']}
              onQueryChange={handleChangeQuery}
              isLoading={isLoading}
            />
            <LandingTable
              landings={data?.landings}
              openDrawer={Boolean(drawerLandingId)}
              error={error?.response?.message}
              selectedLandings={selectedLandings}
              isLoading={isLoading}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              clearSelected={handleClearSelected}
              page={data?.meta?.current_page || 0}
              pageSize={data?.meta?.per_page || 0}
              onPageChange={handlePageChange}
              handleSingleLandingSelection={handleSelectOneRow}
              onDelete={handleDelete}
              showLandingDetails={openLandingDetails}
            />
          </Card>
          <EditLandingDrawer
            open={Boolean(drawerLandingId)}
            landingId={drawerLandingId}
            onClose={closeLandingDetails}
            goNext={goNextLanding}
            goPrev={goPrevLanding}
            sx={{ flex: 2, height: '100%' }}
          />
        </Container>
      </Box>
    </>
  )
}

export default LandingPages

LandingPages.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)
