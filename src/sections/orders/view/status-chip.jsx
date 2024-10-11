import PropTypes from 'prop-types';

import Chip from '@mui/material/Chip'

import "./styles/order-table.css"

const status_color_mapping = {
    pending: 'warning',
    cancelled: 'error',
    processing: 'primary',
    shipped: 'secondary',
    delivered: 'success'
}

const status_variant_mapping = {
    cancelled: 'outlined'
}

const StatusChip = ({ status }) => (
    <Chip
        label={(status)}
        size="small"
        color={status_color_mapping?.[status] || 'primary'}
        variant={status_variant_mapping?.[status] || 'default'}
    />
)

export default StatusChip

StatusChip.propTypes = {
    status: PropTypes.any
}