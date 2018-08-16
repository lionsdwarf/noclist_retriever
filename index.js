const crypto = require(`crypto`);
const { ENDPOINT_AUTH, ENDPOINT_USERS, AUTH_TOKEN_HEADER, CHECKSUM_HEADER } = require(`./constants`);
const request = require(`./request`);

let consecutiveFailures = 0;

const buildSHA256Checksum = authData => crypto.createHash(`sha256`).update(`${authData.headers[AUTH_TOKEN_HEADER]}${ENDPOINT_USERS}`).digest(`hex`);

const reqWithRetry = async function(customOptions) {
  
  let res = await request(customOptions);

  if (res.statusCode === 200) {
    consecutiveFailures = 0;
    return res;
  } else {
    consecutiveFailures++;
    if (consecutiveFailures < 3) {
      let res = reqWithRetry(customOptions);
    } else {
      process.exit(1);
    }
  }

}

const retrieveNOCList = async function() {
  const authData = await reqWithRetry({ path: ENDPOINT_AUTH, });
  const checksum = buildSHA256Checksum(authData)
  const usersOptions = { 
    path: ENDPOINT_USERS,
    headers: {
      [CHECKSUM_HEADER]: checksum,
    },
  };
  const usersData = await reqWithRetry(usersOptions);
  console.log(usersData.body)
}

retrieveNOCList();
