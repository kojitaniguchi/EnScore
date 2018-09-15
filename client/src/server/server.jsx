import "isomorphic-fetch"
import promise from 'es6-promise'

promise.polyfill()

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

const app = express()

app.use(express.static('dist/client/'))

// start listen
app.listen(process.env.PORT || 5000, () => {
  console.log('SSR app listening on port 5000!')
})
