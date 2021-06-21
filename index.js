var express = require('express')
const axios = require('axios');

var app = express()
const port = 3000

var hxdrConf = {
  clientId: 'XXXXXX',
  accessTokenUri: 'https://hxdr-uat-dr-userpool-cgn.auth.eu-west-1.amazoncognito.com/oauth2/token',
  authorizationUri: 'https://hxdr-uat-dr-userpool-cgn.auth.eu-west-1.amazoncognito.com/oauth2/authorize',
  redirectUri: 'http://localhost:3000/auth/hxdr/callback',
  scopes: [
    'profile', 
    'openid', 
    'https://uat-hxdr.com/subscriptions',
    'https://uat-hxdr.com/baselayerstreamer',
    'https://uat-hxdr.com/graphiql',
    'https://uat-hxdr.com/vendor',
    'https://uat-hxdr.com/files',
    'https://uat-hxdr.com/baselayer',
    'https://uat-hxdr.com/studioapi',
    'https://uat-hxdr.com/graphql',
  ]
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
    return res.send(`<pre>${JSON.stringify(result.data,undefined,2)}</pre>`)
  } catch (error) {
    console.log(error)
  }
  return res.send("Some error")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})