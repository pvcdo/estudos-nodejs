const getToken = (req) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(" ")[1]
  console.log(`Estamos em get-token e o authHeader é ${authHeader}`)
  return token
}

module.exports = getToken
