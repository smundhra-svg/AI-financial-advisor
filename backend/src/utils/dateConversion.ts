export function formattedDateToMonth(dateString:string){
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-GB",{
        day: "numeric",
        month: "long",
        year:"numeric"
    });
    return formatter.format(date);
}
