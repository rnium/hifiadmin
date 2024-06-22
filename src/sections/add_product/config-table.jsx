import PropTypes from 'prop-types'
import { FieldArray } from 'formik';

import { Box, Card, Grid, Stack, Button, TextField, Typography } from '@mui/material';

function ConfigTable(
    {
        sx = {}, 
        tableData, 
        tableIndex, 
        handleRemove,
        touched,
        errors,
        handleChange,
    }
) 

{
    return (
        <Card sx={{ px: 3, py: 3, ...sx }}>
            <Stack
                direction='row'
                justifyContent='space-between'

            >
                <Typography variant='h6' color="primary">
                    {tableData.title}
                </Typography>
                <Button color='error' onClick={handleRemove} variant='contained'>Delete Table</Button>
            </Stack>
            <FieldArray name={`table[${tableIndex}].specs`}>
                {
                    ({ push, remove }) => (
                        <Box>
                            {
                                tableData.specs.map((spec, idx) => (
                                    <Grid key={`spec${idx}`} container spacing={2} sx={{ mt: 0.1 }} alignItems='flex-end'>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Property Title"
                                                fullWidth
                                                variant='standard'
                                                name={`table.${tableIndex}.specs.${idx}.label`}
                                                onChange={handleChange}
                                                value={spec.label}
                                            />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                label="Property Value"
                                                fullWidth
                                                variant='standard'
                                                name={`table.${tableIndex}.specs.${idx}.value`}
                                                onChange={handleChange}
                                                value={spec.value}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button onClick={() => remove(idx)} variant='outlined' color='warning' size='small'>Remove</Button>
                                        </Grid>

                                    </Grid>
                                ))
                            }
                            <Button
                                sx={{ mt: 2 }}
                                variant='outlined'
                                color='success'
                                size='small'
                                onClick={() => {push({label: '', value: ''})}}
                            >
                                Add New Property
                            </Button>
                        </Box>
                    )
                }
            </FieldArray>

        </Card>
    )
}

export default ConfigTable;

ConfigTable.propTypes = {
    sx: PropTypes.object,
    tableData: PropTypes.any,
    tableIndex: PropTypes.any,
    handleRemove: PropTypes.any,
    touched: PropTypes.any,
    errors: PropTypes.any,
    handleChange: PropTypes.any,
}