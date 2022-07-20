const { Access_Token } = require("../models");

const generateAccessToken = async (req, res, next) => {
  try {
    const grant_type = "client_credentials";
    const scope = "endpoint_client";
    const client_id = "ydtB4OgQgxnKVkE8HToqZBId9dVlQTeo7I0cwg2N";
    const client_secret = "pyKJdSr6hR6TAj3OeoE7D3el3qSjsG8SeSCrL3y3";

    const access_token = await axios({
      method: "post",
      url: "https://api.globalstats.io/oauth/access_token",
      data: {
        grant_type,
        scope,
        client_id,
        client_secret,
      },
    });

    const data = await Access_Token.create({
      UserId: user.id,
      access_token: access_token.data.access_token,
    });

    return data.access_token
  } catch (err) {}
};
