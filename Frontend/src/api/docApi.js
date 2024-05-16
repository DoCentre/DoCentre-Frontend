import axios from "axios";

export const createDoc = async function (userID) {
  let json = {
    author_id: userID,
  };

  try {
    const response = await axios.post("/api/document", json);
    return response.data;
  } catch (err) {
    console.log(
      "createDoc API Error",
      err["response"]["status"],
      err["response"]["data"]["msg"]
    );
    return null;
  }
};

export const updateDoc = async function (
  authorID,
  documentID,
  title,
  content,
  appendix,
  approverID,
  status,
) {
  let json = {
    author_id: authorID,
    document_id: documentID,
    title: title,
    content: content,
    appendix: appendix,
    approver_id: approverID,
    status: status, // edit, verify, approve, reject
  };

  try {
    const response = await axios.put("/api/document/update", json);
    return response.data;
  } catch (err) {
    console.log(
      "initDoc API Error",
      err["response"]["status"],
      err["response"]["data"]["msg"]
    );
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
    console.log(
      "getDocList API Error",
      err["response"]["status"],
      err["response"]["data"]["msg"]
    );
    return null;
  }
};

export const getDocVerifyList = async function (userID) {
  let json = {
    user_id: userID,
  };

  try {
    const response = await axios.post("/api/documents/verify", json);
    return response.data;
  } catch (err) {
    console.log(
      "getDocViewerList API Error",
      err["response"]["status"],
      err["response"]["data"]["msg"]
    );
    return null;
  }
};

export const getDocApproverList = async function (userID) {
  let json = {
    approver_id: userID,
  };

  try {
    const response = await axios.post("/api/documents/approver", json);
    console.log(json);
    console.log(response)
    return response.data;
  } catch (err) {
    console.log(
      "getDocViewerList API Error",
      err["response"]["status"],
      err["response"]["data"]["msg"]
    );
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
    console.log(
      "getDocHistory API Error",
      err["response"]["status"],
      err["response"]["data"]["msg"]
    );
    return null;
  }
};

export const getDocContent = async function (userID, docID) {
  let json = {
    user_id: userID,
    document_id: docID,
  };

  try {
    const response = await axios.post("/api/document/content", json);
    return response.data;
  } catch (err) {
    console.log(
      "getDocHistory API Error",
      err["response"]["status"],
      err["response"]["data"]["msg"]
    );
    return null;
  }
};
