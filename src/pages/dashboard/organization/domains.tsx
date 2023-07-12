import { AuthGuard } from '@/components/authentication/auth-guard'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { NextPageWithLayout } from '@/pages/_app'
import { OrganizationLayout } from '@/components/dashboard/organization/organization-layout'
import { useDomainsQuery } from '@/queries/domains'
import DomainsSkeleton from '@/components/dashboard/organization/domains/domains-skeleton'
import { ResourceError } from '@/components/resource-error'
import { ResourceUnavailable } from '@/components/resource-unavailable'
import DomainCard from '@/components/dashboard/organization/domains/domain-card'
import { Box, Button, Dialog } from '@mui/material'
import AddDomain from '@/components/dashboard/organization/domains/add-domain'
import { useState } from 'react'
import RemoveDomainDialog from '@/components/dashboard/organization/domains/remove-domain-dialog'

const DomainPage: NextPageWithLayout = () => {
  const { data, isLoading, error } = useDomainsQuery()
  const [domain, setDomain] = useState<Domain>()

  const closeRemoveDialog = () => setDomain(undefined)

  if (isLoading) {
    return <DomainsSkeleton />
  }

  if (error) {
    return <ResourceError error={String(error)} />
  }

  if (!data || !data.length) {
    return <ResourceUnavailable />
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <AddDomain />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data?.map((el) => (
            <DomainCard
              key={el.name}
              domain={el}
              onRemove={() => setDomain(el)}
            />
          ))}
        </Box>
      </Box>
      <RemoveDomainDialog
        domain={domain}
        open={Boolean(domain)}
        onClose={closeRemoveDialog}
      />
    </>
  )
}

export default DomainPage

DomainPage.getLayout = (page) => {
  return (
    <AuthGuard>
      <DashboardLayout>
        <OrganizationLayout>{page}</OrganizationLayout>
      </DashboardLayout>
    </AuthGuard>
  )
}
