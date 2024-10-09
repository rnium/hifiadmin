/* eslint-disable */
import React from 'react';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import { 
    TableContainer, Table, TableHead, TableRow,
    TableCell, TableBody, Tooltip, Chip
} from '@mui/material';

const status_color_mapping = {
    pending: 'warning',
    cancelled: 'error',
    shipped: 'success'
}

const status_variant_mapping = {
    cancelled: 'outlined'
}

const OrdersTable = ({ data }) => {
    const orders = data?.results || []
    return (
        <TableContainer>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Sub Total (Tk)</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orders.map((order, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Tooltip title={order.oid} placement="right">
                                        {order.id}
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    {
                                        dateFormat(order.added_at)
                                    }
                                </TableCell>
                                <TableCell>{order.payable.toLocaleString('en-In')}</TableCell>
                                <TableCell>
                                    {
                                        order.location === 'inside' ? "Sylhet" : "Outside"
                                    }
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label={(order.status)}
                                        size="small"
                                        color={status_color_mapping?.[order.status] || 'primary'}
                                        variant={status_variant_mapping?.[order.status] || 'default'}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrdersTable;

OrdersTable.propTypes = {
    data: PropTypes.any
}