import { Spin } from 'antd';
import PropTypes from 'prop-types';

import { Stack, Container, Typography } from '@mui/material';

const Loader = ({title = 'Loading Page'}) => (
        <Container>
            <Stack
                alignItems='center'
                spacing={2}
            >
                <Spin size='large' />
                <Typography sx={{textAlign: 'center'}}>{title}</Typography>
            </Stack>
        </Container>
    )


export default Loader

Loader.propTypes = {
    title: PropTypes.string
}