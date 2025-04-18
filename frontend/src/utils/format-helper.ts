export const formatCurrency = (value: string | number) => {
  let numericValue: string;

  if (typeof value === "number") {
    numericValue = value.toString();
  } else {
    numericValue = value.replace(/[^0-9.]/g, "");
  }

  const floatValue = parseFloat(numericValue);
  if (isNaN(floatValue)) return "";
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(
    floatValue
  );
};

export const textTransformProps = (
  textCase: "uppercase" | "lowercase" = "uppercase"
) => ({
  _placeholder: { textTransform: "none" },
  textTransform: textCase,
});
