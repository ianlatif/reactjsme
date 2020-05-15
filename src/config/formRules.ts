

export const checkLength = (getFieldValue: any, name: string, len: number) => {
  if (getFieldValue(name).length >= len) {
    return Promise.resolve();
  }
  return Promise.reject(`must be over ${len} characters`);
}