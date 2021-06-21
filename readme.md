# Get started

Input client id in index.js
Run:

``` 
npm install
node index.js
```
Go to http://localhost:3000 then

Go to https://uat-hxdr.com/graphql and paste your access_token ion the header
```
{
   "Authorization": "Bearer <access_token>"
}
```

Here is an example query to make sure you are authorized
```
query infome {infoMe{roles}}
```