const express =require('express');  // express module
const querystring = require('querystring'); // querystring module
const app= express();   // express app

const axios=require('axios');   // axios module

app.get('/',(req,res)=>{    // get request
    res.send('Hello World');

})

require('dotenv').config();     // dotenv module to read .env file
const ClientID=process.env.Client_ID;   // Client_ID from .env file
const ClientSecret=process.env.Client_Secret;   // Client_Secret from .env file
const RedirectURI=process.env.Redirect_URI;  // Redirect_URI from .env file

const generateRandomString = (length) => {  // function to generate random string
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const stateKey = 'spotify_auth_state';  // key to store state in session

app.get('/login',(req,res)=>{   // get request to login
    const state = generateRandomString(16); // generate random string
    res.cookie(stateKey, state);    // set cookie with state

    const queryParams = querystring.stringify({ // query params to send to spotify
        client_id:ClientID,
        redirect_uri:RedirectURI,
        response_type:'code',
        state:state,
        scope:'user-read-private user-read-email',
        show_dialog:true
    })
    res.redirect('https://accounts.spotify.com/authorize?'+queryParams);  // redirect to spotify login page
})

app.get('/callback',(req,res)=>{    // get request to callback
    const code=req.query.code;  // code from query string
    
    axios({
        method:'post',
        url:'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type:'authorization_code',
            code:code,
            redirect_uri:RedirectURI,
        }),
        headers:{
            'content-type':'application/x-www-form-urlencoded',
            'Authorization': `Basic ${new Buffer.from(`${ClientID}:${ClientSecret}`).toString('base64')}`
            
        },
    })
    .then(response => {
        if (response.status === 200) {
    
          const { access_token, token_type } = response.data;
    
          const { refresh_token } = response.data;

          axios.get(`http://localhost:8888/refresh_token?refresh_token=${refresh_token}`)
            .then(response => {
              res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
            })
            .catch(error => {
              res.send(error);
            });
    
        } else {
          res.send(response);
        }
      })
      .catch(error => {
        res.send(error);
      });
})

app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${ClientID}:${ClientSecret}`).toString('base64')}`,
      },
    })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.send(error);
      });
  });

const port =8888;
app.listen(port,()=>{   // listen to port
    console.log('Server is running on port '+port);
})