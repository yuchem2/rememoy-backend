import http from 'http'
import express from 'express'
import compression from 'compression'
import hpp from 'hpp'
import helmet from 'helmet'
import cors from 'cors'

import { CLIENT_URL, NODE_ENV, PORT } from '@/config'
import { loggerMiddleware, logger } from '@/utils/logger'
import middlewares from '@/middlewares'
import controllers from '@/controllers'

export default class API {
    app: express.Application
    server: http.Server

    constructor() {
        this.app = express()

        this.setPreMiddleware()
        this.setController()
        this.setPostMiddleware()
    }

    setPreMiddleware() {
        this.app.use(helmet())
        this.app.use(
            cors({
                origin: `${CLIENT_URL}`,
                credentials: true,
                exposedHeaders: ['Authorization', 'Set-Cookie'],
            }),
        )
        this.app.use(compression())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(hpp())
        this.app.use(middlewares.request.requestId)
        this.app.use(loggerMiddleware)
    }

    setController() {
        this.app.use('/users', controllers.users)
        this.app.use('/auth', controllers.auth)
    }

    setPostMiddleware() {
        this.app.use(middlewares.error)
    }

    public listen() {
        this.server = this.app.listen(PORT, () => {
            logger.info(`🚀 App listening on the port: ${PORT} ENV: ${NODE_ENV}`)
        })
    }

    public async close(): Promise<void> {
        return new Promise((resolve) => {
            this.server.close(() => {
                resolve()
            })
        })
    }
}
