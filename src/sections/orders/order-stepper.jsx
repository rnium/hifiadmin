import React from 'react';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import { RiTruckLine, RiLoopLeftLine, RiUserSmileLine, RiHourglass2Line } from '@remixicon/react';

const orderStatuses = [
    {
        title: 'Pending',
        icon: <RiHourglass2Line />
    },
    {
        title: 'Processing',
        icon: <RiLoopLeftLine />
    },
    {
        title: 'Shipped',
        icon: <RiTruckLine />
    },
    {
        title: 'Delivered',
        icon: <RiUserSmileLine />
    },
]

const status_codes = orderStatuses.map(s => s.title.toLowerCase());


const OrderStepper = ({ status }) => {
    if (status === 'cancelled') {
        return null;
    }
    const currIdx = status_codes.indexOf(status);

    return (
        <Steps
            current={currIdx}
            items={orderStatuses}
        />
    )
}

export default OrderStepper;

OrderStepper.propTypes = {
    status: PropTypes.any
}