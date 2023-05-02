import { useLoading } from "@/hooks/useLoading";
import { Author } from "@/model/Author";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import styled from "styled-components";

type FormData = {
    name: string
}

export default function CreateAuthor() {
  const router = useRouter();
  const {getAuthors} = useCreateAuthors()
  const {register, handleSubmit} = useForm<FormData>()
  const onSubmit = async (data:FormData) => {
    await getAuthors({authorName: data.name})
  }
  return (
    <main>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                required
                {...register("name")}
                placeholder="Fernando Murua Alcazar"
            />
            <button type="submit">Añadir autor</button>
        </form>
    </main>
  );
}
const useCreateAuthors = () => {
  const { showLoading, clearLoading } = useLoading();

  const getAuthors = async ({authorName}: {
    authorName: string
  }) => {
    try {
      showLoading();
      await axios.post("http://localhost:3002/addAuthor", {
        name: authorName
      });
      toast.info("Autor añadido")
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    } finally {
      clearLoading();
    }
  };

  return {
    getAuthors,
  };
};
