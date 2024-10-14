/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';

import dateFormat from 'dateformat';

import {
  Box, Grid, Stack, Divider, Typography
} from '@mui/material';

import StatusChip from './view/status-chip';
import OrderAction from './order-action';
import OrderCancel from './order-cancel';
import ActionToast from './action-toast';
import ItemsTable from './items-table';
import OrderStepper from './order-stepper';


const OrderDetails = ({ data, fetchOrder }) => {
  const [alertTitle, setAlertTitle] = useState(null);

  if (!data) {
    return null;
  }
  return (
    <>
      <ActionToast
        oid={data.oid}
        title={alertTitle}
        setTitle={setAlertTitle}
        fetchOrder={fetchOrder}
      />
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <Stack
            direction='row'
            spacing={1}
          >
            <Typography
              sx={{ fontWeight: 'bold' }}
            >
              Order No:
            </Typography>
            <Typography>
              {data.id}
            </Typography>
          </Stack>
          <Stack
            direction='row'
            spacing={1}
          >
            <Typography
              sx={{ fontWeight: 'bold' }}
            >
              Order ID:
            </Typography>
            <Typography
              color="text.secondary"
            >
              {data.oid}
            </Typography>
          </Stack>
          <Stack
            direction='row'
            spacing={1}
          >
            <Typography
              sx={{ fontWeight: 'bold' }}
            >
              Placed At:
            </Typography>
            <Typography
              color="text.secondary"
            >
              {
                dateFormat(data.added_at, 'h:MM TT, d/mm/yyyy')
              }
            </Typography>
          </Stack>
          <Stack
            direction='row'
            spacing={1}
          >
            <Typography
              sx={{ fontWeight: 'bold' }}
            >
              Status:
            </Typography>
            <StatusChip
              status={data.status}
            />
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Stack
            alignItems="flex-end"
            spacing={1}
          >
            <OrderAction
              status={data.status}
              oid={data.oid}
              fetchOrder={fetchOrder}
              setAlertTitle={setAlertTitle}
            />
            <OrderCancel
              status={data.status}
              oid={data.oid}
              fetchOrder={fetchOrder}
              setAlertTitle={setAlertTitle}
            />
          </Stack>
        </Grid>
      </Grid>
      <Box
        sx={{ py: 3 }}
      >
        <OrderStepper
          status={data.status}
        />
      </Box>
      <ItemsTable
        cart={data.cart}
      />
    </>
  )
}

export default OrderDetails;

OrderDetails.propTypes = {
  data: PropTypes.any,
  fetchOrder: PropTypes.any,
}