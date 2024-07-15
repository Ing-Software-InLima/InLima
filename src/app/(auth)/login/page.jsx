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

  const [role, setRole] = useState(null);

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const router = useRouter();

  const ClientId = process.env.NEXT_PUBLIC_LOGIN_API;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const User = {
      email: correo,
      password: contraseña
    };
    try {
      const response = await db_users.iniciarSesion(User);
      if (response?.status == 200) {
        const role = await db_users.obtenerRol();
        setRole(role.data.rol);
        if(role.data.rol == 1){
          router.push('/home')
        }
        else{
          router.push('/gestion')
        }
      }
      else {
        alert("Credenciales incorrectas")
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error al conectar');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential;
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userEmail = decoded.email;

      const user = { email: userEmail };
      const response = await db_users.iniciarSesionGoogle(user);

      if (response?.status === 200) {
        router.push('/home');
      } else {
        router.push('/registerGoogle');
      }
    } catch (error) {
      console.error('Google Login Error:', error.message);
      alert('Error al conectar con Google');
    }
  };

  return (
    <div className="loquequieras h-screen m-0 p-0 font-montserrat" 
  style={{ 
    backgroundImage: "url('/fondo_login.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center"
  }}>
      <form onSubmit={handleSubmit}>
        <div className="formulario absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg"  >

          <img src="/inlima.png" className="relative left-1/2 transform -translate-x-1/2 translate-y-2.5" alt="InLima " style={{ width: "110px", height: "auto" }} />
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
            <div className="text-center pb-3 pt-3 border-t border-silver">
              <TextField id="outlined-basic" label="Correo" variant="outlined"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              /></div>

            <div className="text-center pb-3 ">
              <TextField id="outlined-basic" label="Contraseña" variant="outlined"
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              /></div>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <GoogleOAuthProvider clientId={ClientId}>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  var credentialResponseDecoded = jwtDecode(credentialResponse.credential)
                  console.log(credentialResponseDecoded)
                  handleGoogleLogin(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed')
                }}
              />
            </GoogleOAuthProvider>
          </div>

          <div className="recordar text-center text-[#BF2441] cursor-pointer"> <a href="/reset">¿Olvidaste tu contraseña?</a></div>

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

          <div className="registrarse text-center my-5 text-lg text-black">¿No tienes una cuenta? <a href='/register' className="text-[#878ceb]">Regístrate</a></div>
        </div>
      </form>
    </div>
  )


}
