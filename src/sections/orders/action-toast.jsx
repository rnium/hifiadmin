import { message } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { RiArrowGoBackFill } from '@remixicon/react';

import { Button, Snackbar } from '@mui/material';

import { usePost } from "src/hooks/useApi";

import { api_endpoints, endpoint_suffixes } from "src/utils/data";

const ActionToast = ({oid, title, setTitle, fetchOrder }) => {
    const { perform_post, success, error, loading } = usePost(
        `${api_endpoints.orders}${oid}${endpoint_suffixes.alter_status_undo}`
    )

    const handleClose = useCallback(() => {
        setTitle(null);
    }, [setTitle])

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setTitle(null);
        }, 10000)
        return () => {
            clearTimeout(timeOutId);
        }
    }, [title, setTitle])

    useEffect(() => {
        if (success) {
            fetchOrder();
            handleClose();
        }
        if (error) {
            message.error("Cannot Undo Action!")
        }
    }, [success, error, fetchOrder, handleClose])

    return (
        <Snackbar
            open={Boolean(title)}
            autoHideDuration={10000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            message={title}
            action={
                <Button
                    color='warning'
                    endIcon={<RiArrowGoBackFill />}
                    onClick={() => perform_post()}
                    disabled={loading}
                    size="small"
                >
                    Undo
                </Button>
            }
        />
    )
}

export default ActionToast;

ActionToast.propTypes = {
    oid: PropTypes.any,
    title: PropTypes.any,
    setTitle: PropTypes.any,
    fetchOrder: PropTypes.any,
}