import PropTypes from 'prop-types'
import { getIn, FieldArray } from 'formik';

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
        handleBlur,
        kf_table=false
    }
) {
    const specs_array_name = kf_table ? 'key_features' : `table[${tableIndex}].specs`;
    const table_title = kf_table ? "Key Features" : tableData.title;
    return (
        <Card sx={{ px: 3, py: 3, ...sx }}>
            <Stack
                direction='row'
                justifyContent='space-between'

            >
                <Typography variant='h6' color="primary">
                    {table_title}
                </Typography>
                {
                    !kf_table ? 
                    <Button color='error' onClick={handleRemove} variant='contained'>Delete Table</Button>
                    : null
                }
            </Stack>
            <FieldArray name={specs_array_name}>
                {
                    ({ push, remove }) => (
                        <Box>
                            {
                                tableData.specs.map((spec, idx) => {
                                    const spec_label = kf_table ? `key_features[${idx}].label` : `table[${tableIndex}].specs[${idx}].label`;
                                    const spec_value = kf_table ? `key_features[${idx}].value` : `table[${tableIndex}].specs[${idx}].value`;
                                    const label_error = getIn(errors, spec_label);
                                    const label_touched = getIn(touched, spec_label);
                                    const value_error = getIn(errors, spec_value);
                                    const value_touched = getIn(touched, spec_value);
                                    return (
                                        <Grid key={`spec${idx}`} container spacing={2} sx={{ mt: 0.1 }} alignItems='flex-end'>
                                            <Grid item xs={4}>
                                                <TextField
                                                    label="Feature Title"
                                                    fullWidth
                                                    variant='standard'
                                                    name={spec_label}
                                                    onChange={handleChange}
                                                    value={spec.label}
                                                    onBlur={handleBlur}
                                                    error={label_touched && Boolean(label_error)}
                                                    helperText={label_touched && Boolean(label_error) ? label_error : ""}
                                                />
                                            </Grid>
                                            <Grid item xs={7}>
                                                <TextField
                                                    label="Feature"
                                                    fullWidth
                                                    variant='standard'
                                                    name={spec_value}
                                                    onChange={handleChange}
                                                    value={spec.value}
                                                    onBlur={handleBlur}
                                                    error={value_touched && Boolean(value_error)}
                                                    helperText={value_touched && Boolean(value_error) ? value_error : ""}
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
                                onClick={() => { push({ label: '', value: '' }) }}
                            >
                                New Feature Row
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
    handleBlur: PropTypes.any,
    kf_table: PropTypes.any,
}