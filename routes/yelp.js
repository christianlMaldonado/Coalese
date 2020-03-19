
//'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key
const apiKey ="4_HB_VGhPn1LU1NFkdIxl3fBex0MDJ62qdim-Ky4QPRFch2jqOh4GUgJsBV08gi8scp3yjUXiMtCgKRx_hX8R-ARDZjoAfevr-Ob_qWbgVV7HT_uQUGtPGOMXiptXnYx";

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca',
  radius: 20000
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses;
  console.log(firstResult);
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});



// const axios = require('axios').default;
// axios.get("${https://arcane-woodland-29279.herokuapp.com}","https://api.yelp.com/v3/businesses/{id}", {
//     headers: {
//         Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
//     },
//     params: {
//         term: "restaurant",
//         location: "Monterey",
//         radius: 32000,
//         limit: 10,
//     }
// })
//     .then((res) => {
//         console.log(res)
//     })
//     .catch((err) => {
//         console.log ('error')
//     })


