import { Router } from "oak"
import deleteUser from "./delete/delete.ts"
import getBooks from "./get/getBooks.ts"
import getAuthors from "./get/getAuthors.ts"
import getUsers from "./get/getUsers.ts"
import getUser from "./get/getUser.ts"
import getAuthor from "./get/getAuthor.ts"
import getBook from "./get/getBook.ts"
import status from "./get/status.ts"
import addAuthor from "./post/addAuthor.ts"
import addBook from "./post/addBook.ts"
import addUser from "./post/addUser.ts"
import updateCart from "./put/updateCart.ts"


const router = new Router()
router
    .get("/", status)
    .get("/getUser/:param", getUser)
    .post("/addUser", addUser)
    .delete("/deleteUser/:id", deleteUser)
    .post("/addAuthor", addAuthor)
    .post("/addBook", addBook)
    .put("/updateCart", updateCart)
    .get("/getBooks", getBooks)
    .get("/getAuthors", getAuthors)
    .get("/getUsers", getUsers)
    .get("/getAuthor/:param", getAuthor)
    .get("/getBook/:param", getBook)


export default router