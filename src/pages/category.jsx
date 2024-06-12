import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CategoryPage } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const params = useParams();
  return (
    <>
      <Helmet>
        <title> {params.slug} | HiFi Computer </title>
      </Helmet>

      <CategoryPage slug={params.slug} />
    </>
  );
}
