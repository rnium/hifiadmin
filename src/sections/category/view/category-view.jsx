import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Box, Stack, Button, Divider, Container, Typography
} from '@mui/material'

import { useGet } from 'src/hooks/useApi';

import { api_endpoints } from 'src/utils/data';

import { products } from 'src/_mock/products';
import { categories } from 'src/_mock/categories';

import Iconify from 'src/components/iconify';

import ProductTable from 'src/sections/products/product-table-main';

import AddCatModal from '../add-modal';

// ----------------------------------------------------------------------

export default function CategoryPage({ slug }) {
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const { data, loaded, loading, success, error, perform_get } = useGet();
  return (
    <>
      <AddCatModal
        open={addCategoryModalOpen}
        setOpen={setAddCategoryModalOpen}
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4">{slug}</Typography>
          <Button onClick={() => setAddCategoryModalOpen(true)} color="success" variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Sub Category
          </Button>
        </Stack>
        <Divider />
        <Typography sx={{ my: 1 }}>Sub Categories under {slug}</Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mb: 2
          }}
        >
          {
            categories.map(cat => (
              <Button
                variant='contained'
                key={cat.slug}
              >
                {cat.title}
              </Button>
            ))
          }

        </Box>
        <Divider sx={{ my: 1 }} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4">{slug}</Typography>
          <Link to={`/category/${slug}/addproduct`}>
            <Button color="success" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Product
            </Button>
          </Link>
        </Stack>
        <ProductTable products={products} />

      </Container>
    </>
  );
}

CategoryPage.propTypes = {
  slug: PropTypes.any
}
