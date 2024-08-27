import { Modal, Switch } from "antd";

import { Stack, Typography } from "@mui/material";

import { useStockEdit } from "src/hooks/useStockEdit";

const StockEditModal = () => {
    const { productInfo, clear } = useStockEdit();
    return (
        <Modal
            open={Boolean(productInfo)}
            onCancel={clear}
            onClose={clear}
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
                                loading={false}
                                defaultChecked={productInfo.in_stock}
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