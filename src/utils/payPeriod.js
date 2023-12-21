let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const getPayMonth = () => {
  for (let key in months) {
    let m = Number(key);
    if (m === month) {
      if (m === 11) return months[0];
      return months[m + 1];
    }
  }
};

export const getPayYear = () => {
  if (month === 11) return year + 1;
  return year;
};
