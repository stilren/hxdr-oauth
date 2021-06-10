var express = require('express')
const axios = require('axios');

var app = express()
const port = 3000

var hxdrConf = {
  clientId: 'XXXXXX',
  accessTokenUri: 'https://hxdr-uat-dr-userpool-cgn.auth.eu-west-1.amazoncognito.com/oauth2/token',
  authorizationUri: 'https://hxdr-uat-dr-userpool-cgn.auth.eu-west-1.amazoncognito.com/oauth2/authorize',
  redirectUri: 'http://localhost:3000/auth/hxdr/callback',
  scopes: ['profile', 'openid', 'https://uat-hxdr.com/subscriptions']
}

app.get('/', (req, res) => {
    var authUri = `${hxdrConf.authorizationUri}?response_type=code&redirect_uri=${hxdrConf.redirectUri}&client_id=${hxdrConf.clientId}&scope=${hxdrConf.scopes.join('+')}`
    res.redirect(authUri)
})

app.get('/auth/hxdr/callback', async (req, res) => {
  var code = req.originalUrl.split('=')[1]
  axios.defaults.headers.common = {
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Accept-Encoding' : 'gzip, deflate, br'
  }
  try {
    result = await axios.post(`${hxdrConf.accessTokenUri}?grant_type=authorization_code&code=${code}&redirect_uri=${hxdrConf.redirectUri}&client_id=${hxdrConf.clientId}&scope=${hxdrConf.scopes.join('+')}`)
    return res.send(JSON.stringify(result.data))
  } catch (error) {
    console.log(error)
  }
  return res.send("Some error")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})