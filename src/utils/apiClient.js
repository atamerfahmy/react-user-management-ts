import axios from "axios";

export const baseURL = "https://dummyapi.io/data/v1";

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "app-id": "6316313b4e0de5a8d4d7f155"
  },
});
