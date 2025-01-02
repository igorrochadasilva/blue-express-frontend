export const formatToUSD = (value: number) => {
  const formattedValue = value.toFixed(2);
  return `$${formattedValue}`;
};
