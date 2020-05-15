const formatNpwp = (value: string | number | undefined) => {
  if (!value) {
    return "";
  }

  return value.toString().replace(/(\d{2})+(?!\d)/g, "$1.");
  // 86.414.374.8-448.000
};

const parserNpwp = (value: string | undefined) => {
  if (!value) {
    return "";
  }
  return value.toString().replace(/[^0-9]/g, "");
};

export { parserNpwp, formatNpwp };
