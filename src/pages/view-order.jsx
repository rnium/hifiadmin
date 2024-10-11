import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import ViewOrder from "src/sections/orders/view/view-order";



function ViewOrderPage() {
  const params = useParams();
  return (
    <>
      <Helmet>
        <title>View Order</title>
      </Helmet>
      <ViewOrder oid={params.oid} />
    </>
  )
}

export default ViewOrderPage;