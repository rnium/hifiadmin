import { useState, useRef } from "react";
import propTypes from 'prop-types';
import { Modal, Empty } from "antd";

import { grabit_endpoints } from 'src/utils/data';

import { useGet } from 'src/hooks/useApi';

import { slugify } from "src/utils/slugify";

import { Box, Chip, List, Stack, Button, Divider, ListItem, TextField, ListItemText, Typography, ListItemButton } from "@mui/material";

function isObject(variable) {
    return variable !== null && typeof variable === 'object' && !Array.isArray(variable);
}

const getImageBlobs = (urls, prod_title) => {
    const prod_title_slug = slugify(prod_title);
    return Promise.all(
        urls.map((url, idx) => (
            fetch(`${grabit_endpoints.fetch_img}?url=${url}`)
                .then(res => res.blob())
                .then(imgblob => {
                    const ext = url.split('.').pop().split('?')[0];
                    return new File([imgblob], `${prod_title_slug}_${idx + 1}.${ext}`, {
                        type: imgblob.type,
                        lastModified: Date.now()
                    })
                })
                .catch(err => console.log(err))
        ))
    )
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

// const getSpecValue ()

const getSpecTables = (prevTables, tableDataRaw, newData) => {
    const mainTableSpecs = [];
    const specValues = [];
    tableDataRaw.forEach(tbl_dat => {
        const table_specs = [];
        tbl_dat.specs.forEach(spec_dat => {
            table_specs.push({
                title: spec_dat.title,
                aliases: spec_dat.aliases
            })
        })
        mainTableSpecs.push(...table_specs);
    })
    Object.keys(newData.spec_tables).forEach(tbl_name => {
        const table_specs = [];
        Object.keys(newData.spec_tables[tbl_name]).forEach(spec_title => {
            table_specs.push({
                'title': spec_title,
                'value': newData.spec_tables[tbl_name][spec_title],
            })
        })
        specValues.push(...table_specs);
    })
    const getSpecVal = title => {
        const spec_config = mainTableSpecs.filter(spec => spec.title === title)[0];
        let spec_search = specValues.filter(spec => spec.title === spec_config.title);
        if (spec_search.length > 0) return spec_search[0].value;
        let value = null;
        spec_config.aliases.forEach(alias => {
            spec_search = specValues.filter(spec => spec.title === alias);
            if (spec_search.length > 0) {
                value = spec_search[0].value;
            }
        })
        return value;

    }
    const data = prevTables.map(tbl => ({
        ...tbl,
        specs: tbl.specs.map(spec => ({
            ...spec,
            value: getSpecVal(spec.title) || ''
        }))
    }))
    return data;
}

const insertValues = async (catData, setState, setImages, prevValues, newData) => {
    const images = await getImageBlobs(newData.images, newData.title);
    setImages(images);
    // console.log(newState);
    setState(prevState => (
        {
            ...prevState,
            title: newData.title,
            price: newData.prices.original,
            discount: newData.prices.original - newData.prices.current,
            details: newData.description,
            key_features: getKFTableData(newData.key_features),
            tables: getSpecTables(prevState.tables, catData?.tree_tables, newData)
        }
    ))
}

function GrabitModal({ open, setOpen, values, catData, setInitialValues, setImages }) {
    const [selectedProdID, setSelectedProdID] = useState(0);
    const searchBoxRef = useRef();
    const { data: searchRes, loading, perform_get: getSearchResults } = useGet(grabit_endpoints.search_product, false, []);
    const {
        data: productData,
        loading: prodDataLoading,
        loaded: prodDataLoaded,
        perform_get: grabProdData
    } = useGet(grabit_endpoints.get_product, false);

    const performSearch = () => getSearchResults({ query: searchBoxRef.current.value });

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
                        inputRef={searchBoxRef}
                        onKeyUp={e => {
                            if (e.key === 'Enter') performSearch();
                        }}
                    />
                    <Button
                        variant='contained'
                        disabled={loading}
                        onClick={() => performSearch()}
                    >
                        Search
                    </Button>
                </Stack>
                <Box
                    sx={{ mt: 1 }}
                >
                    <Typography
                        color="text.secondary"
                        textAlign='center'
                        variant='caption'
                    >
                        {searchRes.length} Search Results
                    </Typography>
                    {
                        searchRes.length === 0 ?
                            <Empty /> :
                            <Box
                                sx={{
                                    maxHeight: '400px',
                                    overflowY: 'auto'
                                }}
                            >
                                <List
                                    dense
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                                >
                                    {
                                        searchRes.map((prod, idx) => (
                                            <div key={idx}>
                                                <ListItem>
                                                    <ListItemButton
                                                        sx={{ width: '100%', borderRadius: 1 }}
                                                        onClick={() => setSelectedProdID(prod.id)}
                                                        selected={selectedProdID === prod.id}
                                                    >

                                                        <ListItemText>{prod.title}</ListItemText>
                                                        <Chip label={prod.site} />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider variant="middle" component="li" />
                                            </div>
                                        ))
                                    }
                                </List>
                            </Box>
                    }
                    {
                        searchRes.length > 0 ?
                            <Button
                                fullWidth
                                variant='contained'
                                disabled={selectedProdID === 0}
                                // color='success'
                                sx={{ mt: 1 }}
                                onClick={() => grabProdData({ query: selectedProdID })}
                            >
                                Grab Data
                            </Button> : null
                    }
                </Box>
                {
                    productData ?
                        <>
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
                            </Box>
                            <Button
                                fullWidth
                                variant='contained'
                                color='success'
                                onClick={() => insertValues(catData, setInitialValues, setImages, values, productData)}
                            >
                                Insert Data
                            </Button>
                        </>
                        : null
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
    catData: propTypes.any,
}