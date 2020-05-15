export const chartJsParser = (
  data: any[],
  parameter: string[]
): Record<any, any> => {
  let results: Record<string, any> = {};
  const parsingParams = parameter.map((label: string) => ({
    [label]: data.map(value => value[label])
  }));

  for (let i = 0; i < parsingParams.length; i++) {
    const keys = Object.keys(parsingParams[i]);
    results[keys[0]] = parsingParams[i][keys[0]];
  }
  return results;
};
