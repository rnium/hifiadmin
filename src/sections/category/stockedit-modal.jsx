import { Modal, Switch } from "antd";
import { useState, useEffect } from "react";

import { Stack, Typography } from "@mui/material";

import { usePost } from "src/hooks/useApi";
import { useStockEdit } from "src/hooks/useStockEdit";

import { api_endpoints, endpoint_suffixes } from "src/utils/data";


const StockEditModal = () => {
    const { productInfo, clear, setRefetchNow } = useStockEdit();
    const {perform_post, setUrl, loading} = usePost(null, true);
    const [inStock, setInStock] = useState(false);

    useEffect(() => {
        if (productInfo) {
            setUrl(`${api_endpoints.product}${productInfo?.id}${endpoint_suffixes.alter_stock}`);
            setInStock(productInfo.in_stock);
        }
    }, [productInfo, setUrl, setInStock])


    const handleSwitchClick = () => {
        const new_status = !inStock;
        setInStock(new_status);

        setTimeout(() => {
            perform_post({in_stock: new_status});
        }, 50)
    }

    const handleClose = () => {
        clear();
        if (productInfo && (productInfo.in_stock !== inStock)) {
            setRefetchNow();
        }
    }

    return (
        <Modal
            open={Boolean(productInfo)}
            onCancel={handleClose}
            onClose={handleClose}
            title="Change Stock Status"
            footer={null}
        >
            <Stack
                alignItems='center'
                spacing={3}
                sx={{mb: 3, mt: 2}}
            >
                {
                    !productInfo ?
                        <Typography
                            variant="h6"
                        >
                            No Product Selected
                        </Typography>
                        :
                        <>
                            <Typography
                                variant="h6"
                            >
                                {productInfo?.title}
                            </Typography>
                            <Switch 
                                loading={loading}
                                checked={inStock}
                                onClick={handleSwitchClick}
                                checkedChildren={
                                    <Typography variant="caption">In Stock</Typography>
                                }
                                unCheckedChildren={
                                    <Typography variant="caption">Out Of Stock</Typography>
                                }
                            />
                        </>
                }

            </Stack>
        </Modal>
    )
}

export default StockEditModal