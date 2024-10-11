import { Popconfirm } from "antd";
import PropTypes from "prop-types";
import { RiCloseLine } from "@remixicon/react";

import { Button } from "@mui/material";

const OrderCancel = ({ status }) => {
    if (status === 'cancelled' || status === 'delivered') {
        return null;
    }
    return (
        <Popconfirm
            title="Cancel Order"
            description="Are you sure to cancel this order?"
            onConfirm={() => console.log('confirmed')}
            placement="bottomLeft"
        >
            <Button
                variant='outlined'
                color='error'
                startIcon={<RiCloseLine />}
            >
                Cancel Order
            </Button>
        </Popconfirm>
    )
}

export default OrderCancel;


OrderCancel.propTypes = {
    status: PropTypes.any
}