import { useLoading } from "@/hooks/useLoading";
import { Author } from "@/model/Author";
import { Book } from "@/model/Book";
import { User } from "@/model/User";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { book, author } = useBook(id as string);
  return <main>
    {book && <>
        <h1>{book.title}</h1>
        <p>{book.ISBN}</p>
        <p>{book.pages}</p>
        {author && <p>Author: {author.name}</p>}
    </>}
  </main>;
}



const useBook = (id: String) => {
  const [book, setBook] = useState<Book>();
  const [author, setAuthor] = useState<Author>();

  const { showLoading, clearLoading } = useLoading();

  const getAuthors = async () => {
    try {
      console.log(id);
      showLoading();
      const { data } = await axios.get<Book>(`http://localhost:3002/getBook/${id}`);
      const { data: dataAuthor } = await axios.get(`http://localhost:3002/getAuthor/${data.author}`);
      setAuthor(dataAuthor);
      setBook(data);
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
    book,
    author
  };
};
