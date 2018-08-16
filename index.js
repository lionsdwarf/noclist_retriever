const request = require(`./request`);

const DOMAIN = `http://0.0.0.0:8888`;
const ENDPOINT_AUTH = `auth`;
const ENDPOINT_USERS = `users`;

const retrieveNOC = async function() {
  const req = await request(`${DOMAIN}/${ENDPOINT_AUTH}`);
  console.log(req);
}

retrieveNOC();
