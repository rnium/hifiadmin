import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'orders',
    path: '/orders',
    icon: icon('ic_cart'),
  },
  {
    title: 'products',
    path: '/products',
    icon: icon('ic_products'),
  },
  {
    title: 'users',
    path: '/user',
    icon: icon('ic_user'),
  },
];

export default navConfig;
