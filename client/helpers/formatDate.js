const formatDate = (date) => {
    return new Date(date).toISOString().substr(0, 10);
}