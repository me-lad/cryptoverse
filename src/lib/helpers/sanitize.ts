import validator from "validator";

export function sanitizeFormData<T extends Record<string, any>>(data: T): T {
  const sanitized: Record<string, any> = {};

  for (const key in data) {
    const value = data[key];

    if (typeof value === "string") {
      sanitized[key] = validator.escape(value.trim());
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}
