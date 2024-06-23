import * as Yup from 'yup';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, getIn, Formik, FieldArray } from 'formik'

import {
  Box, Chip, Card, Grid, Stack, Button, Container, TextField, Typography,
} from '@mui/material';

import { product_tags } from 'src/_mock/products';

import ConfigTable from '../config-table';


function AddProductView({ slug }) {
  // const [tags, setTags] = useState([...product_tags])
  const [newTableTitle, setNewTableTitle] = useState('')

  const newTable = () => (
    {
      title: newTableTitle,
      specs: [
        {
          label: '',
          value: '',
        }
      ]
    }
  )

  const validationSchema = Yup.object({
    product_title: Yup.string().required("Product title is required"),
    price: Yup.number().required("Product price is required"),
    discount_price: null,
    stock_count: Yup.number().required("Product stock count is required"),
    table: Yup.array(
      Yup.object({
        title: Yup.string().required("Table title is required"),
        specs: Yup.array(
          Yup.object({
            label: Yup.string().required('Specification title is required'),
            value: Yup.string().required('Specification value is required'),
          })
        )
      })
    )
  })

  return (
    <Container>
      <Typography variant='h4'>Add New Product in <Typography variant='h4' color="secondary" component="span">{slug}</Typography> Category</Typography>
      <Formik
        initialValues={{
          product_title: '',
          price: null,
          discount_price: null,
          stock_count: null,
          tags: product_tags,
          images: [],
          table: [
            {
              title: 'Tbl 1',
              specs: [
                {
                  label: '',
                  value: '',
                }
              ]
            },
            {
              title: 'Tbl 2',
              specs: [
                {
                  label: '',
                  value: '',
                }
              ]
            },
          ]
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(JSON.stringify(values));
        }}
      >
        {
          ({ values, touched, errors, handleChange, handleBlur }) => {
            const title_error = getIn(errors, 'product_title');
            const title_touched = getIn(touched, 'product_title');
            return (
              <Form noValidate>
                <Card sx={{ px: 2, py: 3, mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Product Title"
                            name='product_title'
                            variant='filled'
                            multiline
                            rows={2}
                            value={values.product_title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={title_touched && Boolean(title_error)}
                            helperText={title_touched && Boolean(title_error) ? title_error : ''}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            variant='filled'
                            name='price'
                            label="Original Price"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            variant='filled'
                            name='discount_price'
                            label="Discount Price"
                            value={values.discount_price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            variant='filled'
                            name='stock_count'
                            label="Stock Count"
                            value={values.stock_count}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
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
                              values.tags.map(t => (
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
                <FieldArray name='table'>
                  {
                    ({ push, remove }) => (
                      <>
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
                              onChange={e => setNewTableTitle(e.target.value)}
                              label="New Table Name"
                            />
                            <Button
                              onClick={() => push(newTable())}
                              variant='contained'
                              disabled={newTableTitle.length === 0}
                            >
                              Add Table
                            </Button>
                          </Stack>
                        </Stack>
                        {
                          values.table.map((tbl, idx) => (
                            <ConfigTable
                              key={`table[${idx}]`}
                              tableData={tbl}
                              tableIndex={idx}
                              sx={{ mt: 2 }}
                              handleRemove={() => remove(idx)}
                              touched={touched}
                              errors={errors}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                            />
                          ))
                        }
                      </>
                    )
                  }
                </FieldArray>
                <Stack direction='row' justifyContent='flex-end' sx={{ mt: 2 }}>
                  <Button variant='contained' type='submit' >Add Product</Button>
                </Stack>
              </Form>
            )
          }
        }
      </Formik>
    </Container>
  )
}

export default AddProductView;

AddProductView.propTypes = {
  slug: PropTypes.string
}