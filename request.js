const http = require(`http`);

const request = async function(url) {

  return new Promise((resolve, reject) => {

    http.get(`${url}`, (res) => {

      const resBody = [];

      res.on(`data`, (chunk) => resBody.push(chunk));

      res.on(`end`, () => resolve({
        body: resBody.join(``),
        statusCode: res.statusCode,
      }));

    }).on(`error`, (err) => {
      //handle errors
    });
        
  });

}

module.exports = request;