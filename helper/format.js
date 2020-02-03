function responseApi(data,message){
  const response = {
    data : data || null,
    message : message || null
  }
  return response
}

module.exports = { responseApi }