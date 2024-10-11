/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd';

import dateFormat from 'dateformat';

import { RiCheckLine, RiCloseLine } from '@remixicon/react';

import {
  Grid, Stack, Button, Divider, Typography
} from '@mui/material';

import StatusChip from './view/status-chip';
import OrderAction from './order-action';
import OrderCancel from './order-cancel';

const OrderDetails = ({ data, fetchOrder }) => {
  if (!data) {
    return null;
  }
  return (
    <>
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
            />
            <OrderCancel 
              status={data.status}
            />
          </Stack>
        </Grid>
      </Grid>
      <Divider
        sx={{ my: 2 }}
      />
    </>
  )
}

export default OrderDetails;

OrderDetails.propTypes = {
  data: PropTypes.any,
  fetchOrder: PropTypes.any,
}