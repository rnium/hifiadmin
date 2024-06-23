import { Modal } from "antd";
import propTypes from 'prop-types';

import { Box, TextField } from "@mui/material";

function AddTagModal({open, setOpen}) {
    return (
        <Modal
            title='Add Product Tag'
            footer={null}
            open={open}
            onCancel={() => { setOpen(false) }}
        >
            <Box sx={{mt: 2}}>
                <TextField
                    label="Search Tags"
                    fullWidth
                />
            </Box>
        </Modal>
    )
}

export default AddTagModal;

AddTagModal.propTypes = {
    open: propTypes.bool,
    setOpen: propTypes.any,
}