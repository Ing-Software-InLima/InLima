"use client";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import React from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function LoginPage(){

    return <div class="Cuerpo m-0 p-0 font-montserrat bg-gradient-to-br from-[#BF2441] to-[#F2F2F2] h-screen">
    <div class="logo absolute pt-5 pl-24"><img src="/inlima2.png" alt="InLima " style={{width: "110px", height: "auto"}}/></div>
    <div class="formulario absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg">
    <img src="/candado.png" class="relative left-1/2 transform -translate-x-1/2 translate-y-2.5" alt="InLima " style={{width: "110px", height: "auto", marginBottom: "20px"}}/>
    
    <div class="textito text-center text-[#BF2441] pt-5 font-bold">¿Tienes problemas para iniciar sesión?</div>
    <div class="textito2 text-center text-black py-5 px-8 border-b border-silver">Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</div>
 
   <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30.6ch' },
        ml: 0,
        mt:2,
      }}
      noValidate
      autoComplete="off"
    >
    <div class="text-center p-0 "><TextField id="outlined-basic" label="Correo electrónico" variant="outlined" /></div>
  
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

<div class="textito3 relative text-center text-black py-5 border-l border-r border-silver">o</div>
<div class="centrado text-center text-[#BF2441] font-bold py-1.5 border-b border-silver"><a  href="/register">Crea una cuenta nueva </a></div>
<div class="centradoo text-center font-bold mx-2.5 my-2.5"><a  href="/login">Volver a inicio de sesión </a></div>
    
    </div>
   
    </div>
    
        
         
}
