import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { packageApi } from '../../../api/package'
import {
  situationsVariant,
  statusVariants,
} from '../../../constants/pacakges-statuses'
import { useAsync } from '../../../hooks/useAsync'
import { Scrollbar } from '../../scrollbar'

//local imports
import PackageHistoryBox from './package-history-box'

const PackageHistory = ({ packid }) => {
  const {
    isLoading,
    data: fetchedHistories,
    run,
  } = useAsync({ status: 'pending', data: [] })
  const { t } = useTranslation()
  const fetchHistory = useCallback(() => {
    run(packageApi.getPackageHistory(packid).catch((err) => console.log(err)))
  }, [packid, run])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  const histories = useMemo(() => {
    const firstHistory = { from: null, to: 'New' }
    let newHistory = []
    for (let i = 0; i < fetchedHistories.length; i++) {
      if (i + 1 < fetchedHistories.length) {
        const situationVariantFrom = situationsVariant.find((sit) =>
          sit.statusIds.includes(fetchedHistories[i].status_id),
        )
        const situationVariantTo = situationsVariant.find((sit) =>
          sit.statusIds.includes(fetchedHistories[i + 1].status_id),
        )
        const statusVariantFrom = statusVariants.find(
          (status) => status.id === fetchedHistories[i].status_id,
        )
        const statusVariantTo = statusVariants.find(
          (status) => status.id === fetchedHistories[i + 1].status_id,
        )
        newHistory.push({
          id: i,
          from: statusVariantFrom?.name.en || fetchedHistories[i].status_name,
          color_from: situationVariantFrom?.color,
          to: statusVariantTo?.name?.en || fetchedHistories[i + 1].status_name,
          color_to: situationVariantTo?.color,
          date: fetchedHistories[i + 1].created_at,
          reason: fetchedHistories[i + 1].reason_name,
        })
      }
    }
    return newHistory
  }, [fetchedHistories])
  return (
    <Card sx={{ maxHeight: '100%' }}>
      <CardHeader
        title={t('packages.History')}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      />
      {console.log(histories)}
      <CardContent>
        <Scrollbar sx={{ overflow: 'scroll' }}>
          {histories.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {histories.map((his) => {
                console.log(his)
                return <PackageHistoryBox key={his.id} history={his} />
              })}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" color="warning.main">
                {t('The status of this package has never been changed')}
              </Typography>
            </Box>
          )}
        </Scrollbar>
      </CardContent>
    </Card>
  )
}

export default PackageHistory
