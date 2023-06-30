import express from 'express'
import http from 'http'
import Router from './route/index.js'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const port = 3001
const router = new Router()

app.use(express.json())
app.use(cors())
router.routing(app)
server.listen(port)

console.log(`==> API server is running on http://localhost:${port}`)