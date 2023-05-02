import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import Book from "../../model/books.ts"
import { isValidObjectId } from "mongoose"
import { getQuery } from "helpers-oak"

type context = RouterContext<"/getBook/:param", {
    param: string;
} & Record<string | number, string | undefined>, Record<string, any>>

const getBook = async (ctx: context) => {
    const param = ctx.params.param
    const isValid = isValidObjectId(param);
    if(!isValid) throw new HttpError(400, "Bad Reques")
    const book = await Book.findOne({
        _id: param
    });
    if (!book) throw new HttpError(404, "book not found")
    ctx.response.status = 200
    ctx.response.body = book.toJSON()
}


export default getBook