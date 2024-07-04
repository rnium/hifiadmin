import PropTypes from 'prop-types'
import { getIn, FieldArray } from 'formik';

import { Box, Card, Grid, Stack, Button, TextField, Typography } from '@mui/material';

function SpecTable(
    {
        sx = {},
        tableData,
        tableIndex,
        handleRemove,
        touched,
        errors,
        handleChange,
        handleBlur,
    }
) {
    const specs_array_name = `table[${tableIndex}].specs`;
    const table_title = tableData.title;
    if (!tableData?.id) {
        sx.backgroundColor = '#caf0f8'
    }
    return (
        <Card sx={{ px: 3, py: 3, ...sx }}>
            <Stack
                direction='row'
                justifyContent='space-between'

            >
                <Typography variant='h6' color="primary">
                    {table_title}
                </Typography>
                <Button color='error' onClick={handleRemove} variant='contained'>Delete Table</Button>
            </Stack>
            <FieldArray name={specs_array_name}>
                {
                    ({ push, remove }) => (
                        <Box>
                            {
                                tableData.specs.map((spec, idx) => {
                                    const spec_title = `table[${tableIndex}].specs[${idx}].title`;
                                    const spec_aliases = `table[${tableIndex}].specs[${idx}].aliases`;
                                    const title_error = getIn(errors, spec_title);
                                    const title_touched = getIn(touched, spec_title);
                                    // const value_error = getIn(errors, spec_aliases);
                                    // const value_touched = getIn(touched, spec_aliases);
                                    return (
                                        <Grid key={`spec${idx}`} container spacing={2} sx={{ mt: 0.1 }} alignItems='flex-end'>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Feature Title"
                                                    fullWidth
                                                    variant='standard'
                                                    name={spec_title}
                                                    onChange={handleChange}
                                                    value={spec.title}
                                                    onBlur={handleBlur}
                                                    error={title_touched && Boolean(title_error)}
                                                    helperText={title_touched && Boolean(title_error) ? title_error : ""}
                                                />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField
                                                    label="Aliases (Comma separated)"
                                                    fullWidth
                                                    variant='standard'
                                                    name={spec_aliases}
                                                    onChange={handleChange}
                                                    value={spec.aliases}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Button onClick={() => remove(idx)} variant='outlined' color='warning' size='small'>Remove</Button>
                                            </Grid>

                                        </Grid>
                                    )
                                })
                            }
                            <Button
                                sx={{ mt: 2 }}
                                variant='outlined'
                                color='success'
                                size='small'
                                onClick={() => { push({ title: '', id: null, aliases: [] }) }}
                            >
                                Add Feature Row
                            </Button>
                        </Box>
                    )
                }
            </FieldArray>

        </Card>
    )
}

export default SpecTable;

SpecTable.propTypes = {
    sx: PropTypes.object,
    tableData: PropTypes.any,
    tableIndex: PropTypes.any,
    handleRemove: PropTypes.any,
    touched: PropTypes.any,
    errors: PropTypes.any,
    handleChange: PropTypes.any,
    handleBlur: PropTypes.any,
}