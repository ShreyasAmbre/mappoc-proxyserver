const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios');
const WebSocket = require('ws'); 

const app = express();
app.use(bodyParser.json());

app.post('/api/token', async(req, res) => {
    try {
        const url = `${req.body.domain}${req.body.url}` ;
        // console.log("URL =>", url)

        const reqObj = {
            grant_type: req.body.grant_type,
            client_id: req.body.client_id,
            client_secret: req.body.client_secret,
        };

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        
        const response = await axios.post(url, reqObj, config);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling MapmyIndia API:', error);
        res.status(500).json({ error: 'Failed to call MapmyIndia API' });
    }
})

app.post('/api/places', async (req, res) => {
      try {
        const url = `${req.body.url}${req.body.searchquery}` ;
        console.log(url)
        const config = {
          headers: {
            'Authorization': `Bearer ${req.body.token}`,
            'Content-Type': 'application/json'
          }
        };
    
        const response = await axios.get(url, config);
        res.json(response.data);
      } catch (error) {
        console.error('Error calling MapmyIndia API:', error);
        res.status(500).json({ error: 'Failed to call MapmyIndia API' });
      }
});

app.listen(3000, () => {
    console.log('Proxy server listening on port 3000');
});
