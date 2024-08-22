import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import EditProductMain from "src/sections/edit_product/view/main-view";



function EditProductPage() {
  const params = useParams();
  return (
    <>
      <Helmet>
        <title>Modify Product</title>
      </Helmet>
      <EditProductMain slug={params.slug} />
    </>
  )
}

export default EditProductPage;