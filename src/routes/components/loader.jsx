import { Spin } from 'antd';

import { Stack, Container, Typography } from '@mui/material';

const Loader = () => (
        <Container>
            <Stack
                alignItems='center'
                spacing={2}
            >
                <Spin size='large' />
                <Typography>Loading Page</Typography>
            </Stack>
        </Container>
    )


export default Loader