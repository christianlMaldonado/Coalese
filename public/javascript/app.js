const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static('./public'))

app.use(morgan('short'))

app.post('/user_create', (req, res) => {
    const name = req.body.create_name
    const email = req.body.create_email

    const queryString = "INSERT INTO user (first_name, email) VALUES (?,?)"
    getConnection().query(queryString, [name, email], (err, result, fields) => {
        if (err) {
            console.log("Failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }
        console.log("Inserted a new user with id:", results.insert)
        res.end()
    })

    app.get('user/:id', (req, res) => {
        console.log("fetching user with id: " + req.params.id)

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: ''
        })

        app.post('/register_create', (req, res) => {
            const name = req.body.create_name
            const email = req.body.create_email

            const queryString = "INSERT INTO registor (name_name, email) VALUES (?,?)"
            getConnection().query(queryString, [name, email], (err, result, fields) => {
                if (err) {
                    console.log("Failed to register new user: " + err)
                    res.sendStatus(500)
                    return
                }
                console.log("registered new user with id:", results.insert);
                res.end()
            })

            res.end()
        })



        fetch('https://reqres.in/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'user 1'
                })
            }).then(res => {
                return res.json()
            })
            .then(data => console.log(data))
            .catch(error => console.log('ERROR'))



        $(".delete-user").on("click", function (event) {
            var id = $(this).data("id");

            // Send the DELETE request.
            $.axios("/api/user/" + id, {
                type: "DELETE"
            }).then(function () {
                console.log("deleted user", id);
                // Reload the page to get the updated list
                location.reload();
            });
        });
    })
})
