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
    console.log(err);
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
    console.log(err);
    return null;
  }
};

export const updateUser = async function (id, username, identity, email) {
  let json = {
    id: id,
    username: username,
    identity: identity,
    email: email,
  };

  try {
    const response = await axios.post("/api/user/update", json);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllUser = async function () {
  try {
    const response = await axios.get("/api/user/get-all");
    return response.data.userList;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async function (id) {
  let json = {
    id: id,
  };

  try {
    const response = await axios.post("/api/user/delete", json);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
