// import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Chip, Card, Grid, Container, TextField, Typography
} from '@mui/material';

import { product_tags } from 'src/_mock/products';

function AddProductView({ slug }) {
  // const [tags, setTags] = useState([...product_tags])
  return (
    <Container>
      <Typography variant='h4'>Add New Product in <Typography variant='h4' color="secondary" component="span">{slug}</Typography> Category</Typography>
      <Card sx={{ px: 2, py: 3, mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Title"
                  variant='filled'
                  multiline
                  rows={2}
                  maxRows={3}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth variant='filled' label="Original Price" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth variant='filled' label="Discount Price" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth variant='filled' label="Stock Count" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='body1'>Tags</Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mt: 1
              }}
            >
              {
                product_tags.map(t => (
                  <Chip
                    key={t.slug}
                    label={t.title}
                    onDelete={() => console.log("deleted")}
                  />
                ))
              }
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

export default AddProductView;

AddProductView.propTypes = {
  slug: PropTypes.string
}