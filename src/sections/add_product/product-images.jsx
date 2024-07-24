import 'swiper/css';
import { Empty } from 'antd';
import 'swiper/css/pagination';
import propTypes from 'prop-types';
import { Thumbs, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RiDeleteBin2Line } from '@remixicon/react'

import { styled } from '@mui/material/styles';
import { Box, Stack, Button, Typography } from "@mui/material";

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


function ProductImages({ images, setImages }) {
    const imageUrls = [];
    for (let i = 0; i < images.length; i += 1) {
        imageUrls.push(URL.createObjectURL(images[i]));
    }

    const handleChange = e => {
        const fa = Array.from(e.target.files);
        setImages(fa);
    }

    return (
        <Box>
            {
                imageUrls.length > 0 ?
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
                            imageUrls.map((i, idx) => (
                                <SwiperSlide key={idx}>
                                    <Box
                                        className="slide-img-container"
                                        sx={{ 
                                            position: 'relative',
                                            width: '100px'
                                        }}
                                    >
                                        <RiDeleteBin2Line
                                            onClick={() => {console.log('ghi');}}
                                            className="del-btn"
                                            size={25}
                                        />
                                        <img
                                            width="100%"
                                            src={i}
                                            className='w-full'
                                            alt='Product'
                                        />
                                    </Box>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper> :
                    <Empty
                        description={null}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
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
                    {imageUrls.length || 'No'} {imageUrls.length === 1 ? 'File' : 'Files'} Selected
                </Typography>
            </Stack>
        </Box>
    )
}

export default ProductImages;

ProductImages.propTypes = {
    images: propTypes.array,
    setImages: propTypes.any,
}