import express, { Express } from 'express'
import http from 'http'
import cors from 'cors'
import Router from './router'

const app: Express = express()
const server: any = http.createServer(app)
const port: number = 3001
const router: Router = new Router()

app.use(express.json())
app.use(cors())

router.routing(app)

server.listen(port, () => {
	console.log(`==> API server is running on http://localhost:${port}`)
})
