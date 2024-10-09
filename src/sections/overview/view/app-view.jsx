// import { faker } from '@faker-js/faker';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useGet } from 'src/hooks/useApi';
import { useUser } from 'src/hooks/useUser';

import { api_endpoints as api } from 'src/utils/data';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
import Loader from 'src/routes/components/loader';

import OrdersTable from 'src/sections/orders/view/order-table';

import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const { data, loaded: cat_loaded, loading, perform_get } = useGet(api.categories);
  const { data: orders_data, loaded: orders_loaded, loading: ordersLoading, perform_get: get_orders } = useGet(api.orders);
  const { data: stats, loaded: stats_loaded, perform_get: load_stats } = useGet(api.dashboard_stats, true);
  const { userInfo } = useUser();

  useEffect(() => {
    if (!cat_loaded) {
      perform_get();
    }
    if (!stats_loaded) {
      load_stats();
    }
    if (!orders_loaded) {
      get_orders();
    }
  }, [
    cat_loaded,
    perform_get,
    stats_loaded,
    load_stats,
    orders_loaded,
    get_orders
  ])

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {userInfo.first_name}, Welcome back
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Products"
            total={stats?.num_products || '0'}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Running Orders"
            total={stats?.num_orders || '0'}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Users"
            total={stats?.num_users || '0'}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Messages"
            total={stats?.num_messages || '0'}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>



        {/* <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}
      </Grid>
      <Typography variant="body1" sx={{ mt: 3, mb: 1 }}>
        Main Categories
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {
          !cat_loaded || loading ?
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2
              }}
            >
              <Spin />
            </Box> :
            null
        }
        {
          !data ? null :
            data.map((d, idx) => (
              <Link key={idx} to={`/category/${d.slug}`}>
                <Button
                  variant='contained'
                  key={idx}
                >
                  {d.title}
                </Button>
              </Link>
            ))
        }
      </Box>
      <Box
        sx={{ mt: 3 }}
      >
        <Paper
          elevation={1}
        >
          <Typography
            sx={{
              py: 1,
              px: 2
            }}
            color="text.secondary"
          >
            # Recent Orders
          </Typography>
          {
            ordersLoading ?
              <Loader
                title=''
              />
              :
              <OrdersTable
                data={orders_data}
              />
          }
        </Paper>
      </Box>

    </Container>
  );
}
