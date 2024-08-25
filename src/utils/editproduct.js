export const prepare_prod_spectables = (prod_spectables_prev, category_spec_tables) => {
    const prod_specs = prod_spectables_prev.reduce((acc, tbl) => [...acc, ...tbl.specs], []);
    const get_spec_val = (spec_id) => {
        const prod_spec = prod_specs.find(spec => spec.id === spec_id);
        return prod_spec?.value || ''
    }
    return category_spec_tables.reduce((acc, spec_tbl) => [
        ...acc,
        {
            ...spec_tbl,
            specs: spec_tbl.specs.map(spec => ({
                ...spec,
                value: get_spec_val(spec.id)
            }))
        }
    ], [])
    
}