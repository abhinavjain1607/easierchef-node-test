const express = require('express')
const pg = require('pg')

const app = express()

const pool = new pg.Pool()

const queryHandler = (req, res, next) => {
  console.log("query handler", req, res, next)
  pool.query(req.sqlQuery).then((r) => {
    return res.json(r.rows || [])
  }).catch(next)
}

app.get('/', (req, res) => {
  console.log('then welcome')
  res.send('Welcome')
})

app.post('/user', (req, res, next) => {
  res.status(201).send({ message: 'User created successfully' });
}, queryHandler)

app.get('/user/:id', (req, res, next) => {
  res.send({ data: { id: 1, name: 'Abhinav' } });
}, queryHandler)

app.get('/user', (req, res, next) => {
  res.send({ data: [
    { id: 1, name: 'Abhinav' },
    { id: 2, name: 'Mohamed' },
    { id: 3, name: 'EasierChef' }
  ] });
}, queryHandler)

app.put('/user/:id', (req, res, next) => {
  res.send({ data: { id: 1, name: 'Abhinav Jain' } });
}, queryHandler)

app.delete('/user/:id', (req, res, next) => {
  res.send({ message: 'User deleted successfully' });
}, queryHandler)

app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 8080}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})
