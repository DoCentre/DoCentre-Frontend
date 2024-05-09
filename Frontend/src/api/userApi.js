import axios from "axios";
import MD5 from "crypto-js/md5";

export const loginUser = async function (username, password) {
  const hashPassword = MD5(password).toString();
  let json = {
    username: username,
    password: hashPassword,
  };
  try {
    const response = await axios.post("/api/login", json);
    return response.data;
  } catch (err) {
    console.log(
      "loginUser API Error",
      err["response"]["status"],
      err["response"]["data"]["msg"]
    );
    return null;
  }
};

export const createUser = async function (username, password, email) {
  const hashPassword = MD5(password).toString();
  let json = {
    username: username,
    password: hashPassword,
    email: email,
  };

  try {
    const response = await axios.post("/api/user", json);
    return response.data;
  } catch (err) {
    console.log(
      "createUser API Error",
      err["response"]["status"],
      err["response"]["data"]["msg"]
    );
    return null;
  }
};
