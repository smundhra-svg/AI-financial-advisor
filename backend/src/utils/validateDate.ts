export const validateDate = (value: string) => {
  if (!value) return false;

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return true;

  // MM/DD or DD/MM
  if (/^\d{1,2}\/\d{1,2}$/.test(value)) return true;

  return false;
};
