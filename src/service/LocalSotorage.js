export const getLocalStorage = (param) => {
  const tokenLocalStorage = localStorage.getItem(param);
  return tokenLocalStorage;
};

export const saveUserLocalStorage = (param) => {
  localStorage.setItem('user', JSON.stringify(param));
};

// export const removeLocalStorage = (param) => {
//   localStorage.removeItem(param);
// };
