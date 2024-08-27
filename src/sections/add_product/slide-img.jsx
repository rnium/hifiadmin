import propTypes from 'prop-types';
import { RiDeleteBin2Line } from '@remixicon/react'

import { Box } from '@mui/material';

const SlideImage = ({ url, handleRemove, prev=false }) => (
    <Box
        className={prev ? "slide-img-container prev" : "slide-img-container"}
        sx={{
            position: 'relative',
            width: '100px',
        }}
    >
        <RiDeleteBin2Line
            onClick={handleRemove}
            className="del-btn"
            size={25}
        />
        <img
            width="100%"
            src={url}
            className='w-full'
            alt='Product'
        />
    </Box>
)

export default SlideImage;

SlideImage.propTypes = {
    url: propTypes.any,
    handleRemove: propTypes.any,
    prev: propTypes.bool,
}