import apiClient from "@/services/AxiosClient.js";
apiClient.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token && !request.url.includes("/user/add"))  {
      request.headers["Authorization"] = "Bearer " + token;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
