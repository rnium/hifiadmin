import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Form, getIn, Formik, FieldArray } from 'formik'

import {
  Box, Chip, Card, Grid, Stack, Button, Container, TextField, Typography,
} from '@mui/material';

import { useGet, usePost } from 'src/hooks/useApi';

import { api_endpoints, endpoint_suffixes } from 'src/utils/data';

import { all_tags } from 'src/_mock/products';
import Loading from 'src/layouts/dashboard/common/loading';

import ConfigTable from '../config-table';
import AddTagModal from '../add-tag-modal';
import ProductImages from '../product-images';
import KeyFeatureTable from '../keyfeature-table';

const addproduct_config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}



function AddProductView({ slug }) {
  const [images, setImages] = useState([])
  const [tagsModalOpen, setTagsModalOpen] = useState(false);
  const { data, loaded, reset, error, perform_get } = useGet(`${api_endpoints.categories}${slug}`);
  const {
    loading: postingProduct,
    success: productUpdateSuccess,
    reset: productUpdateReset,
    error: productError,
    setError: setproductError,
    perform_post: post_product
  } = usePost(`${api_endpoints.categories}${slug}${endpoint_suffixes.addproduct}`, true, addproduct_config);


  useEffect(() => {
    if (!loaded) {
      perform_get();
    }
  }, [perform_get, loaded])

  if (!loaded || error) {
    return (
      <Loading sx={{ mt: '5vh' }} size='large' />
    )
  }

  const handleSubmit = values => {
    const formData = new FormData();
    formData.append('json', JSON.stringify(values))
    images.forEach(img => {
      formData.append('images', img);
    })
    console.log(values);
    post_product(formData);
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required").min(0, 'Cannot be less than 0'),
    discount: Yup.number(),
    stock_count: Yup.number().required("Stock count is required").min(0, 'Cannot be less than 0'),
    key_features: Yup.array(
      Yup.object({
        label: Yup.string().required('Title is required'),
      })
    ),
  })

  const data_tables = data?.tree_tables.map(tbl => ({
    id: tbl.id,
    title: tbl.title,
    specs: tbl.specs.map(spec => ({
      id: spec.id,
      title: spec.title,
      value: ''
    }))
  }))

  return (
    <Container>
      <Typography variant='h4'>Add New Product in <Typography variant='h4' color="secondary" component="span">{data.title}</Typography> Category</Typography>
      <Formik
        initialValues={{
          category: data.id,
          title: '',
          price: '',
          discount: '',
          stock_count: '',
          details: '',
          product_tags: [],
          key_features: [
            {
              label: '',
              value: '',
            }
          ],
          table: data_tables
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {
          ({ values, touched, errors, handleChange, handleBlur, handleSubmit: submitForm }) => {
            const title_error = getIn(errors, 'product_title');
            const title_touched = getIn(touched, 'product_title');
            const price_error = getIn(errors, 'price');
            const discount_error = getIn(errors, 'discount');
            const price_touched = getIn(touched, 'price');
            const stock_error = getIn(errors, 'stock_count');
            const stock_touched = getIn(touched, 'stock_count');
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
                            name='title'
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
                            type='number'
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={price_touched && Boolean(price_error)}
                            helperText={price_touched && Boolean(price_error) ? price_error : ''}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            variant='filled'
                            name='discount'
                            type='number'
                            label="Discount Price"
                            value={values.discount_price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(discount_error)}
                            helperText={Boolean(discount_error) || ''}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            variant='filled'
                            name='stock_count'
                            label="Stock Count"
                            type='number'
                            value={values.stock_count}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={stock_touched && Boolean(stock_error)}
                            helperText={stock_touched && Boolean(stock_error) ? stock_error : ''}
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
                            <FieldArray name="product_tags">
                              {
                                ({ push, remove }) => (
                                  <>
                                    <AddTagModal
                                      open={tagsModalOpen}
                                      setOpen={setTagsModalOpen}
                                      all_tags={all_tags}
                                      added_tags={values.product_tags}
                                      push={push}
                                      remove={remove}
                                    />
                                    {
                                      values.product_tags.map((t, idx) => (
                                        <Chip
                                          key={t}
                                          label={all_tags.find(tag => tag.id === t).title}
                                          onDelete={() => remove(idx)}
                                        />
                                      ))
                                    }
                                  </>
                                )
                              }

                            </FieldArray>
                            <Chip
                              variant='contained'
                              color='primary'
                              label="Add Tag"
                              onClick={() => setTagsModalOpen(true)}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant='body1'>Product Images</Typography>
                      <ProductImages
                        images={images}
                        setImages={setImages}
                      />
                    </Grid>
                  </Grid>
                </Card>
                <KeyFeatureTable
                  tableData={{ specs: values.key_features }}
                  sx={{ mt: 2 }}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <Typography
                  textAlign="center"
                  variant='h6'
                  sx={{ mt: 4 }}
                >
                  Product Configurations
                </Typography>
                {
                  values.table.map((tbl, idx) => (
                    <ConfigTable
                      key={`table[${idx}]`}
                      tableData={tbl}
                      tableIndex={idx}
                      sx={{ mt: 2 }}
                      touched={touched}
                      errors={errors}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  ))
                }
                <Card
                  sx={{ p: 2, mt: 3 }}
                >
                  <Box>
                    <TextField
                      label="Product Description"
                      name='details'
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={5}
                    />
                  </Box>
                </Card>
                <Stack direction='row' justifyContent='flex-end' sx={{ mt: 2 }}>
                  <Button variant='contained' type='submit'>Add Product</Button>
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