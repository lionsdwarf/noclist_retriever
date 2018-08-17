const crypto = require(`crypto`);
const { ENDPOINT_AUTH, ENDPOINT_USERS, AUTH_TOKEN_HEADER, CHECKSUM_HEADER } = require(`./constants`);
const request = require(`./request`);

let consecutiveFailCount = 0;
let authToken;

const buildErrMsg = ({reqType, err}) => `>>>> Req Fail (${reqType}) ${consecutiveFailCount} - status code: ${err.statusCode}\n`

const buildSHA256Checksum = () => crypto.createHash(`sha256`).update(`${authToken}${ENDPOINT_USERS}`).digest(`hex`);

const formatUsersList = (usersListStr) => JSON.stringify(usersListStr.split(`\n`))

const reqAuthToken = async function() {
  try {
    const authData = await request({ path: ENDPOINT_AUTH, });
    authToken = authData.headers[AUTH_TOKEN_HEADER];
    consecutiveFailCount = 0;
  } catch (err) {
    consecutiveFailCount++;
    process.stderr.write(buildErrMsg({reqType: `AuthTok` ,err}));
  }
  transactionControl();
}

const reqUsersList = async function() {
  const usersOptions = { 
    path: ENDPOINT_USERS,
    headers: {
      [CHECKSUM_HEADER]: buildSHA256Checksum(),
    },
  };
  try {
    const usersData = await request(usersOptions);
    process.stdout.write(formatUsersList(usersData.body));
    process.exit(0);
  } catch (err) {
    consecutiveFailCount++;
    process.stderr.write(buildErrMsg({reqType: `UsrsList` ,err}))
    transactionControl();
  }
}

const transactionControl = () => {
  if (consecutiveFailCount < 3) {
    authToken ? reqUsersList() : reqAuthToken();
  } else {
    process.stderr.write(`>><< Process Terminating: max server fail\n`)
    process.exit(1);
  }
}

transactionControl();
