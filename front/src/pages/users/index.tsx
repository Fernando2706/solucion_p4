import { useLoading } from "@/hooks/useLoading";
import { Author } from "@/model/Author";
import { User } from "@/model/User";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Users() {
  const router = useRouter();
  const {users} = useUsers()
  return (
    <main>
        <button type="button" onClick={()=>{router.push("/users/create")}}>Crear Usuario</button>
      <Grid>
        {users.map((user) => {
            return (
                <Link href={`/users/${user._id}`}>
                  <h2 key={user._id}>{user.name}</h2>
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
    gap: 1rem;
`

const useUsers = () => {
  const [users, setAuthors] = useState<User[]>([]);
  const { showLoading, clearLoading } = useLoading();

  const getUsers = async () => {
    try {
      showLoading();
      const { data } = await axios.get("http://localhost:3002/getUsers");
      setAuthors(data.users ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      clearLoading();
    }
  };

  useEffect(()=>{
    getUsers()
  },[])

  return {
    users,
    getUsers,
  };
};
