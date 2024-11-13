import { config } from 'dotenv'
import * as process from 'process'

config()

export const {
    NODE_ENV,
    DB_URI,
    DB_NAME,
    RSA_PRIVATE_KEY_PATH,
    RSA_PUBLIC_KEY_PATH,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL,
    CLIENT_URL,
} = process.env
export const PORT = Number.parseInt(process.env.PORT) || 5000
