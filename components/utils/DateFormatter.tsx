export default function dateFormatter(datestring: string) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const date = new Date(datestring);
    return (
        date.getDate() +
        " " +
        months[date.getMonth()] +
        " " +
        date.getFullYear()
    );
}
