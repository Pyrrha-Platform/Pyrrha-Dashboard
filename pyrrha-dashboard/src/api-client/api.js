const axios = require('axios');

class API {
  getFirefighter(id) {
    axios({
      method: 'get',
      url: '/api-main/v1/firefighters/' + id,
    });
  }

  getAllFirefighters() {
    axios({
      method: 'get',
      url: '/api-main/v1/firefighters',
    });
  }

  addFirefighter(id, firstName, lastName, email) {
    axios({
      method: 'post',
      url: '/api-main/v1/firefighters',
      data: {
        id: 5,
        first: 'Shedrack',
        last: 'Akintayo',
        email: 'derp@derp.net',
      },
    });
  }

  resetStream() {
    axios({
      method: 'put',
      url: 'http://localhost:4000/_stream',
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

const api = new API();

export default api;
