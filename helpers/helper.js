let axios = require("axios");

const tokenBoard = async (req, res, next) => {
  try {
    const grant_type = "client_credentials";
    const scope = "endpoint_client";
    const client_id = "jvOOAmkRowcy4qT8UmnbtOMT4FlVSfZcKO0kalcz";
    const client_secret = "o7WP14JnsVRhHKlm5helhr55rqfMCPE1XBQYGAm8";

    const access_token = await axios.post(
      `https://api.globalstats.io/oauth/access_token`,
      {
        grant_type,
        scope,
        client_id,
        client_secret,
      }
    );
    // console.log(access_token.data);
    return await access_token.data.access_token;
  } catch (error) {
    next(error);
  }
};

module.exports = tokenBoard;
