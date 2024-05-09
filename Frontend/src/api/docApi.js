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

export const initDoc = async function (
  appendix,
  approverID,
  authorID,
  content,
  documentID,
  status,
  title
) {
  let json = {
    appendix: appendix,
    approver_id: approverID,
    author_id: authorID,
    content: content,
    document_id: documentID,
    status: status, // edit, verify, approve, reject
    title: title,
  };

  try {
    const response = await axios.put("/api/document/update", json);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getDocList = async function (userID) {
  let json = {
    author_id: userID,
  };

  try {
    const response = await axios.post("/api/documents/author", json);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getDocViewerList = async function (userID) {
  let json = {
    viewer_id: userID,
  };

  try {
    const response = await axios.post("/api/documents/viewer", json);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getDocHistory = async function (docID, userID) {
  let json = {
    document_id: docID,
    user_id: userID,
  };

  try {
    const response = await axios.post("/api/document/histories", json);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
