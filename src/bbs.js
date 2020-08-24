const axios = require('axios')

axios.get('/api/v1/hello')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });