"use client";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from "react"
import db_users from '@/api/usuario'
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [sexo, setSexo] = useState('');
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Iniciando fetching users")
      const response = await db_users.findAll();
      if (response.status != 200) {
        throw new Error('Error fetching users');
      }
      const existingUser = response.data.find(user => user.email === correo);
      if (existingUser) {
        alert('El correo electrónico ya existe', { variant: 'error' });
        return
      }

      const newUser = {
        nombre,
        email: correo,
        password: contraseña,
        foto: null,
        rol_id: 1,
        sexo_id: sexo
      };
      const res = await db_users.create(newUser)
      if (res.status == 200){
        router.push('/login')
      }

    } catch (error) {
      console.error('Error:', error.message);
      alert('Error durante el registro', { variant: 'error' });
    }
  };


  return (
  <div class="General bg-gradient-to-br from-[#BF2441] to-[#F2F2F2] h-screen m-0 p-0">
    <form onSubmit={handleSubmit}>
      <div class="formulario absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg">
        <img src="/inlima.png" class="relative left-1/2 transform -translate-x-1/2 translate-y-2.5" alt="InLima " style={{ width: "110px", height: "auto" }} />

        <div class="textito text-center text-[#BF2441] py-5 border-b border-silver">Regístrate para realizar quejas y sugerencias</div>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '14.5ch' },
            ml: 0,
            mt: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <div class="text-center p-0 "><TextField id="outlined-basic" label="Nombre" variant="outlined" value={nombre}
            onChange={(e) => setNombre(e.target.value)} />
            <TextField id="outlined-basic" label="Apellido" variant="outlined" value={apellido}
              onChange={(e) => setApellido(e.target.value)} /></div>
        </Box>

        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30.6ch' },
            ml: 0,
          }}
          noValidate
          autoComplete="off"
        >
          <div class="text-center p-0 "><TextField id="outlined-basic" label="Correo electrónico" variant="outlined" value={correo}
            onChange={(e) => setCorreo(e.target.value)} /></div>
          <div class="text-center p-0 " ><TextField id="outlined-basic" label="Contraseña" variant="outlined" type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)} /></div>

          <FormControl style={{ marginLeft: '50px', marginTop: '10px' }}>
            <FormLabel id="demo-row-radio-buttons-group-label" >Sexo</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              style={{ marginLeft: '20px' }}
              value={sexo}
              onChange={(event) => setSexo(event.target.value)}
            >
              <FormControlLabel value="1" control={<Radio />} label="Mujer" />
              <FormControlLabel value="2" control={<Radio />} label="Hombre" />
            </RadioGroup>
          </FormControl>

        </Box>

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
          }}>Regístrate</Button>
        <div class="registrarse text-center my-5 text-lg text-black">¿Ya tienes una cuenta? <a href='/login' class="text-[#878ceb]">Inicia sesión</a></div>

      </div>
    </form>
  </div>
  )


}
