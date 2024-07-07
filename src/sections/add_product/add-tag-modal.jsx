import propTypes from 'prop-types';
import { Modal, Empty } from "antd";
import { useState, useEffect } from "react";

import { Box, List, Divider, ListItem, TextField, ListItemText, ListItemButton } from "@mui/material";

function AddTagModal({ open, setOpen, all_tags, added_tags, push, remove }) {
    const [searchQ, setSearchQ] = useState('');
    const [searchRes, setSearchRes] = useState([]);

    useEffect(() => {
        setSearchRes(all_tags.filter(tag => searchQ.length > 0 && tag.title.toLowerCase().includes(searchQ)));
    }, [searchQ, all_tags])

    const handleBtnClick = (e, id) => {
        if (added_tags.includes(id)) {
            remove(added_tags.indexOf(id));
        } else {
            push(id);
        }
    }

    return (
        <Modal
            title='Add Product Tag'
            footer={null}
            open={open}
            onCancel={() => { setOpen(false) }}
        >
            <Box sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Search Tags"
                    onChange={e => setSearchQ(e.target.value.toLowerCase())}
                />
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
                                    searchRes.map((s_tag, idx) => (
                                        <div key={idx}>
                                            <ListItem>
                                                <ListItemButton
                                                    sx={{ width: '100%', borderRadius: 1 }}
                                                    onClick={(e) => handleBtnClick(e, s_tag.id)}
                                                    selected={added_tags.includes(s_tag.id)}
                                                >
                                                    <ListItemText>{s_tag.title}</ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider variant="middle" component="li" />
                                        </div>
                                    ))
                                }
                            </List>
                    }
                </Box>
            </Box>
        </Modal>
    )
}

export default AddTagModal;

AddTagModal.propTypes = {
    open: propTypes.bool,
    setOpen: propTypes.any,
    all_tags: propTypes.any,
    added_tags: propTypes.any,
    push: propTypes.func,
    remove: propTypes.func,
}