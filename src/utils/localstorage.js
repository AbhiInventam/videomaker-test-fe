export const setLocal = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocal = (key) => {
  return localStorage.getItem(key);
};

export const removeLocal = (key) => {
  localStorage.removeItem(key);
};
