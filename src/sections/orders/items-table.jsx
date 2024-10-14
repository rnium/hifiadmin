import { Image } from 'antd';
import PropTypes from 'prop-types';

import {
    Paper, Stack, Table, TableRow, TableHead,
    TableCell, TableBody, Typography, TableContainer
} from '@mui/material';

const ItemsTable = ({ cart }) => {
    const { products } = cart;
    return (
        <Paper>
            <Typography
                sx={{ py: 1, px: 2 }}
                variant="h6"
                color="text.secondary"
            >
                Cart Items
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map((itm, idx) => (
                                <TableRow
                                    key={idx}
                                >
                                    <TableCell>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <Image
                                                src={itm.product.cover}
                                                width={100}
                                            />

                                            <Stack>
                                                <Typography>
                                                    {itm.product.title}
                                                </Typography>
                                                <Typography
                                                    variant='caption'
                                                    color="text.secondary"
                                                >
                                                    ID: {itm.product.id}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        {itm.product.category}
                                    </TableCell>
                                    <TableCell>
                                        {itm.quantity}
                                    </TableCell>
                                    <TableCell>
                                        {itm.product.priceSale}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{ fontWeight: 'bold' }}
                                            color="text.secondary"
                                        >
                                            {
                                                (itm.product.priceSale ?? 1) * (itm.quantity ?? 1)
                                            }
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default ItemsTable;

ItemsTable.propTypes = {
    cart: PropTypes.any
}