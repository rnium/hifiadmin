import 'swiper/css';
import { Empty } from 'antd';
import 'swiper/css/pagination';
import { useState } from 'react';
import propTypes from 'prop-types';
import { Thumbs, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { styled } from '@mui/material/styles';
import { Box, Stack, Button, Typography } from "@mui/material";

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



function ProductImages({ images, push, remove }) {
    const [imageUrls, setImageUrls] = useState([]);
    const handleFileChage = e => {
        for (let i = 0; i < images.length; i += 1) {
            remove(i);
        }
        const newImages = e.target.files;
        const newImgUrls = [];
        for (let i = 0; i < newImages.length; i += 1) {
            push(newImages[i]);
            newImgUrls.push(URL.createObjectURL(newImages[i]));
        }
        setImageUrls(newImgUrls);

    }
    return (
        <Box>
            {
                imageUrls.length > 0 ?
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={5}
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
                                    <Box>
                                        <img
                                            width="100px"
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
                    <VisuallyHiddenInput onChange={handleFileChage} type="file" multiple />
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
    push: propTypes.any,
    remove: propTypes.any,
}