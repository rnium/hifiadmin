import * as Yup from 'yup';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form, Formik, FieldArray } from 'formik';

import {
  Box, Stack, Button, Divider, Tooltip, TextField, Container, Typography
} from '@mui/material'

import { useGet, usePost } from 'src/hooks/useApi';

import { api_endpoints, endpoint_suffixes } from 'src/utils/data';

import { products } from 'src/_mock/products';
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
  const { data, loaded, setLoaded, error, perform_get } = useGet(`${api_endpoints.categories}${slug}`);
  const {loading: postingTable, success: tableUpdateSuccess, setSuccess, error: tableError, setError: setTableError, perform_post: post_table} = usePost(`${api_endpoints.categories}${slug}${endpoint_suffixes.update_table}`)
  
  useEffect(() => {
    if (!loaded) {
      perform_get();
    }
  }, [perform_get, loaded])

  useEffect(() => {
    setLoaded(false);
  }, [slug, setLoaded])

  useEffect(() => {
    if (tableUpdateSuccess) {
      message.info('Tables updated')
      setSuccess(false);
    }
    if (tableError) {
      message.error('Cannot update')
      setTableError(false);
    }
  }, [tableUpdateSuccess, setSuccess, tableError, setTableError])

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
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={3}
          mb={2}
        >
          <Typography variant="h4">All Products under {data?.title}</Typography>
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
