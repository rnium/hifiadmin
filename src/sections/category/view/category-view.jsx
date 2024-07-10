import * as Yup from 'yup';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form, Formik, FieldArray } from 'formik';

import {
  Box, Stack, Button, Divider, Tooltip, TextField, Container, Typography, Breadcrumbs, Link as MUILink
} from '@mui/material'

import { useGet, usePost } from 'src/hooks/useApi';

import { api_endpoints, endpoint_suffixes } from 'src/utils/data';

import Loading from 'src/layouts/dashboard/common/loading';

import Iconify from 'src/components/iconify';

import ProductTable from 'src/sections/products/product-table-main';

import SpecTable from '../spec-table';
import AddCatModal from '../add-modal';
import AddGrabITModal from '../add-grabit-modal';

// ----------------------------------------------------------------------

export default function CategoryPage({ slug }) {
  const [newTableTitle, setNewTableTitle] = useState('');
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [grabitModalOpen, setGrabitModalOpen] = useState(false);
  const newTable = () => (
    {
      title: newTableTitle,
      id: null,
      specs: [
        {
          id: null,
          title: '',
          aliases: '',
        }
      ]
    }
  )
  const { data, loaded, reset, error, perform_get } = useGet(`${api_endpoints.categories}${slug}`);
  const { 
    data: cat_products, 
    loaded: cat_products_loaded, 
    perform_get: load_cat_products,
    reset: resetCatProducts
  } = useGet(`${api_endpoints.categories}${slug}${endpoint_suffixes.products}`, false, []);
  const { 
    data: tagged_cat_products, 
    loaded: tagged_cat_products_loaded, 
    perform_get: load_tagged_cat_products,
    reset: resetTaggedCatProducts
  } = useGet(`${api_endpoints.tags}${slug}${endpoint_suffixes.products}`, false, []);

  const { loading: postingTable, success: tableUpdateSuccess, reset: tableUpdateReset, error: tableError, setError: setTableError, perform_post: post_table } = usePost(`${api_endpoints.categories}${slug}${endpoint_suffixes.update_table}`)

  useEffect(() => {
    if (!loaded) {
      perform_get();
    }
    if (!cat_products_loaded) {
      load_cat_products();
    }
    if (!tagged_cat_products_loaded) {
      load_tagged_cat_products();
    }
  }, [loaded, perform_get, cat_products_loaded, load_cat_products, tagged_cat_products_loaded, load_tagged_cat_products])

  useEffect(() => {
    reset();
    resetCatProducts();
    resetTaggedCatProducts();
  }, [slug, reset, resetCatProducts, resetTaggedCatProducts])

  useEffect(() => {
    if (tableUpdateSuccess) {
      message.info('Tables updated')
      tableUpdateReset();
      reset();
    }
    if (tableError) {
      message.error('Cannot update')
      setTableError(false);
    }
  }, [tableUpdateSuccess, tableError, reset, tableUpdateReset, setTableError])

  const validationSchema = Yup.object({
    table: Yup.array(
      Yup.object({
        title: Yup.string().required("Table title is required"),
        specs: Yup.array(
          Yup.object({
            title: Yup.string().required('Title is required'),
          })
        )
      })
    )
  })

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
        {
          data.category_tree.length > 1 ?
            <Stack
              alignItems='center'
            >
              <Breadcrumbs aria-label="breadcrumb">
                {
                  data.category_tree.map((p, idx) => (
                    <Link
                      key={idx}
                      to={`/category/${p.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <MUILink color={p.id === data.id ? 'primary' : 'text.secondary'} style={{ textDecoration: 'none' }}>
                        {p.title}
                      </MUILink>
                    </Link>
                  ))
                }
              </Breadcrumbs>
            </Stack> : null
        }
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={3}
          mb={2}
        >
          <Typography variant="h4">Products in {data?.title} </Typography>
          <Link to={`/category/${slug}/addproduct`}>
            <Button color="success" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Product
            </Button>
          </Link>
        </Stack>
        <ProductTable products={cat_products} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={3}
          mb={2}
        >
          <Typography variant="h4">Tagged Products of {data?.title} </Typography>
        </Stack>
        <ProductTable products={tagged_cat_products} />
        {/* <Divider sx={{ my: 1.5 }} /> */}
        <Formik
          initialValues={{
            table: data?.tables || []
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            post_table(values.table);
          }}
        >
          {
            ({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
              <Form noValidate>
                <Typography
                  textAlign="center"
                  variant='h6'
                  sx={{ mt: 3 }}
                >
                  Configuration Tables ({values.table.length})
                </Typography>
                <Tooltip
                  title="All these tables will be used in all the products of the current category"
                  arrow
                >
                  <Typography
                    textAlign="center"
                    variant='body2'
                    color='text.secondary'
                  >
                    Tables in the tree ({data.tree_tables?.length || 0})
                  </Typography>
                </Tooltip>
                <FieldArray name='table'>
                  {
                    ({ push, remove }) => (
                      <>
                        {
                          values.table.map((tbl, idx) => (
                            <SpecTable
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
                        <AddGrabITModal
                          open={grabitModalOpen}
                          setOpen={setGrabitModalOpen}
                          push={push}
                        />
                        <Stack
                          spacing={2}
                          sx={{ my: 3 }}
                          direction="row"
                          justifyContent='space-between'
                        >

                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-start"
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
                            <Button
                              onClick={() => setGrabitModalOpen(true)}
                              variant='outlined'
                              color='info'
                            >
                              Grabit
                            </Button>
                          </Stack>
                          <Button
                            onClick={(e) => handleSubmit(e)}
                            variant='contained'
                            disabled={postingTable}
                          >
                            Save Tables
                          </Button>
                        </Stack>
                      </>
                    )
                  }
                </FieldArray>
              </Form>
            )
          }
        </Formik>
        

      </Container>
    </>
  );
}

CategoryPage.propTypes = {
  slug: PropTypes.any
}
