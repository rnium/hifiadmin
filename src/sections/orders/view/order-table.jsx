/* eslint-disable */
import "./styles/order-table.css"
import React from 'react';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import {
    Box, TableContainer, Table, TableHead, TableRow,
    TableCell, TableBody, Tooltip, Chip, Stack, Pagination
} from '@mui/material';

const status_color_mapping = {
    pending: 'warning',
    cancelled: 'error',
    shipped: 'success'
}

const status_variant_mapping = {
    cancelled: 'outlined'
}

const OrdersTable = ({ data, fetchOrder }) => {
    const orders = data?.results || []
    return (
        <TableContainer>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Order No.</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Sub Total (Tk)</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orders.map((order, idx) => (
                            <TableRow key={idx} className="order">
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
            <Stack
                sx={{px: 1, py: 0.5}}
                alignItems="flex-end"
            >
                <Pagination
                    count={data?.total_pages || 1}
                    page={data?.current_page || 1}
                    onChange={(e, v) => {
                        fetchOrder({
                            page: v
                        })
                    }}
                />
            </Stack>
        </TableContainer>
    )
}

export default OrdersTable;

OrdersTable.propTypes = {
    data: PropTypes.any,
    fetchOrder: PropTypes.any
}