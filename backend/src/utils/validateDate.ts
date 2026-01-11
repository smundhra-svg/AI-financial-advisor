export const validateDate = (value: string) => {
    // Regular expression to match the date format DD-MM-YYYY or DD/MM/YYYY
    return /^\d{2}[\/-]\d{2}([\/-]\d{4})?$/.test(value);
}

