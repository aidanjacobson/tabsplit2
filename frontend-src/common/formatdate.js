function formatDate(timestring) {
    const date = new Date(timestring);

    // m/d/yyyy format
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
}

export default formatDate;