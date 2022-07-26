import axios from "axios";
const api = axios.create({
  baseURL: "https://mock-api.driven.com.br/api/v5/cineflex/movies",
});
export default api;
