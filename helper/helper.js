function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  return year + '-' + month + '-' + day;
}
module.exports = {formatDate}