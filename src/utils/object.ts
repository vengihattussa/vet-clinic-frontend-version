export function isEmpty(obj: object) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}

export function removeFalsyKeys<T extends object>(obj: T) {
  return (Object.keys(obj) as (keyof T)[]).reduce((acc, curr) => {
    if (obj[curr]) acc[curr] = obj[curr];
    return acc;
  }, {} as T);
}

export const transformEnumToOptions = (data: Record<string, string>) => {
  return Object.values(data).reduce(
    (acc, curr) => {
      acc[curr] = curr;
      return acc;
    },
    {} as unknown as Record<string, string>,
  );
};

export const transformEnumToOptionsGenderType = (data: Record<string, string>) => {
  return Object.entries(data).reduce(
    (acc, [key, value]) => {
      acc[key] = value; // Store key instead of value
      return acc;
    },
    {} as Record<string, string>,
  );
};
