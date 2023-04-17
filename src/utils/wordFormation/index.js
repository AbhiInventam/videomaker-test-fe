// Convert String to TitleCase
export const TitleCase = (string) => {
  // let sentence = string.toLowerCase().split(' ')
  // for (var i = 0; i < sentence.length; i++) {
  //   sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
  // }

  let sentence = "";
  if (string) {
    sentence = string
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return sentence;
};

// Remove Space from sentence
export const WordSpaceRemover = (string) => {
  let sentence = "";
  if (string) {
    sentence = string.toLowerCase().split(" ").join("_"); // User anything instead of _ for join words
  }

  return sentence;
};
