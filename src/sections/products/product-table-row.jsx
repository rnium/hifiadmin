import { message } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useDelete } from 'src/hooks/useApi';

import { api_endpoints, endpoint_suffixes } from 'src/utils/data';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function ProductTableRow({
  id,
  selected,
  title,
  slug,
  cover,
  price,
  priceSale,
  in_stock,
  handleClick,
  refetch
}) {
  const [open, setOpen] = useState(null);
  const { perform_delete, loading, success, error } = useDelete(`${api_endpoints.product}${id}${endpoint_suffixes.delete}`);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm("Sure to delete?")
    if (confirmation) {
      perform_delete();
      handleCloseMenu();
    }
  };

  useEffect(() => {
    if (success) {
      message.info('Product Deleted');
      refetch();
    }
    if (error) {
      message.error("Cannot delete product");
    }
  }, [success, error, refetch])

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Link to={`/product/${slug}`} style={{ textDecoration: 'none', color: 'initial' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar alt={title} src={cover} />
              <Typography variant="subtitle2" noWrap>
                {title.length > 50 ? `${title.substr(0, 50)}...` : title}
              </Typography>
            </Stack>
          </Link>
        </TableCell>

        <TableCell>{price}</TableCell>

        <TableCell>{priceSale || '--'}</TableCell>

        <TableCell>
          <Label color={(in_stock ? 'success' : 'error')}>{(in_stock ? 'In Stock' : 'Out of stock')}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }} disabled={loading}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

ProductTableRow.propTypes = {
  id: PropTypes.number,
  selected: PropTypes.any,
  cover: PropTypes.any,
  handleClick: PropTypes.func,
  title: PropTypes.any,
  slug: PropTypes.any,
  price: PropTypes.any,
  priceSale: PropTypes.any,
  in_stock: PropTypes.bool,
  refetch: PropTypes.any,
};
