import { Modal } from "antd";
import { useState } from "react";
import propTypes from 'prop-types'

import { Stack, Button, Select, MenuItem, TextField, InputLabel, Typography, FormControl } from "@mui/material";

const cat_types = [
    {
        title: 'General Category',
        code: 'general'
    },
    {
        title: 'Brand Category',
        code: 'brand'
    },
    {
        title: 'Feature Category',
        code: 'feature'
    },
    {
        title: 'Tag Under Feature',
        code: 'tag'
    },
]

function AddCatModal({ open, setOpen, parentType }) {
    const [formData, setFormData] = useState({
        title: '',
        type: 'general'
    });
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = () => {
        console.log(formData);
    }
    // const 
    return (
        <Modal
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
        >
            <Typography>Add Subcategory</Typography>
            <Stack
                alignItems="flex-end"
                spacing={1.4}
                sx={{ mt: 2 }}
            >
                <TextField
                    label="Sub Category Name"
                    name="title"
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl fullWidth >
                    <InputLabel id="type-label">Category Type</InputLabel>
                    <Select
                        labelId="type-label"
                        id="type"
                        name="type"
                        value={formData.type}
                        label="Category Type"
                        onChange={handleChange}
                    >
                        {
                            cat_types.map((ct, idx) => (
                                <MenuItem
                                    value={ct.code}
                                >
                                    {ct.title}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Button
                    disabled={formData.title.length === 0}
                    variant='contained'
                    onClick={handleSubmit}
                >
                    Add
                </Button>
            </Stack>
        </Modal>
    )
}

export default AddCatModal;

AddCatModal.propTypes = {
    open: propTypes.bool,
    setOpen: propTypes.any,
    parentType: propTypes.any,
}