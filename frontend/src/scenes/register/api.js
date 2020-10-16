import httpService from "../../services/httpService";

const registerApi = async (data) => {
  try {
    const result = await httpService.post("/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const verificationApi = async (data) => {
  try {
    const result = await httpService.post("/verifyAccount", { token: data });
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default registerApi;
