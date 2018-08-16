const HOST = `0.0.0.0`;
const PORT = `8888`;
const ENDPOINT_AUTH = `/auth`;
const ENDPOINT_USERS = `/users`;
const AUTH_TOKEN_HEADER = `badsec-authentication-token`;
const CHECKSUM_HEADER = `x-request-checksum`;

module.exports = {
  HOST,
  PORT,
  ENDPOINT_USERS,
  ENDPOINT_AUTH,
  AUTH_TOKEN_HEADER,
  CHECKSUM_HEADER,
};