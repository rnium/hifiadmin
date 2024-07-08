import { getIn } from 'formik';
import PropTypes from 'prop-types'

import { Card, Stack, TextField, Typography } from '@mui/material';

function ConfigTable(
    {
        sx = {},
        tableData,
        tableIndex,
        touched,
        errors,
        handleChange,
        handleBlur,
    }
) {
    return (
        <Card sx={{ px: 3, py: 3, ...sx }}>
            <Stack
                direction='row'
                justifyContent='flex-start'
                spacing={1}

            >
                <Typography variant='h6' color="text.secondary">
                    {tableIndex + 1}.
                </Typography>
                <Typography variant='h6' color="primary">
                    {tableData.title}
                </Typography>
            </Stack>
            <Stack
                spacing={1}
                sx={{ mt: 2 }}
            >
                {
                    tableData.specs.map((spec, idx) => {
                        const spec_value = `tables[${tableIndex}].specs[${idx}].value`;
                        const value_error = getIn(errors, spec_value);
                        const value_touched = getIn(touched, spec_value);
                        return (
                            <TextField
                                key={idx}
                                label={spec.title}
                                fullWidth
                                variant='outlined'
                                name={spec_value}
                                onChange={handleChange}
                                value={spec.value}
                                onBlur={handleBlur}
                                error={value_touched && Boolean(value_error)}
                                helperText={value_touched && Boolean(value_error) ? value_error : ""}
                            />
                        )
                    })
                }
            </Stack>

        </Card>
    )
}

export default ConfigTable;

ConfigTable.propTypes = {
    sx: PropTypes.object,
    tableData: PropTypes.any,
    tableIndex: PropTypes.any,
    touched: PropTypes.any,
    errors: PropTypes.any,
    handleChange: PropTypes.any,
    handleBlur: PropTypes.any,
}