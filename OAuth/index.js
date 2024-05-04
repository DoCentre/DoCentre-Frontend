const express = require("express");
const md5 = require("crypto-js/md5");
const OAuth2Client = require("google-auth-library").OAuth2Client;
const app = express();
const port = 5273;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("OAuth server is running!");
});

app.post("/google", async (req, res) => {
  accessToken = req.body.access_token;
  const oauth2Client = new OAuth2Client();
  oauth2Client.setCredentials({ access_token: accessToken });

  const userInfo = await oauth2Client
    .request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    })
    .then((response) => response.data)
    .catch(() => null);

  oauth2Client.revokeCredentials();

  if (!userInfo) {
    res.send("Invalid access token");
    return;
  }

  let returnUserInfo = {
    username: userInfo.name,
    email: userInfo.email,
    token: md5(userInfo.sub + userInfo.email).toString(),
  };

  res.send(returnUserInfo);
});

app.listen(port, () => {
  console.log(`OAuth listening on port ${port}`);
});
