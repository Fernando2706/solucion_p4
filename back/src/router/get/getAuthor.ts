import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import Author from "../../model/author.ts"
import { isValidObjectId } from "mongoose"
import { getQuery } from "helpers-oak"

type context = RouterContext<"/getAuthor/:param", {
    param: string;
} & Record<string | number, string | undefined>, Record<string, any>>

const getAuthor = async (ctx: context) => {
    const param = ctx.params.param
    const isValid = isValidObjectId(param);
    if(!isValid) throw new HttpError(400, "Bad Reques")
    const author = await Author.findOne({
        _id: param
    });
    if (!author) throw new HttpError(404, "author not found")
    ctx.response.status = 200
    ctx.response.body = author.toJSON()
}


export default getAuthor