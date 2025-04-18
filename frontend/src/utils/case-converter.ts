interface CaseConverter {
  (str: string | null): string | undefined;
}

export const toKebabCase: CaseConverter = (str) => {
  if (str) {
    return str.replace(/\s+/g, "-").toLowerCase();
  }
};

export const snakeToCamel: CaseConverter = (str) => {
  if (str) {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
};

export const camelToSnake: CaseConverter = (str) => {
  if (str) {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
  }
};

export const toUpperCase: CaseConverter = (str) => {
  if (str) {
    return str.toUpperCase();
  }
};

type AnyObject = { [key: string]: any };

export const mapKeysTo = (obj: AnyObject | any, fn: CaseConverter = snakeToCamel): AnyObject | any => {
  if (Array.isArray(obj)) {
    return obj.map((key) => mapKeysTo(key, fn));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = fn(key) || key;
      acc[camelCaseKey] = obj[key] !== undefined ? mapKeysTo(obj[key], fn) : obj[key];
      return acc;
    }, {} as AnyObject);
  }
  return obj;
};
