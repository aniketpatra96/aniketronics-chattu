export const formatDate: (date: Date) => string = (date) => {
  let day: number = date.getDate();
  let monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month: string = monthNames[date.getMonth()];
  let formattedDate = day + " " + month;
  return formattedDate;
};

export const formatCreatedDate: (date: Date) => string = (date) => {
  let year: number = date.getFullYear();
  let day: number = date.getDate();
  let monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month: string = monthNames[date.getMonth()];
  let formattedDate = day + " " + month + " " + year;
  return formattedDate;
};
