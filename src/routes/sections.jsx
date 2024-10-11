import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import Loader from './components/loader';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const OrdersPage  = lazy(() => import('src/pages/orders'));
export const ViewOrderPage  = lazy(() => import('src/pages/view-order'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const AddProductPage = lazy(() => import('src/pages/add-product'));
export const EditProductPage = lazy(() => import('src/pages/edit-product'));
export const CategoryPage = lazy(() => import('src/pages/category'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'orders', element: <OrdersPage /> },
        { path: 'category/:slug', element: <CategoryPage /> },
        { path: 'category/:slug/addproduct', element: <AddProductPage /> },
        { path: 'product/edit/:slug', element: <EditProductPage /> },
        { path: 'orders/:oid', element: <ViewOrderPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
