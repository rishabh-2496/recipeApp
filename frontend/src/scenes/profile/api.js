import httpService from "../../services/httpService";

export const getProfileApi = async ({ id, page }) => {
  try {
    const result = await httpService.get(`/profile/${id}?page=${page}`);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editProfileApi = async (payload) => {
  try {
    const result = await httpService.put(
      `/editProfile/${payload.id}`,
      payload.data
    );
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
