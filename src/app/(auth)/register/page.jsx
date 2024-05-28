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
import db_users from '@/api/ciudadano'
import { useRouter } from 'next/navigation';


export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [apellido_paterno, setApellidoP] = useState('');
  const [apellido_materno, setApellidoM] = useState('');
  const [dni, setDni] = useState('');
  const [sexo, setSexo] = useState('');
  const [foto, setFoto] = useState('');
  const [numero, setNumero] = useState('');
  const router = useRouter();



  const handleSubmit = async (event) => {
    event.preventDefault();
    const User = {
      email: email,
      password: password,
      nombre: nombre,
      apellido_materno: apellido_materno,
      apellido_paterno: apellido_paterno,
      dni: dni,
      numero:numero,
      sexo: sexo,
      foto: null,
      
    };
    try {
      const response = await db_users.create(User);
      if (response.status == 200) {
        router.push('/home')
      }
      else {
        console.log("NO")
      }

    } catch (error) {
        console.error('Error:', error.message);
        alert('Error al conectar');
      }
  };


  return (
  <div class="General bg-gradient-to-br from-[#BF2441] to-[#F2F2F2] w-screen h-screen m-0 p-0">
    <form onSubmit={handleSubmit}>
      <div class="formulario absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white rounded-lg">
        <img src="/inlima.png" class="relative left-1/2 transform -translate-x-1/2 translate-y-2.5" alt="InLima " style={{ width: "110px", height: "auto" }} />

        <div class="textito text-center text-[#BF2441] py-5 border-b border-silver">Regístrate para realizar quejas y sugerencias</div>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '20ch' },
            ml: 0,
            mt: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <div class="text-center p-0 "><TextField id="outlined-basic" label="Nombre" variant="outlined" value={nombre}
            onChange={(e) => setNombre(e.target.value)} />
            <TextField id="outlined-basic" label="Correo electrónico" variant="outlined" value={email}
            onChange={(e) => setEmail(e.target.value)} /></div>
        </Box>

        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '20ch' },
            ml: 0,
            mt: 0,
          }}
          noValidate
          autoComplete="off"
        >
           <div class="text-center p-0 "> <TextField id="outlined-basic" label="Apellido Paterno" variant="outlined" value={apellido_paterno}
              onChange={(e) => setApellidoP(e.target.value)} />
              <TextField id="outlined-basic" label="Apellido Materno" variant="outlined" value={apellido_materno}
              onChange={(e) => setApellidoM(e.target.value)} /> </div>
        </Box>

        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '20ch' },
            ml: 0,
          }}
          noValidate
          autoComplete="off"
        >
          <div class="text-center p-0 " ><TextField id="outlined-basic" label="Contraseña" variant="outlined"  type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
             <TextField id="outlined-basic" label="Número Telefonico" variant="outlined" type="int"
            value={numero}
            onChange={(e) => setNumero(e.target.value)} /></div>
           
            <div class="text-center p-0 " ><TextField id="outlined-basic" label="Dni" variant="outlined" type="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)} /></div>

          <FormControl style={{ marginLeft: '150px', marginTop: '10px' }}>
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
            ml: 15,
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
