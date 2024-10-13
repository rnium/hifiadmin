import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, LinearProgress } from '@mui/material';

import { useGet } from "src/hooks/useApi";

import { api_endpoints } from "src/utils/data";

import OrderDetails from '../order-details';


function ViewOrder({ oid }) {
    const { data, perform_get, loading, loaded } = useGet(`${api_endpoints.orders}${oid}/`)

    useEffect(() => {
        if (!loaded) {
            perform_get();
        }
    }, [loading, loaded, perform_get])
    return (
        <Container>
            {
                !loaded ?
                    <div style={{ maxWidth: '300px' }}>
                        <LinearProgress />
                    </div>
                    :
                    <OrderDetails
                        data={data}
                        fetchOrder={perform_get}
                    />

            }
        </Container>
    )
}

export default ViewOrder;

ViewOrder.propTypes = {
    oid: PropTypes.any
}