import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import { AddProductView } from "src/sections/add_product/view";



function AddProductPage() {
  const params = useParams();
  return (
    <>
      <Helmet>
        <title>Add New Product</title>
      </Helmet>
      <AddProductView slug={params.slug} />
    </>
  )
}

export default AddProductPage;