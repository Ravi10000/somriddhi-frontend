const formator = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export function currencyFormator(value) {
  return formator.format(value);
}
