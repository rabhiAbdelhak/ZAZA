import React from 'react'
import PropTypes from 'prop-types'
import { Box, FormLabel } from '@mui/material'

function ZimouRadio({ width, onChangeValue, value, id, name, children, className, checked = false }: any) {
    return (
        <Box sx={{ width: width }} className={`zimou-checks-text ${className}`}>
            <input
                onChange={onChangeValue}
                type="radio"
                checked={checked}
                value={value}
                id={`zimou-radio-${id}`}
                name={name}
            />
            <FormLabel htmlFor={`zimou-radio-${id}`}>
                {children}
            </FormLabel>
        </Box>
    )
}

ZimouRadio.propTypes = {
    width: PropTypes.any,
    onChangeValue: PropTypes.func,
    value: PropTypes.any,
    id: PropTypes.any,
    checked: PropTypes.bool,
    name: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
}

export default ZimouRadio
