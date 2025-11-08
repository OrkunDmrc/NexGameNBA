
import { toast } from "@/component/toast";
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "https://localhost:44380/api/";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(request => {
  request.headers["Content-Type"] = "application/json";
  if(request.url?.includes("balldontlie")){
    request.headers["Authorization"] = "308a857a-9732-4a30-bd2a-7a3dc014cf2b";
  }
  return request;
});

axios.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    // Check if the error has a response (not a network error)
    if (error.response) {
      const { data, status } = error.response;
      switch (status) {
        case 400:
          console.warn("Bad Request:", data);
          toast(String(data || ""), "error", "Error");
          break;
        case 401:
          console.warn("Unauthorized:", data);
          toast(String(data || ""), "error", "Error");
          break;
        case 403:
          console.warn("Forbidden:", data);
          toast(String(data || ""), "error", "Error");
          break;
        case 404:
          console.warn("Not Found:", data);
          toast(String(data || ""), "error", "Error");
          break;
        case 500:
          console.error("Server Error:", data);
          toast(String(data || ""), "error", "Error");
          break;
        default:
          console.error("Unhandled error:", status, data);
          toast(String(data || ""), "error", "Error");
          break;
      }
    } else {
      console.error("Network or CORS error:", error.message);
    }
    return Promise.reject(error);
  }
);

const methods = {
  get: (url: string) => axios.get(url).then(res => res.data).catch(e => e),
  post: (url: string, body: any) => axios.post(url, body).then(res => res).catch(e => e),
  put: (url: string, body: any) => axios.put(url, body).then(res => res).catch(e => e),
  delete: (url: string) => axios.delete(url).then(res => res).catch(e => e),
};

const balldontlie = {
    getGamesByDate: async (date: string) => await methods.get(`https://api.balldontlie.io/v1/games?dates[]=${date}`)
}

export const request = {
    balldontlie
}