import * as Yup from 'yup';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, getIn, Formik, FieldArray } from 'formik'

import {
  Box, Chip, Card, Grid, Stack, Button, Skeleton, Container, TextField, Typography,
} from '@mui/material';

import { useGet, usePost } from 'src/hooks/useApi';

import { api_endpoints, endpoint_suffixes } from 'src/utils/data';

import Loading from 'src/layouts/dashboard/common/loading';

import ConfigTable from '../config-table';
import GrabitModal from '../grabit-modal';
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
  const navigate = useNavigate();
  const [tagsModalOpen, setTagsModalOpen] = useState(false);
  const [gabitModalOpen, setGrabitModalOpen] = useState(true);
  const { data, loaded, error, perform_get } = useGet(`${api_endpoints.categories}${slug}`);
  const { data: all_tags, loaded: tagsLoaded, perform_get: loadTags } = useGet(`${api_endpoints.categories}?parent=all`, false, []);
  const {
    loading: postingProduct,
    success: productAddSuccess,
    reset: productAddReset,
    error: productAddError,
    perform_post: post_product
  } = usePost(`${api_endpoints.categories}${slug}${endpoint_suffixes.addproduct}`, true, addproduct_config);

  const [initialValues, setInitialValues] = useState({
    category: null,
    title: '',
    price: '',
    discount: 0,
    stock_count: '',
    details: '',
    tags: [],
    key_features: [
      {
        title: '',
        value: '',
      }
    ],
    tables: []
  })

  useEffect(() => {
    if (!tagsLoaded) {
      loadTags();
    }
  }, [tagsLoaded, loadTags])

  useEffect(() => {
    if (!loaded) {
      perform_get();
    } else {
      const dat = data;
      setInitialValues(prevState => (
        {
          ...prevState,
          tags: dat?.category_tree.map(cat => cat.id),
          tables: dat?.tree_tables.map(tbl => ({
            id: tbl.id,
            title: tbl.title,
            specs: tbl.specs.map(spec => ({
              id: spec.id,
              title: spec.title,
              value: ''
            }))
          }))
        }
      ))
    }
  }, [perform_get, loaded, data])

  useEffect(() => {
    if (productAddSuccess) {
      message.success("Product added successfully");
      navigate(`/category/${slug}`);
    }
    if (productAddError) {
      message.error(JSON.stringify(productAddError));
      productAddReset()
    }
  }, [productAddSuccess, productAddError, productAddReset, navigate, slug])

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
        title: Yup.string().required('Title is required'),
      })
    ),
  })


  return (
    <Container>
      <Stack
        direction='row'
        justifyContent='space-between'
      >
        <Typography variant='h4'>Add New Product in <Typography variant='h4' color="secondary" component="span">{data.title}</Typography> Category</Typography>
        <Button
          variant='outlined'
          onClick={() => setGrabitModalOpen(true)}
        >
          GrabIT
        </Button>
      </Stack>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {
          ({ values, touched, errors, handleChange, handleBlur }) => {
            const title_error = getIn(errors, 'product_title');
            const title_touched = getIn(touched, 'product_title');
            const price_error = getIn(errors, 'price');
            const discount_error = getIn(errors, 'discount');
            const price_touched = getIn(touched, 'price');
            const stock_error = getIn(errors, 'stock_count');
            const stock_touched = getIn(touched, 'stock_count');
            return (
              <Form noValidate>
                <GrabitModal
                  open={gabitModalOpen}
                  setOpen={setGrabitModalOpen}
                  values={values}
                  setInitialValues={setInitialValues}
                  setImages={setImages}
                />
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
                            label="Discount Amount"
                            value={values.discount}
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
                          {
                            !tagsLoaded ?
                              <Stack
                                sx={{ mt: 1 }}
                                spacing={1}
                                direction='row'
                              >
                                <Skeleton variant='rounded' width={100} height={25} />
                                <Skeleton variant='rounded' width={100} height={25} />
                                <Skeleton variant='rounded' width={100} height={25} />
                                <Skeleton variant='rounded' width={100} height={25} />
                              </Stack> :
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
                          }
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
                  <Button disabled={postingProduct} variant='contained' type='submit' onClick={() => console.log(values)}>Add Product</Button>
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