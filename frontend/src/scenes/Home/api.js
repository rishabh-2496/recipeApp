import httpService from "../../services/httpService";

export const allTimeRecipeApi = async (page) => {
  try {
    const result = await httpService.get(`/recipe?page=${page}`);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const todayRecipeApi = async (page) => {
  try {
    const result = await httpService.get(`/recipe/today?page=${page}`);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const thisWeekRecipeApi = async (page) => {
  try {
    const result = await httpService.get(`/recipe/thisWeek?page=${page}`);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const thisMonthRecipeApi = async (page) => {
  try {
    const result = await httpService.get(`/recipe/thisMonth?page=${page}`);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
