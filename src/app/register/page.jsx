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
    
    <div class= "formulario">
    <img src="/inlima.png" alt="InLima " style={{width: "110px", height: "auto"}}/>
    
    <div class= "textito">Regístrate para realizar quejas y sugerencias</div>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '14.5ch' },
        ml: 5,
        mt: 2, 
      }}
      noValidate
      autoComplete="off"
    >
    <div class= "texto"><TextField id="outlined-basic" label="Nombre" variant="outlined" />
    <TextField id="outlined-basic" label="Apellido" variant="outlined" /></div>
    </Box>

    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30.6ch' },
        ml: 5,
      }}
      noValidate
      autoComplete="off"
    >
    <div class= "texto"><TextField id="outlined-basic" label="Correo electrónico" variant="outlined" /></div>
    <div class= "texto"><TextField id="outlined-basic" label="Contraseña" variant="outlined" /></div>
    
    <FormControl style={{ marginLeft: '10px' , marginTop: '10px'}}>
      <FormLabel id="demo-row-radio-buttons-group-label" >Sexo</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        style={{ marginLeft: '20px' }}
      >
        <FormControlLabel value="female" control={<Radio />} label="Mujer" />
        <FormControlLabel value="male" control={<Radio />} label="Hombre" />
        <FormControlLabel value="other" control={<Radio />} label="Otro" />
      </RadioGroup>
    </FormControl>
  
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
          }}}>Iniciar sesión</Button>
    <div class= "registrarse">¿Ya tienes una cuenta? <a href='/login'>Inicia sesión</a></div>
    
    </div>
   
    </body>
    
        
         
}
