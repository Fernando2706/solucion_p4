import { useLoading } from "@/hooks/useLoading";
import { Author } from "@/model/Author";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Authors() {
  const router = useRouter();
  const {authors} = useAuthors()
  return (
    <main>
        <button type="button" onClick={()=>{router.push("/authors/create")}}>Crear Autor</button>
      <Grid>
        {authors.map((author) => {
            return (
                <Link href={`/authors/${author._id}`}>
                <h2 key={author._id}>{author.name}</h2>
                </Link>
            )
        })}
      </Grid>
    </main>
  );
}
const Grid = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`

const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const { showLoading, clearLoading } = useLoading();

  const getAuthors = async () => {
    try {
      showLoading();
      const { data } = await axios.get("http://localhost:3002/getAuthors");
      setAuthors(data.authors ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      clearLoading();
    }
  };

  useEffect(()=>{
    getAuthors()
  },[])

  return {
    authors,
    getAuthors,
  };
};
