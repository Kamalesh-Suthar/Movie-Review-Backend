const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const bcrypt = require('bcrypt')
require('./database/Mongoose')

const User = require('./assets/models/User')
const Movie = require('./assets/models/Movie')
const Review = require('./assets/models/Review')


app.use(express.json())
app.use(cors())


const saltRounds = 10


app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

app.post('/signup' , (req, res) => {
    let password = req.body.password

    bcrypt.hash(String(password), saltRounds)
        .then((hash) => {
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })

            newUser.save()
                .then((response) => {
                    res.status(201).send('User Registered Successfully')
                })
                .catch((err) => {
                    res.status(400)
                })
        })
})

app.post('/user', (req, res) => {
    let password = req.body.password

    User.findOne({ email: req.body.email})
        .then((User) => {
            bcrypt.compare(String(password), User.password, (err, result) => {
                if(result) {
                    res.status(200).send({
                        user: User,
                        isValid: true
                    })
                } else {
                    res.send({
                        isValid: false
                    })
                }
            })
        })
})

app.post('/add-movie', (req, res) => {

    let newMovie = new Movie(req.body)

    newMovie.save().then((result) => {
        res.status(201).send('Movie Added Successfully!')
    }).catch(err => {
        res.status(401).send('Unsuccessful')
    })
})

app.get('/movies', (req, res) => {
    Movie.find({})
        .then((data) => {
            console.log(data)
            if(data.length > 0) {
                res.status(200).send(data)
            }
        })
        .catch((err) => {
            res.status(404).send({
                error: err,
                message: "No Movies found in database."
            })
        })
})

app.get('/movie/:id', (req, res) => {
    Movie.findById(req.params.id)
        .then(response => {
            res.status(200).send(response)
        })
})

app.post('/post-review', (req, res) => {

    let today = new Date()

    let dd = today.getDate()
    let mm = today.getMonth()
    let yyyy = today.getFullYear()

    let createdOn = `${dd}-${mm}-${yyyy}`

    User.findById(req.body.userId)
        .then((response) => {

            let newReview = new Review({
                title: req.body.title,
                description: req.body.description,
                createdOn: createdOn,
                movieId: req.body.movieId,
                userId: req.body.userId,
                userName: req.body.name
            })

            newReview.save().then((result) => {
                res.status(201).send('Review Added Successfully!')
            }).catch(err => {
                res.status(401).send('Unsuccessful')
            })
        })
})

app.get('/reviews/:id', (req, res) => {
    console.log(req.params)
    Review.find({movieId : req.params.id})
        .then(result => {
            res.status(200).send(result)
        })
})
