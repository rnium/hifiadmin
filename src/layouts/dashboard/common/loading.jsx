import { Spin } from 'antd'
import propTypes from 'prop-types'

import { Box } from '@mui/material'


function Loading({sx, size}) {
  return (
    <Box
        sx={{
            ...sx,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Spin size={size} />
    </Box>
  )
}

export default Loading;

Loading.propTypes = {
    sx: propTypes.any,
    size: propTypes.any,
}