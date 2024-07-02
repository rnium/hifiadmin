import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {
  Box, Stack, Button, Divider, Tooltip, Container, Typography
} from '@mui/material'

import { useGet } from 'src/hooks/useApi';

import { api_endpoints } from 'src/utils/data';

import { products } from 'src/_mock/products';
import Loading from 'src/layouts/dashboard/common/loading';

import Iconify from 'src/components/iconify';

import ProductTable from 'src/sections/products/product-table-main';

import AddCatModal from '../add-modal';

// ----------------------------------------------------------------------

export default function CategoryPage({ slug }) {
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

  const { data, loaded, error, perform_get } = useGet(`${api_endpoints.categories}${slug}`);

  useEffect(() => {
    perform_get();
  }, [slug, perform_get])

  if (!loaded || error) {
    return (
      <Loading sx={{ mt: '5vh' }} size='large' />
    )
  }

  return (
    <>
      <AddCatModal
        open={addCategoryModalOpen}
        setOpen={setAddCategoryModalOpen}
        parent={data?.id}
        parentType={data?.cat_type}
        refetchPage={perform_get}
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4">{data?.title}</Typography>
          {
            data?.cat_type === 'tag' ? null :
              <Button onClick={() => setAddCategoryModalOpen(true)} color="success" variant="outlined" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Sub Category
              </Button>
          }
        </Stack>
        <Divider />
        {/* <Typography sx={{ my: 1 }}>Sub Categories under {data?.title}</Typography> */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            my: 2
          }}
        >
          {
            !data?.childs?.length ?
              <Box
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Typography
                  textAlign='center'
                  color='text.secondary'
                >
                  No Sub Categories
                </Typography>
              </Box> : null
          }
          {
            data?.childs.map(cat => (
              <Link
                to={`/category/${cat.slug}`}
                key={cat.slug}
              >
                <Tooltip
                  title={`${cat.cat_type} category`}
                  arrow
                >
                  <Button
                    variant='contained'
                  >
                    {cat.title}
                  </Button>
                </Tooltip>
              </Link>
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
