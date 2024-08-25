/* eslint-disable */

import * as Yup from 'yup';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RiAddLargeLine, RiSave3Fill } from '@remixicon/react'
import { Form, getIn, Formik, FieldArray, Field } from 'formik'

import {
  Box, Fab, Chip, Card, Grid, Stack, FormControl, Container, TextField, Typography,
  InputLabel, Select, MenuItem, Link as MuiLink
} from '@mui/material';

import { useGet, usePost } from 'src/hooks/useApi';

import { api_endpoints, endpoint_suffixes } from 'src/utils/data';

import ConfigTable from 'src/sections/add_product/config-table';
import AddTagModal from 'src/sections/add_product/add-tag-modal';
import ProductImages from 'src/sections/add_product/product-images';
import KeyFeatureTable from 'src/sections/add_product/keyfeature-table';
import { prepare_prod_spectables } from 'src/utils/editproduct';


const editproduct_config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}


function EditProduct({ slug, prod, all_tags, tagGroups, key_features }) {
  const { perform_get: fetchSpecTables, data: specTables, loading, loaded, url, setUrl } = useGet(null, false, []);
  // Todo: load tables with cat change
  const [images, setImages] = useState([])
  const navigate = useNavigate();
  const [tagsModalOpen, setTagsModalOpen] = useState(false);

  const {
    loading: postingProduct,
    success: productEditSuccess,
    reset: productEditReset,
    error: productEditError,
    perform_post: post_product
  } = usePost(`${api_endpoints.categories}${slug}${endpoint_suffixes.editproduct}`, true, editproduct_config);

  useEffect(() => {
    fetchSpecTables();
  }, [url])

  useEffect(() => {
    if (productEditSuccess) {
      message.success("Product modified successfully");
      navigate(`/category/${slug}`);
    }
    if (productEditError) {
      message.error(JSON.stringify(productEditError));
      productEditReset()
    }
  }, [productEditSuccess, productEditError, productEditReset, navigate, slug])

  const handleSubmit = values => {
    const formData = new FormData();
    formData.append('json', JSON.stringify(values));
    images.forEach(img => {
      formData.append('images', img);
    })
    post_product(formData);
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required").min(0, 'Cannot be less than 0'),
    discount: Yup.number(),
    stock_count: Yup.number().required("Stock count is required").min(0, 'Cannot be less than 0'),
    key_features: Yup.array(
      Yup.object({
        title: Yup.string().required('Title is required'),
      })
    ),
  })

  const existing_cat = all_tags.find(tag => tag.id === prod.category);

  return (
    <Container>
      <Typography variant='h4'>Edit Product</Typography>
      <Formik
        initialValues={
          {
            category: prod.category,
            title: prod.title,
            price: prod.price,
            discount: prod.discount,
            stock_count: 1,
            details: prod.details,
            tags: prod.tags,
            key_features: key_features,
            tables: prod.spec_tables,
            images: prod.images
          }
        }
        validationSchema={validationSchema}
        onSubmit={values => console.log(values)}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {
          ({ values, touched, errors, handleChange, handleBlur, setFieldValue }) => {
            useEffect(() => {
              setUrl(`${api_endpoints.categories}${values.category}${endpoint_suffixes.tables}?tree=yes`);
            }, [values.category])

            useEffect(() => {
              setFieldValue('tables', prepare_prod_spectables(prod.spec_tables, specTables));
            }, [specTables])

            const title_error = getIn(errors, 'product_title');
            const title_touched = getIn(touched, 'product_title');
            const price_error = getIn(errors, 'price');
            const discount_error = getIn(errors, 'discount');
            const price_touched = getIn(touched, 'price');
            return (
              <Form noValidate >
                <Stack
                  direction='row'
                  spacing={2}
                  sx={{ my: 2 }}
                  alignItems='center'
                >
                  <Box sx={{ maxWidth: 400, minWidth: 250 }}>
                    <FormControl fullWidth>
                      <InputLabel >Product Category</InputLabel>
                      <Select
                        name='category'
                        value={values.category}
                        label="Product Category"
                        onChange={handleChange}
                      >
                        {
                          all_tags.filter(tag => tag.cat_type !== 'tag').sort(tag => tag.id).map((tag, idx) => (
                            <MenuItem
                              key={idx}
                              value={tag.id}
                            >
                              {tag.slug}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Box>
                  {
                    values.category !== existing_cat.id && (
                      <Typography
                      >
                        Previous&nbsp;
                        <Chip
                          color='error'
                          variant='outlined'
                          onClick={() => setFieldValue('category', existing_cat.id)}
                          label={existing_cat.slug}
                        />
                      </Typography>
                    )
                  }
                </Stack>
                <Card sx={{ px: 2, py: 3, mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="Product Title"
                            name='title'
                            variant='filled'
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={title_touched && Boolean(title_error)}
                            helperText={title_touched && Boolean(title_error) ? title_error : ''}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            variant='filled'
                            name='discount'
                            type='number'
                            label="Discount Amount"
                            value={values.discount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(discount_error)}
                            helperText={Boolean(discount_error) || ''}
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
                            <FieldArray name="tags">
                              {
                                ({ push, remove }) => (
                                  <>
                                    <AddTagModal
                                      open={tagsModalOpen}
                                      setOpen={setTagsModalOpen}
                                      groups={tagGroups}
                                      all_tags={all_tags}
                                      added_tags={values.tags}
                                      push={push}
                                      remove={remove}
                                    />
                                    {
                                      values.tags.map((t, idx) => (
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
                      <FieldArray name='images'>
                        {
                          ({ remove }) => (
                            <ProductImages
                              images={images}
                              setImages={setImages}
                              prevImages={values.images}
                              removePrev={remove}
                            />
                          )
                        }
                      </FieldArray>
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
                  values.tables.map((tbl, idx) => (
                    <ConfigTable
                      key={`tables[${idx}]`}
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
                {/* 
                <Card
                  sx={{ p: 2, mt: 3 }}
                >
                  <Box>
                    <TextField
                      label="Product Description"
                      name='details'
                      value={values.details}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={20}
                    />
                  </Box>
                </Card> */}
                <Stack
                  direction='row'
                  justifyContent='flex-end'
                  sx={{ mt: 2, position: 'fixed', bottom: 16, right: 16 }}
                >
                  <Fab
                    color='primary'
                    type='submit'
                    disabled={postingProduct}
                    variant='extended'
                  >
                    <RiSave3Fill
                      size={25}
                      style={{ marginRight: 7 }}
                    />
                    Save
                  </Fab>
                </Stack>

              </Form>
            )
          }
        }
      </Formik>
    </Container>
  )
}

export default EditProduct;

EditProduct.propTypes = {
  slug: PropTypes.string
}