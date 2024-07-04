import { useState } from "react";
import propTypes from 'prop-types'
import { Modal, message } from "antd";

import { Alert, Stack, Button, TextField } from "@mui/material";

import { useGet } from "src/hooks/useApi";

// import { slugify } from 'src/utils/slugify';
import { grabit_endpoints } from "src/utils/data";



function AddGrabITModal({ open, setOpen, push }) {
    const [query, setQuery] = useState('');
    const [inserting, setInserting] = useState(false);
    const { data, loading, success, error, perform_get, reset } = useGet(grabit_endpoints.get_product);
    const handleSearch = () => {
        perform_get({ q: query })
    }
    const push_tables = () => {
        setInserting(true);
        setTimeout(() => {
            const spec_tables = data?.spec_tables;
            if (spec_tables) {
                Object.keys(spec_tables).map(key => (
                    push(
                        {
                            id: null,
                            title: key,
                            specs: Object.keys(spec_tables[key]).map(spec_title => (
                                {
                                    id: null,
                                    title: spec_title,
                                    aliases: ''
                                }
                            ))
                        }
                    )
                ))
            }
            setInserting(false);
            setOpen(false);
            message.success(`${Object.keys(spec_tables).length} table inserted`);
            reset();
        }, [10])

    }
    return (
        <Modal
            open={open}
            onCancel={() => setOpen(false)}
            title="Add from GrabIT"
            footer={null}
        >
            {/* <Typography>Add Subcategory</Typography> */}
            <Stack
                spacing={1.4}
                sx={{ mt: 2 }}
            >
                <TextField
                    label="Product Link or GrabIT ID"
                    name="link"
                    onChange={e => setQuery(e.target.value)}
                    fullWidth
                />
                {
                    success && data ?
                        <Alert
                            severity='success'
                        >
                            Product Found for query: {query}
                        </Alert> : null
                }
                {
                    error ?
                        <Alert
                            severity='error'
                        >
                            Error: {error?.detail || JSON.stringify(error)}
                        </Alert> : null
                }
                <Stack
                    direction='row'
                    justifyContent='flex-end'
                    spacing={2}
                >
                    {
                        data ?
                            <Button
                                disabled={inserting}
                                variant='contained'
                                color='success'
                                onClick={push_tables}
                            >
                                {inserting ? 'Inserting...' : 'Insert'}
                            </Button> : null
                    }
                    <Button
                        disabled={query.length === 0 || loading}
                        variant='contained'
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    )
}

export default AddGrabITModal;

AddGrabITModal.propTypes = {
    open: propTypes.bool,
    setOpen: propTypes.any,
    push: propTypes.any,
    // parent: propTypes.any,
    // parentType: propTypes.any,
    // refetchPage: propTypes.any,
}