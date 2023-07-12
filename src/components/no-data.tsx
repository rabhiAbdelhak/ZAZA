import React from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import Router from 'next/router'
import { Box, Button, Typography } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

function NoData({ title = t('not_found.no_data'), variant = "contained", description = t('not_found.text'), image = "/no-results.png", addButtonLabel }: any) {
    return (
        <Box
            className='zimou-no-data'
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
            <img src={image} alt="" />
            <Typography variant='h2'>{title}</Typography>
            <Typography variant='body1'>{description}</Typography>

            {addButtonLabel && <Button
                variant={variant}
                startIcon={<AddCircle />}
                sx={{
                    width: '100%',
                    marginTop: 2
                }}
                onClick={() =>
                    Router.push('/dashboard/orders/new-ec-order')
                }
            >
                {addButtonLabel}
            </Button>}
        </Box>
    )
}

NoData.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    addButtonLabel: PropTypes.string,
    image: PropTypes.string,
}
export default NoData
