export const Cashify = (num) => {
  return `${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  }).format(num)}`;
};
