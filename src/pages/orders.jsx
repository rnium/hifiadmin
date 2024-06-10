import { Helmet } from "react-helmet-async";

import { Orders } from "src/sections/orders/view";


export default function OrdersPage() {
    return (
        <>
            <Helmet>
                <title>Orders | Hifi Computer</title>
            </Helmet>
            <Orders />
        </>
    )
}

