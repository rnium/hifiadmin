import propTypes from 'prop-types';
import { Modal, Empty } from "antd";
import { useState } from "react";
import { grabit_endpoints } from 'src/utils/data';

import { useGet } from 'src/hooks/useApi';

import { Box, List, Button, Divider, ListItem, TextField, ListItemText, ListItemButton, Stack } from "@mui/material";

const insertTitle = (title, setter) => {
    console.log('setting title');
    setter('title', title)
}

const insertValues = (setter, prevValues, newData) => {
    setter({
        ...prevValues,
        title: 'Foobar'
    })
}

function GrabitModal({ open, setOpen, values, setInitialValues }) {
    const [searchQ, setSearchQ] = useState('');
    const [selectedProdID, setSelectedProdID] = useState(0);
    // const [searchRes, setSearchRes] = useState([]);
    const { data: searchRes, loading, perform_get: getSearchResults } = useGet(grabit_endpoints.search_product, false, []);
    const {
        data: productData,
        loading: prodDataLoading,
        loaded: prodDataLoaded,
        perform_get: grabProdData
    } = useGet(grabit_endpoints.get_product, false);

    return (
        <Modal
            title='GrabIT Search'
            footer={null}
            open={open}
            onCancel={() => { setOpen(false) }}
        >
            <Box sx={{ mt: 2 }}>
                <Stack
                    direction='row'
                    spacing={1}
                >
                    <TextField
                        fullWidth
                        label="Product Title"
                        onChange={e => setSearchQ(e.target.value.toLowerCase())}
                    />
                    <Button
                        variant='contained'
                        disabled={loading || searchQ.length < 2}
                        onClick={() => getSearchResults({ query: searchQ })}
                    >
                        Search
                    </Button>
                </Stack>
                <Box
                    sx={{ mt: 2 }}
                >
                    {
                        searchRes.length === 0 ?
                            <Empty /> :
                            <List
                                dense
                                sx={{ width: '100%', bgcolor: 'background.paper' }}
                            >
                                {
                                    searchRes.slice(0, 5).map((prod, idx) => (
                                        <div key={idx}>
                                            <ListItem>
                                                <ListItemButton
                                                    sx={{ width: '100%', borderRadius: 1 }}
                                                    onClick={() => setSelectedProdID(prod.id)}
                                                    selected={selectedProdID === prod.id}
                                                >
                                                    <ListItemText>{prod.title}</ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider variant="middle" component="li" />
                                        </div>
                                    ))
                                }
                            </List>
                    }
                    {
                        searchRes.length > 0 ?
                            <Button
                                fullWidth
                                variant='contained'
                                disabled={selectedProdID === 0}
                                // color='success'
                                onClick={() => grabProdData({ query: selectedProdID })}
                            >
                                Grab Data
                            </Button> : null
                    }
                </Box>
                {
                    productData ?
                        <Box
                            component='pre'
                            sx={{
                                padding: 2,
                                backgroundColor: '#f5f5f5',
                                borderRadius: 1,
                                overflow: 'auto',
                                maxHeight: '400px',
                            }}
                        >
                            {JSON.stringify(productData, null, 2)}
                        </Box> : null
                }
                {
                    productData ?
                        <Button
                            fullWidth
                            variant='contained'
                            disabled={selectedProdID === 0}
                            color='success'
                            onClick={() => insertValues(setInitialValues, values, productData)}
                        >
                            Insert Data
                        </Button> : null
                }
            </Box>
        </Modal>
    )
}

export default GrabitModal;

GrabitModal.propTypes = {
    open: propTypes.bool,
    setOpen: propTypes.any,
    setInitialValues: propTypes.any,
    values: propTypes.any,
}