import express from 'express'
require('express-async-errors')
import { json } from 'body-parser'
import mongoose from 'mongoose'


import { currentUserRouter } from './routes/currentuser'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', () => {
    throw new NotFoundError;
})

app.use(errorHandler)

const start = async () => {
    try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    })
    console.log('connected to mongodb')
    } catch (err) {
        console.log(err)
    }

    app.listen(3000, () => {
        console.log('listening on 3000')
    })

}

start()

