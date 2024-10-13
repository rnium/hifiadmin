import { useEffect } from "react";
import PropTypes from "prop-types";
import { message, Popconfirm } from "antd";
import { RiCloseLine } from "@remixicon/react";

import { Button } from "@mui/material";

import { usePost } from "src/hooks/useApi";

import { api_endpoints, endpoint_suffixes } from "src/utils/data";


const OrderCancel = ({ oid, status, fetchOrder, setAlertTitle }) => {
    const { perform_post, success, data, error, loading } = usePost(
        `${api_endpoints.orders}${oid}${endpoint_suffixes.cancel}`
    )

    useEffect(() => {
        if (success && data) {
            setAlertTitle(data?.info || 'Order Cancelled');
            fetchOrder();
        }
        if (error) {
            message.error("An Error Occurred");
        }
    }, [success, data, error, fetchOrder, setAlertTitle])

    if (status === 'cancelled' || status === 'delivered') {
        return null;
    }

    return (
        <Popconfirm
            title="Cancel Order"
            description="Are you sure to cancel this order?"
            onConfirm={() => perform_post()}
            placement="bottomLeft"
        >
            <Button
                variant='outlined'
                color='error'
                disabled={loading}
                startIcon={<RiCloseLine />}
            >
                Cancel Order
            </Button>
        </Popconfirm>
    )
}

export default OrderCancel;


OrderCancel.propTypes = {
    oid: PropTypes.any,
    status: PropTypes.any,
    fetchOrder: PropTypes.any,
    setAlertTitle: PropTypes.any,
}