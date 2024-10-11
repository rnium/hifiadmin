import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { useNavigate } from "react-router-dom";

import {
    Stack, Table, Tooltip, TableRow, TableHead,
    TableCell, TableBody, Pagination, TableContainer
} from '@mui/material';

import StatusChip from './status-chip';

const OrdersTable = ({ data, fetchOrder }) => {
    const orders = data?.results || [];
    const navigate = useNavigate();
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
                            <TableRow key={idx} className="order" onClick={() => navigate(`/orders/${order.oid}?ref=dash`)}>
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
                                    <StatusChip 
                                        status={order.status}
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