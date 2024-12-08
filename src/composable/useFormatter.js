export function useFormatter() {
  const formatThousands = (value) => {
    console.log("lets see", value);
    if (typeof value != "number") return value;
    return value.toLocaleString();
  };

  return { formatThousands };
}
