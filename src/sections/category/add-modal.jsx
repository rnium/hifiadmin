import propTypes from 'prop-types'
import { Modal, message } from "antd";
import { useState, useEffect } from "react";

import { Stack, Button, Select, MenuItem, TextField, InputLabel, Typography, FormControl } from "@mui/material";

import { usePost } from "src/hooks/useApi";

import { slugify } from 'src/utils/slugify';
import { api_endpoints } from "src/utils/data";

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

function AddCatModal({ open, setOpen, parent, parentType, refetchPage }) {
    const [formData, setFormData] = useState({
        title: '',
        parent,
        cat_type: 'general'
    });

    // const afterPostComplete

    const { loading, success, setSuccess, error, setError, perform_post } = usePost(api_endpoints.categories);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = () => {
        formData.slug = slugify(formData.title);
        perform_post(formData);
    }
    useEffect(() => {
        if (error) {
            message.error('Error');
            setError(null);
        }
        if (success) {
            refetchPage();
            setOpen(false);
            setSuccess(false);
        }
    }, [error, setError, success, setSuccess, refetchPage, setOpen])
    
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
                {
                    parentType !== 'tag' ?
                        <FormControl fullWidth >
                            <InputLabel id="type-label">Category Type</InputLabel>
                            <Select
                                labelId="type-label"
                                id="type"
                                name="cat_type"
                                value={formData.cat_type}
                                label="Category Type"
                                onChange={handleChange}
                            >
                                {
                                    parentType === 'feature' ?
                                        <MenuItem value='tag' /> :
                                        cat_types.map((ct, idx) => (
                                            <MenuItem
                                                key={idx}
                                                value={ct.code}
                                            >
                                                {ct.title}
                                            </MenuItem>
                                        ))
                                }
                            </Select>
                        </FormControl>
                        : null
                }
                <Button
                    disabled={formData.title.length === 0 || loading}
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
    parent: propTypes.any,
    parentType: propTypes.any,
    refetchPage: propTypes.any,
}