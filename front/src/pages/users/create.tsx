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
    email: string
    password: string
}

export default function CreateUser() {
  const router = useRouter();
  const {createUser} = useCreateUsers()
  const {register, handleSubmit} = useForm<FormData>()
  const onSubmit = async (data:FormData) => {
    await createUser(data)
  }
  return (
    <main>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                required
                {...register("name")}
                placeholder="Fernando Murua Alcazar"
            />
            <input 
                required
                {...register("email")}
                placeholder="usuario@ejemplo.com"
                type="email"
            />
            <input 
                required
                {...register("password")}
                placeholder="Tu contraseña"
                type="password"
            />
            <button type="submit">Añadir usuario</button>
        </form>
    </main>
  );
}
const Grid = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`

const useCreateUsers = () => {
  const { showLoading, clearLoading } = useLoading();

  const createUser = async (data: FormData) => {
    try {
      showLoading();
      await axios.post("http://localhost:3002/addUser", {
        ...data
      });
      toast.info("Usuario añadido")
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    } finally {
      clearLoading();
    }
  };

  return {
    createUser,
  };
};
