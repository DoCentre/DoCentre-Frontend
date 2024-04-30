import axios from "axios";

export const createDoc = async function (userID) {
  let json = {
    author_id: userID,
  };

  try {
    const response = await axios.post("/api/document", json);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
