export function convertKeysToCamelCase(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelCaseKey = key.replace(/[-_](\w)/g, (_, letter) => letter.toUpperCase());
    acc[camelCaseKey] = convertKeysToCamelCase(obj[key]);
    return acc;
  }, {} as any);
}
