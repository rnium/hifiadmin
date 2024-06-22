import React from 'react';
import PropTypes from 'prop-types'

import { Box, Card, Grid, Stack, Button, TextField, Typography } from '@mui/material';

function ConfigTable({ sx = {} }) {
    return (
        <Card sx={{ px: 3, py: 3, ...sx }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                
            >
                <Typography variant='h6' color="primary">
                    Table Title
                </Typography>
                <Button color='error' variant='contained'>Delete Table</Button>
            </Stack>
            <Box>
                <Grid  container spacing={2} alignItems='flex-end'>
                    <Grid item xs={4}>
                        <TextField
                            label="Property Title"
                            fullWidth
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            label="Property Value"
                            fullWidth
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant='outlined' color='warning' size='small'>Remove</Button>
                    </Grid>
                    
                </Grid>
                <Grid  container spacing={2} sx={{mt: 0.1}} alignItems='flex-end'>
                    <Grid item xs={4}>
                        <TextField
                            label="Property Title"
                            fullWidth
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            label="Property Value"
                            fullWidth
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant='outlined' color='warning' size='small'>Remove</Button>
                    </Grid>
                    
                </Grid>
                <Grid  container spacing={2} sx={{mt: 0.1}} alignItems='flex-end'>
                    <Grid item xs={4}>
                        <TextField
                            label="Property Title"
                            fullWidth
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            label="Property Value"
                            fullWidth
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant='outlined' color='warning' size='small'>Remove</Button>
                    </Grid>
                    
                </Grid>
                
            </Box>
        </Card>
    )
}

export default ConfigTable;

ConfigTable.propTypes = {
    sx: PropTypes.object
}