import { useState } from "react";
import propTypes from 'prop-types';
import { Modal, Empty } from "antd";

import { grabit_endpoints } from 'src/utils/data';

import { useGet } from 'src/hooks/useApi';

import { Box, List, Stack, Button, Divider, ListItem, TextField, ListItemText, ListItemButton } from "@mui/material";

function isObject(variable) {
    return variable !== null && typeof variable === 'object' && !Array.isArray(variable);
}

const getImageBlobs = async urls => {
    let img_promise = Promise.all(
        urls.map((url, idx) => {
            return fetch(`${grabit_endpoints.fetch_img}?url=${url}`)
                .then(res => res.blob())
                .then(imgblob => {
                    const file = new File([imgblob], `downloaded_image_${idx+1}.jpg`, {
                        type: imgblob.type,
                        lastModified: Date.now()
                    })
                    return file;
                })
                .catch(err => console.log(err))
        })
    )
    let img_arr = await img_promise;
    return img_arr;
}

const getKFTableData = (data) => {
    let tbl_array = [];
    if (Array.isArray(data)) {
        tbl_array = data.map(d => ({
            title: d,
            value: '',
        }))
    } else if (isObject(data)) {
        tbl_array = Object.keys(data).map(key => ({
            title: key,
            value: data[key],
        }))
    }
    return tbl_array
}

const insertValues = async (setState, setImages, prevValues, newData) => {
    const images = await getImageBlobs(newData.images);
    setImages(images);
    setState({
        ...prevValues,
        title: newData.title,
        price: newData.prices.original,
        discount: newData.prices.original - newData.prices.current,
        details: newData.description,
        key_features: getKFTableData(newData.key_features)
    })
}

function GrabitModal({ open, setOpen, values, setInitialValues, setImages }) {
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
                            onClick={() => insertValues(setInitialValues, setImages, values, productData)}
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
    setImages: propTypes.any,
    values: propTypes.any,
}