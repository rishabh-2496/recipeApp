import httpService from "../../services/httpService";

const SearchApi = async ({ query, page }) => {
  try {
    const result = await httpService.get(`/search?q=${query}&page=${page}`);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default SearchApi;
