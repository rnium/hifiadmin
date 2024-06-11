import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { products } from 'src/_mock/products';
import { categories } from 'src/_mock/categories';

import Iconify from 'src/components/iconify';

import ProductTable from '../product-table-main';



// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4">All Categories</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Category
        </Button>
      </Stack>
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
            >
              {cat.title}
            </Button>
          ))
        }

      </Box>
      <Typography variant="h4" sx={{mb: 1}}>All Products</Typography>
        <ProductTable products={products} />
      
    </Container>
  );
}
