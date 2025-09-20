import { format, parse, isDate } from "date-fns";

export function serverToInputDatetimeFlexible(val?: string | Date) {
  if (!val) return "";

  if (isDate(val)) {
    return format(val, "yyyy-MM-dd'T'HH:mm");
  }

  if (val.includes("T")) {
    const date = new Date(val);
    if (isNaN(date.getTime())) return "";
    return format(date, "yyyy-MM-dd'T'HH:mm");
  }

  const parsed = parse(val, "yyyy-MM-dd HH:mm:ss", new Date());
  if (isNaN(parsed.getTime())) return "";
  return format(parsed, "yyyy-MM-dd'T'HH:mm");
}
