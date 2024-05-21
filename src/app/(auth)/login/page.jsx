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
  
  const ClientId= "118418831653-bk8f8eb2pjpjj0n3u2eri4kb76gutu8v.apps.googleusercontent.com";


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const User = {
      email: correo,
      password: contraseña
    };
    try {
      const response = await db_users.iniciarSesion(User);
      console.log("singin: ", response)
      if(response.status == 200){
        router.push('/home')
      }
      else{
        console.log("NO")
      }
      
      
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error al conectar');
    }
  };

  return (
  <div className="loquequieras">
    <form onSubmit={handleSubmit}>
      <div className="formulario"  >

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
          <div className="texto">
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

        <GoogleOAuthProvider clientId="118418831653-bk8f8eb2pjpjj0n3u2eri4kb76gutu8v.apps.googleusercontent.com">
        <GoogleLogin
              onSuccess={credentialResponse => {
              console.log(credentialResponse)
              var credentialResponseDecoded = jwtDecode(credentialResponse.credential)
              console.log(credentialResponseDecoded)
              }}    
              onError={() => {
               console.log('Login Failed')
               }}
          />
        </GoogleOAuthProvider>  
        
        <div className="recordar"> <a href="/reset">¿Olvidaste tu contraseña?</a></div>

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

        <div className="registrarse">¿No tienes una cuenta? <a href='/register'>Regístrate</a></div>
      </div>
    </form>
  </div>
  )


}
