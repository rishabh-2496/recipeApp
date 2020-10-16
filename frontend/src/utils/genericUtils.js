import jwtDecode from "jwt-decode";

export const ObjectToFormData = (object) => {
  let formData = new FormData();

  for (let key in object) {
    formData.append(key, object[key]);
  }

  return formData;
};

export const addCollectionToFormData = (key, collection, formData) => {
  for (let i = 0; i < collection.length; i++) {
    formData.append(key, collection[i]);
  }
};

export const saveItem = async (key, value) => {
  await localStorage.setItem(key, value);
};

export const getItem = (key) => {
  return localStorage.getItem(key);
};

export const getCurrentUser = (key) => {
  try {
    const jwt = localStorage.getItem(key);
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
