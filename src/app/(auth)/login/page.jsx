"use client";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link'
import { useState } from "react"
import Input from '@mui/material/Input';
import { useRouter } from 'next/navigation';
import db_users from '@/api/usuario';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export default function LoginPage() {

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const router = useRouter();

  const ClientId = "118418831653-bk8f8eb2pjpjj0n3u2eri4kb76gutu8v.apps.googleusercontent.com";



  const handleSubmit = async (event) => {
    event.preventDefault();
    const User = {
      email: correo,
      password: contraseña
    };
    try {
      const response = await db_users.iniciarSesion(User);
      console.log("singin: ", response)
      if (response.status == 200) {
        router.push('/home')
      }
      else {
        console.log("NO")
      }


    } catch (error) {
      console.error('Error:', error.message);
      alert('Error al conectar');
    }
  };

  return (
    <div class="loquequieras bg-gradient-to-br from-[#BF2441] to-[#F2F2F2] h-screen m-0 p-0 font-montserrat">
      <form onSubmit={handleSubmit}>
        <div class="formulario absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg"  >

          <img src="/inlima.png" class="relative left-1/2 transform -translate-x-1/2 translate-y-2.5" alt="InLima " style={{ width: "110px", height: "auto" }} />
          <Box

            sx={{
              '& .MuiTextField-root': { m: 1, width: '30ch' },
              ml: 1,
              mt: 3,
              mb: 2,
            }}
            noValidate
            autoComplete="off"

          >
            <div class="text-center pb-3 pt-3 border-t border-silver">
              <TextField id="outlined-basic" label="Correo" variant="outlined"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              /></div>

            <div class="text-center pb-3 ">
              <TextField id="outlined-basic" label="Contraseña" variant="outlined"
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              /></div>
          </Box>



          <div class="recordar text-center text-[#BF2441] cursor-pointer"> <a href="/reset">¿Olvidaste tu contraseña?</a></div>

          <Button type='submit'
            sx={{
              width: '35ch',
              ml: 8,
              mt: 2,
              mb: 2
              , backgroundColor: '#BF2441', color: 'white', borderRadius: '26px',
              '&:hover': {
                backgroundColor: '#a52039',
                color: 'white',

              }
            }}>Iniciar sesión</Button>

          <div class="registrarse text-center my-5 text-lg text-black">¿No tienes una cuenta? <a href='/register' class="text-[#878ceb]">Regístrate</a></div>
        </div>
      </form>
    </div>
  )


}
