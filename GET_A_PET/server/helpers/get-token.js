const getToken = (req) => {
  const authHeader = req.headers.authorization
  //console.log("req.body.headers.Authorization = " + req.body.headers.Authorization)
  const token = authHeader.split(" ")[1]
  console.log(`Estamos em get-token e o authHeader é ${authHeader}`)
  return token
}

module.exports = getToken
