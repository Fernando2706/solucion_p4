import { useLoading } from "@/hooks/useLoading";
import { Author } from "@/model/Author";
import { Book } from "@/model/Book";
import { User } from "@/model/User";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Users() {
  const router = useRouter();
  const {books,nextPage,prevPage} = useBooks()
  return (
    <main>
        <button type="button" onClick={()=>{router.push("/books/create")}}>Crear Libro</button>
      <Grid>
        {books.map((book) => {
            return (
                <Link href={`/books/${book._id}`}>
                  <h2 key={book._id}>{book.title}</h2>
                </Link>
            )
        })}
        {books.length === 0 && (
<h1>No hay libros</h1>
        )}
      </Grid>
      <button type="button" onClick={nextPage}>Siguiente página</button>
      <button type="button" onClick={prevPage}>Página anterior</button>
    </main>
  );
}
const Grid = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
`

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0)
  const { showLoading, clearLoading } = useLoading();

  const getBooks = async () => {
    try {
      showLoading();
      const { data } = await axios.get(`http://localhost:3002/getBooks?page=${currentPage}`);
      setBooks(data.books ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      clearLoading();
    }
  };

  useEffect(()=>{
    getBooks()
  },[currentPage])

  function nextPage() {
    setCurrentPage(currentPage+1)
  }

  function prevPage() {
    if(currentPage > 0 ){

      setCurrentPage(currentPage-1)
    }
  }

  return {
    books,
    nextPage,
    prevPage
  };
};
