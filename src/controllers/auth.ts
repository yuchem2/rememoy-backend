import asyncify from 'express-asyncify'
import express, { Request, Response } from 'express'
import { encodeRSA, getSymmetricKey, publicKey } from '@/services/keyManager'

const router = asyncify(express.Router())
router.get('/secret', async (req: Request, res: Response) => {
    // TODO: add middleware to validate request authorization
    const target = encodeRSA(getSymmetricKey().toString('hex'))
    res.status(200).json({ secret: publicKey.toString(), target: target })
})

export default router
