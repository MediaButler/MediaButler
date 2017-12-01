const axios = require('axios');
module.exports = (searchTerms) =>
{
  const query = searchTerms.join("%20")
    const p = new Promise((resolve, reject) =>
    {
        axios.get(`http://api.comicvine.com/search/`, {
          params: {
            api_key: '2a9b13ae78bf6ffa222f529c6fd39da95b5e8a90',
            resource_type: 'volume',
            resources: 'volume',
            query: query,
            limit: '1',
            offset: '0',
            format: 'json',
            field_list: 'first_issue,image,last_issue,site_detail_url,start_year,id,description,name,count_of_issues'
          }
        })
        .then(function (response) {
          resolve(response.data);
          console.log()
        })
        .catch(function(error) {
          reject(error)
          console.log(error)
        });
    });
    return p;
}
