/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';

import dateFormat from 'dateformat';

import {
  Box, Chip, Grid, Stack, Divider, Typography
} from '@mui/material';

import { RiMapPin2Fill, RiPinDistanceFill } from '@remixicon/react';

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
      {/* <Divider
        sx={{ my: 2 }}
      /> */}
      <Grid
        container
        spacing={2}
        sx={{ mt: 1 }}
      >
        <Grid item xs={12} md={6}>
          <Stack
            direction='row'
            spacing={1}
          >
            <Typography
              sx={{ fontWeight: 'bold' }}
            >
              Customer Name:
            </Typography>
            <Typography>
              {data.first_name} {data.last_name}
            </Typography>
          </Stack>
          <Stack
            direction='row'
            spacing={1}
          >
            <Typography
              sx={{ fontWeight: 'bold' }}
            >
              Phone:
            </Typography>
            <Typography>
              {data.phone}
            </Typography>
          </Stack>
          <Stack
            direction='row'
            spacing={1}
          >
            <Typography
              sx={{ fontWeight: 'bold' }}
            >
              Email:
            </Typography>
            <Typography>
              {data.email}
            </Typography>
          </Stack>
          <Stack
            direction='row'
            spacing={1}
          >
            <Typography
              sx={{ fontWeight: 'bold' }}
            >
              Shipping Address:
            </Typography>
            <Typography
              color="primary"
            >
              {data.address}
            </Typography>
          </Stack>
          {
            data.location === 'inside' ?
              <Chip
                sx={{ px: 2, mt: 1 }}
                icon={<RiMapPin2Fill size={20} />}
                label="Inside Sylhet"
              />
              :
              <Chip
                variant='outlined'
                sx={{ px: 2, mt: 1 }}
                icon={<RiPinDistanceFill size={20} />}
                label="Outside"
              />
          }


        </Grid>
        <Grid item xs={12} md={6}>
          <table>
            <tbody>
              <tr>
                <td>
                  <Typography
                    sx={{ fontWeight: 'bold' }}
                  >
                    Sub Total:
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.cart.total_amount}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography
                    sx={{ fontWeight: 'bold' }}
                  >
                    Total Items:
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.cart.total_items}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography
                    sx={{ fontWeight: 'bold' }}
                  >
                    Shipping Charge:
                  </Typography>
                </td>
                <td>
                  <Typography>
                    {data.cart.shipping_charge}
                  </Typography>
                </td>
              </tr>
              {
                data.cart.coupon_discount ? (
                  <tr>
                    <td>
                      <Typography
                        sx={{ fontWeight: 'bold' }}
                      >
                        Coupon Discount:
                      </Typography>
                    </td>
                    <td>
                      <Typography>
                        - {data.cart.coupon_discount}
                      </Typography>
                    </td>
                  </tr>
                ) : null
              }
              <tr
                style={{
                  border: '1px solid',
                }}
              >
                <td>
                  <Typography
                    sx={{ fontWeight: 'bold', mr: 3 }}
                    variant='h6'
                    color="text.secondary"
                  >
                    Total Payable:
                  </Typography>
                </td>
                <td>
                  <Typography
                    variant='h6'
                    color="primary"
                  >
                    {data.payable.toLocaleString('en-in')}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>


        </Grid>
      </Grid>
    </>
  )
}

export default OrderDetails;

OrderDetails.propTypes = {
  data: PropTypes.any,
  fetchOrder: PropTypes.any,
}