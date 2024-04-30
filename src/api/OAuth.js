import axios from "axios";

export const loginByGoogle = async (authCode) => {
  try {
    let json = {
      access_token: authCode,
    };
    const response = await axios.post("/oauth/google", json);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
