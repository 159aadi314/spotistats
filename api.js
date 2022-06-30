const querystring = require('querystring');
const { curly } = require('node-libcurl');

const { statusCode, data, headers } = await curly.post('http://httpbin.com/post', {
  postFields: querystring.stringify({
    field: 'value',
  }),
  // can use `postFields` or `POSTFIELDS`
})
