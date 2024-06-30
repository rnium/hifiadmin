import { Modal } from "antd";
import propTypes from 'prop-types'

import { Stack, Button, TextField, Typography } from "@mui/material";

function AddCatModal({ open, setOpen }) {
    return (
        <Modal
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Typography>Add Subcategory</Typography>
            <Stack
                alignItems="flex-end"
                spacing={1}
                sx={{ mt: 1 }}
            >
                <TextField
                    label="Sub Category Name"
                    variant='filled'
                    fullWidth
                />
                <Button variant='contained'>Add</Button>
            </Stack>
        </Modal>
    )
}

export default AddCatModal;

AddCatModal.propTypes = {
    open: propTypes.bool,
    setOpen: propTypes.any,
}