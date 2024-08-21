/* eslint-disable */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Container } from '@mui/material';

import { useGet } from 'src/hooks/useApi';

import Loading from 'src/layouts/dashboard/common/loading';
import { api_endpoints, endpoint_suffixes } from 'src/utils/data';



function EditProductMain({ slug }) {
  console.log(slug);
  
  const [allLoaded, setAllLoaded] = useState(false);
  const { data, loaded, error, perform_get } = useGet(`${api_endpoints.product}${slug}`);
  const { data: all_tags, loaded: tagsLoaded, perform_get: loadTags, url: allTagsApiUrl, setUrl: setAllTagsApiUrl } = useGet(null, false, []);
  const { data: tagGroups, loaded: tagGroupsLoaded, perform_get: loadTagGroups, url: tagGroupsApiUrl, setUrl: setTagGroupsApiUrl } = useGet(null, false, []);


  useEffect(() => {
    if (!loaded) {
      perform_get();
    }
    if (loaded && tagsLoaded && tagGroupsLoaded) {
      setAllLoaded(true);
    }
  }, [loaded, tagsLoaded, tagGroupsLoaded])

  useEffect(() => {
    if (loaded && data && !tagsLoaded) {
      setAllTagsApiUrl(`${api_endpoints.categories}?treeof=${data.category}`);
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
          allLoaded ? <h1>All Loaded</h1>
          : <h1>Not Loaded</h1>
        }      
    </Container>
  )
}

export default EditProductMain;

EditProductMain.propTypes = {
  slug: PropTypes.string
}