"use client";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React from 'react';
import './css/1.css';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function LoginPage(){

    return <body>
    <div class= "logo"><img src="/inlima2.png" alt="InLima " style={{width: "110px", height: "auto"}}/></div>
    <div class= "formulario">
    <img src="/candado.png" alt="InLima " style={{width: "110px", height: "auto", marginBottom: "20px"}}/>
    
    <div class= "textito">¿Tienes problemas para iniciar sesión?</div>
    <div class= "textito2">Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</div>
 
   <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30.6ch' },
        ml: 5,
        mt:2,
      }}
      noValidate
      autoComplete="off"
    >
    <div class= "texto"><TextField id="outlined-basic" label="Correo electrónico" variant="outlined" /></div>
  
    </Box>
    
 
    <Button
    sx={{  width: '35ch',
        ml: 8,
        mt: 2, 
        mb: 2
        , backgroundColor: '#BF2441', color: 'white', borderRadius: '26px',
        '&:hover': {
            backgroundColor: '#a52039', 
            color: 'white', 
          }}}>Enviar enlace</Button>

<div class= "textito3">o</div>
<div class= "centrado"><a  href="/register">Crea una cuenta nueva </a></div>
<div class= "centradoo"><a  href="/login">Volver a inicio de sesión </a></div>
    
    </div>
   
    </body>
    
        
         
}
