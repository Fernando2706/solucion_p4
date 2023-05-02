import { useLoading } from "@/hooks/useLoading";
import { Author } from "@/model/Author";
import { User } from "@/model/User";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser(id as string);
  return <main>
    {user && <>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
    </>}
  </main>;
}



const useUser = (id: String) => {
  const [user, setUser] = useState<User>();
  const { showLoading, clearLoading } = useLoading();

  const getAuthors = async () => {
    try {
      console.log(id);
      showLoading();
      const { data } = await axios.get(`http://localhost:3002/getUser/${id}`);
      setUser(data);
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
    user,
    getAuthors,
  };
};
