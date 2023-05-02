import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter()

  return(
    <main>
      <button type='button' onClick={()=>{router.push("/authors")}}>Autores</button>
      <button type='button' onClick={()=>{router.push("/users")}}>Usuarios</button>
      <button type='button' onClick={()=>{router.push("/books")}}>Libros</button>
    </main>
  )
}
