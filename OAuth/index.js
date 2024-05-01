const express = require("express");
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

  res.send(userInfo);
});

app.listen(port, () => {
  console.log(`OAuth listening on port ${port}`);
});
