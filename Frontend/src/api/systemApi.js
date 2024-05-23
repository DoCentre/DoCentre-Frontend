import axios from "axios";

export const getMetrics = async function () {
  try {
    const response = await axios.get("/api/metrics");
    return response.data;
  } catch (err) {
    console.log("getMetrics API Error", err["response"]);
    return null;
  }
};
