const axios = require('axios').default;


axios.get("${https://arcane-woodland-29279.herokuapp.com}","https://api.yelp.com/v3/businesses/{id}", {

    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    },
    params: {
        term: "restaurant",
        location: "Monterey",
        radius: 32000,
        limit: 10,
    }
})
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log ('error')
    })