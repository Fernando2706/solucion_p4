import { useLoading } from "@/hooks/useLoading";
import { Author } from "@/model/Author";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import styled from "styled-components";

type FormData = {
    author: string
    pages: number
    title: string
}

export default function CreateBook() {
  const router = useRouter();
  const {createBook} = useCreateBook()
  const {register, handleSubmit} = useForm<FormData>()
  const onSubmit = async (data:FormData) => {
    await createBook(data)
  }
  return (
    <main>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                required
                {...register("author")}
                placeholder="id de mongo"
            />
            <input 
                required
                {...register("pages")}
                placeholder="124"
                type="number"
            />
            <input 
                required
                {...register("title")}
                placeholder="El libro de JS"
                type="text"
            />
            <button type="submit">Añadir libro</button>
        </form>
    </main>
  );
}
const Grid = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`

const useCreateBook = () => {
  const { showLoading, clearLoading } = useLoading();

  const createBook = async (data: FormData) => {
    try {
      showLoading();
      await axios.post("http://localhost:3002/addBook", {
        ...data
      });
      toast.info("Libro añadido")
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    } finally {
      clearLoading();
    }
  };

  return {
    createBook,
  };
};
