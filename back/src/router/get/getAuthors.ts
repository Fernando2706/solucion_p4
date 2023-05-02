import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import Author from "../../model/author.ts"
import { isValidObjectId } from "mongoose"
import { getQuery } from "helpers-oak"

type context = RouterContext<"/getAuthors", {
    param: string;
} & Record<string | number, string | undefined>, Record<string, any>>

interface IRequest {
    title?: string
    page?: number
}

const getAuthors = async (ctx: context) => {
    const params: IRequest = getQuery(ctx) as any
    const page = params.page || 0

    const authors = await Author.find({})
        .limit(10)
        .skip(10 * page)
        

    ctx.response.status = 200
    ctx.response.body = {
        "authors": authors
    }

}


export default getAuthors