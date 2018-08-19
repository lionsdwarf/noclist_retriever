const http = require(`http`);
const { HOST, PORT } = require(`./constants`);

//keep-alive agent
const agent = new http.Agent({ keepAlive: true });

const buildReqOptions = (customOptions) => ({
  host: HOST,
  port: PORT,
  agent,
  ...customOptions,
});

const request = async function(customOptions) {

  return new Promise((resolve, reject) => {

    const options = buildReqOptions(customOptions);

    http.get(options, (res) => {

      const resBody = [];

      res.on(`data`, (chunk) => resBody.push(chunk));

      res.on(`end`, () => {
        const statusCode = parseInt(res.statusCode);
        const payload = {
          body: resBody.join(``),
          headers: res.headers,
        };
        statusCode === 200 ? resolve(payload) : reject({statusCode});
      });
      
    }).on(`error`, (err) => {
      reject({statusCode: 500});
    });
        
  });

}

module.exports = request;