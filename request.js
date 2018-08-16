const http = require(`http`);
const { HOST, PORT } = require(`./constants`);

const buildReqOptions = (customOptions) => ({
  host: HOST,
  port: PORT,
  ...customOptions,
});

const request = async function(customOptions) {

  return new Promise((resolve, reject) => {

    const options = buildReqOptions(customOptions);

    http.get(options, (res) => {
      
      const resBody = [];

      res.on(`data`, (chunk) => resBody.push(chunk));

      res.on(`end`, () => {
        
        const payload = {
          body: resBody.join(``),
          statusCode: parseInt(res.statusCode),
          headers: res.headers,
        };

        resolve(payload);

      });

    }).on(`error`, (err) => {
      //handle errors
    });
        
  });

}

module.exports = request;