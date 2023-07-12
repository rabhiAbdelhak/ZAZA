import { Box, Skeleton } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

function DeliverySkeleton({ height = 50, count = [0, 1, 2] }: any) {
    return (
        <Box display="flex" gap={2} sx={{ '& > Box': { flex: 1 } }}>
            {count.map((item: any, i: number) => (
                <Skeleton key={i} variant="rectangular" height={height} width="100%" />
            ))}
        </Box>
    )
}

export default DeliverySkeleton

DeliverySkeleton.propTypes = {
    height: PropTypes.number,
    count: PropTypes.array,
}