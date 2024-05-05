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



export default function LoginPage(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const response = await fetch("/login.json");
          if (!response.ok) {
            throw new Error('Error fetching credentials');  
          }  
          const credentials = await response.json(); 
          const validUser = credentials.find(user => user.username === username && user.password === password);
          if (validUser) {
            window.location.href = "/complaint"; 
          } else {
            alert('Usuario o contraseña incorrecta');
          }
        } catch (error) {
          console.error('Error:', error.message);
          alert('Error al conectar');
        }
      };
  
    return <body >
    <form onSubmit={handleSubmit}>
    <div class= "formulario"  >
  
    <img src="/inlima.png" alt="InLima " style={{width: "110px", height: "auto"}}/>
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
    <div class= "texto">
      <TextField id="outlined-basic" label="Usuario" variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
               /></div>

    <div class= "texto">
      <TextField id="outlined-basic" label="Contraseña" variant="outlined" 
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    /></div>
    </Box>

    <div class="recordar"> <a href="/reset">¿Olvidaste tu contraseña?</a></div>

    <Button type= 'submit'
    sx={{  width: '35ch',
        ml: 8,
        mt: 2, 
        mb: 2
        , backgroundColor: '#BF2441', color: 'white', borderRadius: '26px',
        '&:hover': {
            backgroundColor: '#a52039', 
            color: 'white', 
            
          }}}>Iniciar sesión</Button>

    <div class= "registrarse">¿No tienes una cuenta? <a href='/register'>Regístrate</a></div>
    </div>
    </form>
    </body>
    
        
         
}
