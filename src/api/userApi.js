import axios from "axios";

export const loginUser = async function (username, password) {
  let json = {
    username: username,
    password: password,
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
  let json = {
    username: username,
    password: password,
    email: email,
  };

  try {
    const response = await axios.post("/api/user", json);
    return response.data;
  } catch (err) {
    console.log(err);
    // alert("此使用者名稱已被使用，嘗試其他的試試 !");
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
    alert("此使用者名稱已被使用，嘗試其他的試試 !");
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
