import { OAuth2Client } from "google-auth-library";

export const loginByGoogle = async (authCode) => {
  // const body = await readBody(authCode);
  const oauth2Client = new OAuth2Client({
    clientId: "",
    clientSecret: "",
    redirectUri: "http://lab.codex.tw:5173",
  });

  const { tokens } = await oauth2Client.getToken(authCode);

  oauth2Client.setCredentials({ access_token: tokens.access_token });

  const userInfo = await oauth2Client
    .request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    })
    .then((response) => response.data)
    .catch(() => null);

  await oauth2Client.revokeCredentials();

  if (!userInfo) {
    return null;
  }

  return {
    id: userInfo.sub,
    name: userInfo.name,
    avatar: userInfo.picture,
    email: userInfo.email,
    emailVerified: userInfo.email_verified,
  };
};
