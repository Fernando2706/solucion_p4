import { useLoading } from "@/hooks/useLoading";
import { Author } from "@/model/Author";
import { Book } from "@/model/Book";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function DetailAuthor() {
  const router = useRouter();
  const { id } = router.query;
  const { author,books } = useAuthor(id as string);
  return <main>
    {author && <>
        <h1>{author.name}</h1>
        <p>Libros:</p>
        {books.length === 0 ? (
            <h2>No hay libros</h2>
        ) : (
            <ul>
                {books.map(book => {
                    return (
                        <li key={book.ISBN}>
                            <p>{book.title}</p>
                        </li>
                    )
                })}
            </ul>

        ) }
    </>}
  </main>;
}

const useAuthor = (id: String) => {
  const [author, setAuthor] = useState<Author>();
  const [books, setBooks] = useState<Book[]>([])
  const { showLoading, clearLoading } = useLoading();

  const getAuthors = async () => {
    try {
      console.log(id);
      showLoading();
      const { data } = await axios.get<Author>(`http://localhost:3002/getAuthor/${id}`);
      setAuthor(data);
      clearLoading();
      const books = []
      for (const book in data.books) {
        const { data:dataBooks } = await axios.get<Book>(`http://localhost:3002/getBook/${data.books[book]}`);
        books.push(dataBooks)
      }
      setBooks(books)
    } catch (error) {
      console.error(error);
    } finally {
      clearLoading();
    }
    
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return {
    author,
    getAuthors,
    books
  };
};
