import { parseISO, isValid, format } from "date-fns";
export const formatDateSafe = (
  dateString: string,
  dateFormat: string,
  fallback: string = "invalid date"
) => {
  // Attempt to parse the input date string
  try {
    const parsedDate = parseISO(dateString);

    // Check if the parsed date is valid
    if (!isValid(parsedDate)) {
      return fallback;
    }

    // Format the valid date using the specified format
    return format(parsedDate, dateFormat);
  } catch (error) {
    // If an error occurs, return the fallback value
    return fallback;
  }
};
