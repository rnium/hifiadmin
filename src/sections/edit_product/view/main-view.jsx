/* eslint-disable */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Container } from '@mui/material';

import EditProduct from './editproduct';

import { useGet } from 'src/hooks/useApi';

import Loading from 'src/layouts/dashboard/common/loading';
import { api_endpoints, endpoint_suffixes } from 'src/utils/data';



function EditProductMain({ slug }) {  
  const [allLoaded, setAllLoaded] = useState(false);
  const { data, loaded, error, perform_get } = useGet(`${api_endpoints.product}${slug}`);
  const { data: kf_data, loaded: kf_loaded, error: kf_load_error, perform_get: load_kf } = useGet(
    `${api_endpoints.product}${slug}${endpoint_suffixes.keyfeatures}`, 
    false, 
    []
  );
  const { data: all_tags, loaded: tagsLoaded, perform_get: loadTags, url: allTagsApiUrl, setUrl: setAllTagsApiUrl } = useGet(null, false, []);
  const { data: tagGroups, loaded: tagGroupsLoaded, perform_get: loadTagGroups, url: tagGroupsApiUrl, setUrl: setTagGroupsApiUrl } = useGet(null, false, []);


  useEffect(() => {
    if (!loaded) {
      perform_get();
    }
    if (!kf_loaded) {
      load_kf();
    }
    if (loaded && kf_loaded && tagsLoaded && tagGroupsLoaded) {
      setAllLoaded(true);
    }
  }, [loaded, kf_loaded, tagsLoaded, tagGroupsLoaded])

  useEffect(() => {
    if (loaded && data && !tagsLoaded) {
      setAllTagsApiUrl(`${api_endpoints.categories}?parent=all`);
      setTagGroupsApiUrl(`${api_endpoints.categories}${data.category}${endpoint_suffixes.groups}`);
    }
  }, [loaded, data, tagsLoaded])

  useEffect(() => {
    if (allTagsApiUrl) {
      loadTags();
    }
    if (tagGroupsApiUrl) {
      loadTagGroups();
    }
  }, [allTagsApiUrl, tagGroupsApiUrl])

  return (
    <Container>
        {
          !allLoaded ? <Loading sx={{ mt: '5vh' }} size='large' /> : 
          <EditProduct
            slug={slug}
            prod={data}
            all_tags={all_tags}
            tagGroups={tagGroups}
            key_features={kf_data}
          /> 
        }      
    </Container>
  )
}

export default EditProductMain;

EditProductMain.propTypes = {
  slug: PropTypes.string
}