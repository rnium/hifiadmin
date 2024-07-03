import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from './table-no-data';
import TableEmptyRows from './table-empty-rows';
import ProductTableRow from './product-table-row';
import ProductTableHead from './product-table-head';
import ProductTableToolbar from './product-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';

// ----------------------------------------------------------------------

export default function ProductTable({products, sx}) {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = products.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: products,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;
    return (
        <Card sx={{...sx}}>
            <ProductTableToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
            />

            <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 800 }}>
                        <ProductTableHead
                            order={order}
                            orderBy={orderBy}
                            rowCount={products.length}
                            numSelected={selected.length}
                            onRequestSort={handleSort}
                            onSelectAllClick={handleSelectAllClick}
                            headLabel={[
                                { id: 'name', label: 'Product Name' },
                                { id: 'price', label: 'Price' },
                                { id: 'discount', label: 'Discount Price' },
                                { id: 'instock', label: 'Stock', align: 'center' },
                                { id: '' },
                            ]}
                        />
                        <TableBody>
                            {dataFiltered
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <ProductTableRow
                                        key={row.id}
                                        name={row.name}
                                        slug={row.id}
                                        price={row.price}
                                        cover={row.cover}
                                        priceSale={row.priceSale}
                                        stock={false}
                                        selected={selected.indexOf(row.name) !== -1}
                                        handleClick={(event) => handleClick(event, row.name)}
                                    />
                                ))}

                            <TableEmptyRows
                                height={77}
                                emptyRows={emptyRows(page, rowsPerPage, products.length)}
                            />

                            {notFound && <TableNoData query={filterName} />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>

            <TablePagination
                page={page}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25, 100]}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}

ProductTable.propTypes = {
    products: PropTypes.any,
    sx: PropTypes.any
}
