// Random string generator function
export const randomStringGen = (length) => {
  // declare all characters
  // max-length = 61
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = " ";
  let newLength = length <= 61 ? length : 61; // Update length to max-length
  const charactersLength = characters.length;
  for (let i = 0; i < newLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
