import httpService from "../../services/httpService";

const addRecipeApi = async (data) => {
  try {
    const result = await httpService.post("/recipe", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postCommentApi = async (data) => {
  try {
    const result = await httpService.post("/comment", data);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCommentsApi = async (recipeId) => {
  try {
    const result = await httpService.get(`/comment?recipeId=${recipeId}`);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postReplyApi = async (data) => {
  try {
    const result = await httpService.post(`/reply`, data);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getRecipeDetailApi = async (recipeId) => {
  try {
    const result = await httpService.get(`/recipe/${recipeId}`);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default addRecipeApi;
