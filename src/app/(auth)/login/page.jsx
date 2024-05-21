"use client";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React from 'react';
import './css/1.css';
import Box from '@mui/material/Box';
import Link from 'next/link'
import { useState } from "react"
import Input from '@mui/material/Input';
import { useRouter } from 'next/router';
import db_users from '@/api/usuario';


export default function LoginPage() {

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const User = {
      email: correo,
      password: contraseña
    };
    try {
      const response = await db_users.iniciarSesion(User);
      console.log("singin: ", response)
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error al conectar');
    }
  };

  return <body >
    <form onSubmit={handleSubmit}>
      <div class="formulario"  >

        <img src="/inlima.png" alt="InLima " style={{ width: "110px", height: "auto" }} />
        <Box

          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
            ml: 5,
            mt: 2,
            mb: 2,
          }}
          noValidate
          autoComplete="off"

        >
          <div class="texto">
            <TextField id="outlined-basic" label="Correo" variant="outlined"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            /></div>

          <div class="texto">
            <TextField id="outlined-basic" label="Contraseña" variant="outlined"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            /></div>
        </Box>

        <div class="recordar"> <a href="/reset">¿Olvidaste tu contraseña?</a></div>

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

        <div class="registrarse">¿No tienes una cuenta? <a href='/register'>Regístrate</a></div>
      </div>
    </form>
  </body>



}
