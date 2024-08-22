/* eslint-disable */

import 'swiper/css';
import { Empty } from 'antd';
import { FieldArray } from 'formik';
import 'swiper/css/pagination';
import propTypes from 'prop-types';
import { Thumbs, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RiDeleteBin2Line } from '@remixicon/react'

import { styled } from '@mui/material/styles';
import { Box, Stack, Button, Typography } from "@mui/material";

import SlideImage from './slide-img';

import 'src/styles/addproduct.css'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


function ProductImages({ images, setImages, prevImages = [], removePrev }) {
    const hasPrev = prevImages?.length;
    const imageUrls = [];
    for (let i = 0; i < images.length; i += 1) {
        imageUrls.push(URL.createObjectURL(images[i]));
    }

    const handleChange = e => {
        const fa = Array.from(e.target.files);
        setImages(prevState => [...prevState, ...fa]);
    }

    const handleRemove = idx => {
        setImages(prevState => prevState.filter((_, index) => index !== idx));
    }

    return (
        <Box>
            {
                imageUrls.length || hasPrev ?
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={3}
                        freeMode
                        pagination={{
                            clickable: false,

                        }}
                        modules={[FreeMode, Thumbs]}
                        className="mySwiper"
                    >
                        {
                            prevImages.map((img_data, idx) => (
                                <SwiperSlide key={idx}>
                                    <SlideImage
                                        url={img_data.url}
                                        handleRemove={() => removePrev(idx)}
                                    />
                                </SwiperSlide>
                            ))
                        }
                        {
                            imageUrls.map((i, idx) => (
                                <SwiperSlide key={idx}>
                                    <SlideImage 
                                        url={i}
                                        handleRemove={() => handleRemove(idx)}
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper> :
                    <Empty
                        description={null}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
            }
            {
                hasPrev ? 
                <Typography color='text.secondary' variant='caption'>
                    {prevImages.length} Previous Images at first
                </Typography> : null
            }
            <Stack
                sx={{ mt: 2 }}
                direction='row'
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    size='small'
                >
                    Select files
                    <VisuallyHiddenInput onChange={handleChange} type="file" multiple />
                </Button>
                <Typography
                    variant='body2'
                >
                    {imageUrls.length || 'No'} {hasPrev ? 'New' : null} {imageUrls.length === 1 ? 'File' : 'Files'} Selected
                </Typography>
            </Stack>
        </Box>
    )
}

export default ProductImages;

ProductImages.propTypes = {
    images: propTypes.array,
    setImages: propTypes.any,
    prevImages: propTypes.array,
    removePrev: propTypes.any,
}