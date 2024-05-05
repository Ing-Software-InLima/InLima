"use client";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React from 'react';
import './css/1.css';
import Box from '@mui/material/Box';
import Link from 'next/link'
import { useState } from "react"


export default function LoginPage(){

    const [state, setState] = useState(
        { usuario: "", contrasena: "" }
      )

    
      //CONSULTA API PARA VALIDAR SI ES USUARIO O ADMINISTRADOR (CASO CONTRARIO, EL ERROR SE EVIDENCIA EN EL MENSAJE)
      function mngmtChange(e) {
        console.log(e.target.name, e.target.value)
        setState({ ...state, [e.target.name]: e.target.value })
      }

      const validarLogeo = async (e) => {
        e.preventDefault();
        const { usuario, contrasena } = state;
    
        try {
          const response = await fetch('/api/login/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:
              JSON.stringify(state),
          });
          const data = await response.json();
          const { success } = data
          if (success) {
            const { tipo_usuario } = data;
            if (tipo_usuario === "administrador") {
              const userData = { usuario }; // Objeto que contiene el nombre de usuario
              localStorage.setItem("usuario", JSON.stringify(userData));
              router.push(`/admin/paginaPrincipalAdmin`);
              //router.push(`/blog/admin/${usuario}/paginaPrincipalAdmin`);
            } else {
              const userData = { usuario }; // Objeto que contiene el nombre de usuario
              localStorage.setItem("usuario", JSON.stringify(userData));
              router.push(`/alumno/paginaPrincipalAlumno`);
              //router.push(`/blog/alumno/${usuario}/paginaPrincipalAlumno`);
            }
          } else {
            alert(data.message || 'Error al autenticar');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
          alert('Error al realizar la solicitud');
        }
      };

  
    return <body>
    


   
    <div class= "formulario">
    <img src="/inlima.png" alt="InLima " style={{width: "110px", height: "auto"}}/>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30ch' },
        ml: 5,
        mt: 2, 
        mb: 2,
      }}
      noValidate
      autoComplete="off"
    >
    <div class= "texto"><TextField id="outlined-basic" label="Usuario" variant="outlined" /></div>
    <div class= "texto"><TextField id="outlined-basic" label="Contraseña" variant="outlined" /></div>
    </Box>
    <div class="recordar"> <a href="/reset">¿Olvidaste tu contraseña?</a></div>
    <Button
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
   
    </body>
    
        
         
}
