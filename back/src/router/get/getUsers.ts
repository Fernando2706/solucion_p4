import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import User from "../../model/user.ts"
import { isValidObjectId } from "mongoose"
import { getQuery } from "helpers-oak"

type context = RouterContext<"/getUsers", {
    param: string;
} & Record<string | number, string | undefined>, Record<string, any>>

interface IRequest {
    title?: string
    page?: number
}

const getUsers = async (ctx: context) => {
    const params: IRequest = getQuery(ctx) as any
    const page = params.page || 0

    const users = await User.find({})
        .limit(10)
        .skip(10 * page)
        

    ctx.response.status = 200
    ctx.response.body = {
        "users": users
    }

}


export default getUsers