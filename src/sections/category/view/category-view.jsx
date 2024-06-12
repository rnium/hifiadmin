import { useState } from 'react';
import PropTypes from 'prop-types';
import { stubFalse } from 'lodash';

import {
  Box, Fade, Stack, Modal, Paper, Button, Divider, Backdrop, Container,
  TextField, Typography,
} from '@mui/material'

import { products } from 'src/_mock/products';
import { categories } from 'src/_mock/categories';

import Iconify from 'src/components/iconify';

import ProductTable from 'src/sections/products/product-table-main';


// ----------------------------------------------------------------------

const modalContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


export default function CategoryPage({ slug }) {
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(stubFalse);
  const handleAddCategoryModalClose = e => {
    setAddCategoryModalOpen(false);
  }
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={addCategoryModalOpen}
        onClose={handleAddCategoryModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={addCategoryModalOpen} direction='up'>
          <Paper style={modalContainerStyle} sx={{ p: 2, py: 3 }} elevation={0}>
            <Typography>Add Subcategory of {slug}</Typography>
            <Stack
              alignItems="flex-end"
              spacing={1}
              sx={{mt: 1}}
            >
              <TextField
                label="Sub Category Name"
                variant='filled'
                fullWidth
              />
              <Button variant='contained'>Add</Button>
            </Stack>
          </Paper>
        </Fade>
      </Modal>
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
          <Button color="success" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Product
          </Button>
        </Stack>
        <ProductTable products={products} />

      </Container>
    </>
  );
}

CategoryPage.propTypes = {
  slug: PropTypes.any
}
