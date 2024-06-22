// import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Chip, Card, Grid, Stack, Button, Container, TextField, Typography,
} from '@mui/material';

import { product_tags } from 'src/_mock/products';

import ConfigTable from '../config-table';

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
              <Grid item xs={12}>
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
                  <Chip
                    variant='contained'
                    color='primary'
                    label="Add Tag"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='body1'>Product Images</Typography>
          </Grid>
        </Grid>
      </Card>
      <Stack
        spacing={2}
        sx={{ my: 5 }}
      >
        <Typography
          textAlign="center"
          variant='h6'
        >
          Configuration Tables
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <TextField
            // fullWidth
            label="New Table Name"
          />
          <Button variant='contained' >Add Table</Button>
        </Stack>
      </Stack>
      <ConfigTable sx={{ mt: 2 }} />
      <ConfigTable sx={{ mt: 2 }} />
      <ConfigTable sx={{ mt: 2 }} />
    </Container>
  )
}

export default AddProductView;

AddProductView.propTypes = {
  slug: PropTypes.string
}