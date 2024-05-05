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
import { useState } from "react"

export default function RegisterPage(){
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState(''); 
  const [contraseña, setContraseña] = useState('');
  const [sexo, setSexo] = useState(''); 


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/login.json');
      if (!response.ok) {
        throw new Error('Error fetching credentials');
      }

      const credentials = await response.json();

  
      const existingUser = credentials.find(user => user.correo === correo);
      if (existingUser) {
        alert('El correo electrónico ya existe', { variant: 'error' }); 
        return
      }


      const newUser = {
        nombre,
        apellido,
        correo,
        contraseña, 
        sexo,
      };

    
      credentials.push(newUser);


      const updatedCredentials = JSON.stringify(credentials, null, 2); 
      await fetch('/login.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: updatedCredentials
      });

    } catch (error) {
      console.error('Error:', error.message);
      alert('Error durante el registro', { variant: 'error' }); 
    }
  };


    return <body>
    <form onSubmit={handleSubmit}>
    <div class= "formulario">
    <img src="/inlima.png" alt="InLima " style={{width: "110px", height: "auto"}}/>
    
    <div class= "textito">Regístrate para realizar quejas y sugerencias</div>
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '14.5ch' },
        ml: 5,
        mt: 2, 
      }}
      noValidate
      autoComplete="off"
    >
    <div class= "texto"><TextField id="outlined-basic" label="Nombre" variant="outlined"  value={nombre}
    onChange={(e) => setNombre(e.target.value)} />
    <TextField id="outlined-basic" label="Apellido" variant="outlined" value={apellido}
    onChange={(e) => setApellido(e.target.value)} /></div>
    </Box>

    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30.6ch' },
        ml: 5,
      }}
      noValidate
      autoComplete="off"
    >
    <div class= "texto"><TextField id="outlined-basic" label="Correo electrónico" variant="outlined"    value={correo}
    onChange={(e) => setCorreo(e.target.value)} /></div>
    <div class= "texto"><TextField id="outlined-basic" label="Contraseña" variant="outlined" type="password"
    value={contraseña}
    onChange={(e) => setContraseña(e.target.value)}/></div>
    
    <FormControl style={{ marginLeft: '10px' , marginTop: '10px'}}>
      <FormLabel id="demo-row-radio-buttons-group-label" >Sexo</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        style={{ marginLeft: '20px' }}
        value={sexo} 
        onChange={(event) => setSexo(event.target.value)}
      >
        <FormControlLabel value="mujer" control={<Radio />} label="Mujer" />
        <FormControlLabel value="hombre" control={<Radio />} label="Hombre" />
        <FormControlLabel value="otro" control={<Radio />} label="Otro" />
      </RadioGroup>
    </FormControl>
  
    </Box>

    <Button type='submit'
    sx={{  width: '35ch',
        ml: 8,
        mt: 2, 
        mb: 2
        , backgroundColor: '#BF2441', color: 'white', borderRadius: '26px',
        '&:hover': {
            backgroundColor: '#a52039', 
            color: 'white', 
          }}}>Regístrate</Button>
    <div class= "registrarse">¿Ya tienes una cuenta? <a href='/login'>Inicia sesión</a></div>
    
    </div>
    </form>
    </body>
    
        
         
}
