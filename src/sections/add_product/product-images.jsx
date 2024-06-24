import 'swiper/css';
import 'swiper/css/pagination';
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



function ProductImages({ image_urls }) {
    const handleFileChage = e => {
        console.log(e.target.files);
    }
    return (
        <Box>
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
                    image_urls.map((i, idx) => (
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
            </Swiper>
            <Stack
            sx={{mt: 2}}
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
                    {image_urls.length || 'No'} {image_urls.length > 1 ? 'Files' : 'File'} Selected
                </Typography>
            </Stack>
        </Box>
    )
}

export default ProductImages;

ProductImages.propTypes = {
    image_urls: propTypes.array,
}