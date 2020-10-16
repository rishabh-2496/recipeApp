import httpService from "../../services/httpService";

const loginApi = async (data) => {
  try {
    const result = await httpService.post("/login", data);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const forgotPasswordApi = async (data) => {
  try {
    const result = await httpService.put("/forgotPassword", data);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const resetPasswordApi = async (data) => {
  console.log("data", data);
  try {
    const result = await httpService.put("/resetPassword", data);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default loginApi;
