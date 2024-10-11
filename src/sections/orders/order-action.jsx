import { message } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { RiCheckFill, RiTruckLine, RiCheckDoubleLine } from "@remixicon/react";

import { Button } from "@mui/material";

import { usePost } from "src/hooks/useApi";

import { api_endpoints, endpoint_suffixes } from "src/utils/data";

const nextStatusMapping = {
    pending: {
        status: 'processing',
        label: 'Confirm Order',
        color: 'primary',
        icon: <RiCheckFill />
    },
    processing: {
        status: 'shipped',
        label: 'Confirm Shipped',
        color: 'secondary',
        icon: <RiTruckLine />
    },
    shipped: {
        status: 'delivered',
        label: 'Confirm Delivered',
        color: 'success',
        icon: <RiCheckDoubleLine />
    },
}

const OrderAction = ({ status, oid, fetchOrder }) => {
    const { perform_post, success, error, loading } = usePost(
        `${api_endpoints.orders}${oid}${endpoint_suffixes.alter_status}`
    )
    const nextStatus = nextStatusMapping[status];

    const handleAction = () => {
        perform_post({
            newstatus: nextStatus.status
        })
    }

    useEffect(() => {
        if (success) {
            message.success('Order Updated');
            fetchOrder();
        }
        if (error) {
            message.error("An Error Occurred");
        }
    }, [success, error, fetchOrder])

    if (!nextStatus) {
        return null;
    }

    return (
        <Button
            color={nextStatus.color}
            startIcon={nextStatus.icon}
            variant="contained"
            disabled={loading}
            onClick={handleAction}
        >
            {nextStatus.label}
        </Button>
    )
}

export default OrderAction;


OrderAction.propTypes = {
    status: PropTypes.any,
    oid: PropTypes.any,
    fetchOrder: PropTypes.any,
}