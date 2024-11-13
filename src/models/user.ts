import mongoose from 'mongoose'
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserNotFoundException } from '@/types/errors'

export class User extends TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public oauthProvider: string

    @prop({ required: true })
    public oauthId: string

    @prop({ required: true, unique: true })
    public nickname: string

    @prop()
    public passwd: string

    public static async findByOauth(this: ReturnModelType<typeof User>, oauthProvider: string, oauthId: string): Promise<User> {
        return await this.findByFilter({ oauthProvider: oauthProvider, oauthId: oauthId })
    }

    public static async checkDuplicateId(this: ReturnModelType<typeof User>, id: string, provider: string): Promise<boolean> {
        const user = await this.findOne({ oauthId: id, oauthProvider: provider })
        return !user
    }

    public static async checkDuplicateNickname(this: ReturnModelType<typeof User>, nickname: string): Promise<boolean> {
        const user = await this.findOne({ nickname: nickname })
        return !user
    }

    private static async findByFilter(this: ReturnModelType<typeof User>, filter: object): Promise<User> {
        const user = await this.findOne(filter).exec()
        if (user) {
            return user
        } else {
            throw new UserNotFoundException()
        }
    }
}

export const UserModel = getModelForClass(User)
