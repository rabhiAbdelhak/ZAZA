import { Tabs, Divider, Tab } from '@mui/material'
import { usePackageSituationQuery } from '../../../queries/package'
import { AllInbox } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { situationsVariant } from '../../../constants/pacakges-statuses'

export default function PackageSituationFilter({ filter, onFilter }) {
  const { data: situations, isLoading } = usePackageSituationQuery()
  const { t } = useTranslation()

  const { situationId = '', statusId = '' } = filter || {}

  const currentSituation = situationId
    ? situations?.find((el) => el.id === situationId)
    : null

  const handleFilter = (newSituationId = '', newStatusId = '') => {
    if (onFilter) {
      onFilter({
        situationId: newSituationId,
        statusId: newStatusId,
      })
    }
  }

  return (
    <>
      <Tabs
        onChange={(event, value) => handleFilter(value)}
        allowScrollButtonsMobile
        value={situationId}
        variant="scrollable"
      >
        <Tab label={t('packages.All Packages')} value="" icon={<AllInbox />} />
        {situations?.map((el) => {
          const { icon, label } =
            situationsVariant.find((v) => v.id === el.id) || null
          const { packages_count } = situations.find((s) => s.id === el.id)
          return (
            <Tab
              key={el.id}
              label={`${t(label)}(${packages_count})`}
              value={el.id}
              icon={icon}
            />
          )
        })}
      </Tabs>

      {Boolean(currentSituation) && (
        <>
          <Divider />
          <Tabs
            onChange={(event, value) => handleFilter(situationId, value)}
            allowScrollButtonsMobile
            value={statusId}
            variant="scrollable"
          >
            <Tab label={t('All')} value="" />
            {currentSituation?.statuses?.map((el) => {
              return (
                <Tab
                  key={el.status_id}
                  label={`${t(el.status_name)}(${el.packages_count})`}
                  value={el.status_id}
                />
              )
            })}
          </Tabs>
        </>
      )}
    </>
  )
}
