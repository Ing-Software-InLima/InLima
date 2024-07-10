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
import tokenApi from '@/api/token'
import { useRouter } from 'next/navigation';
import Advise from '@/components/Advise';
import { Divider } from '@mui/material';
import Cookies from 'js-cookie';



export default function RegisterPage() {
  const [showAdvise, setShowAdvise] = useState(false);
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [apellido_paterno, setApellidoP] = useState('');
  const [apellido_materno, setApellidoM] = useState('');
  const [dni, setDni] = useState('');
  const [sexo, setSexo] = useState('');
  const [numero, setNumero] = useState('');
  const router = useRouter();
  const [correoExiste, setCorreoExiste] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const User = {
      email: email,
      password: password,
      nombre: nombre,
      apellido_materno: apellido_materno,
      apellido_paterno: apellido_paterno,
      dni: dni,
      numero: numero,
      sexo: sexo,
      foto: "",
    };
    try {
      const response = await tokenApi.sendToken({email: email});
      console.log(response)


      if (response.status === 200) {
        Cookies.set('registrationData',JSON.stringify(User));
        setShowAdvise(true);
        //router.push('/verify');
      }else if(response.status === 204){
        setCorreoExiste(true);
       
      } else {
        console.log("Unexpected response status:");

      }
    }catch (error) {
      //console.error('Error:', error.message);
      //alert('Error al conectar');
    }
  };

  const isFormValid = () => {
    return email && nombre && password && apellido_paterno && apellido_materno && dni && sexo && numero && passwordStrength !== "Débil";
  };

  const validatePassword = (password) => {
    let strength = "Débil";
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})");

    if (strongRegex.test(password)) {
      strength = "Fuerte";
    } else if (password.length >= 6) {
      strength = "Moderada";
    }

    return strength;
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordStrength(validatePassword(newPassword));
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
        <div className="formulario absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white rounded-lg">
          <img src="/inlima.png" className="relative left-1/2 transform -translate-x-1/2 translate-y-2.5" alt="InLima " style={{ width: "110px", height: "auto" }} />

          <div className="textito text-center text-[#BF2441] py-5 border-b border-silver">Regístrate para realizar quejas y sugerencias</div>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '20ch' },
              ml: 0,
              mt: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <div className="text-center p-0 "><TextField id="outlined-basic" label="Nombre" variant="outlined" value={nombre}
              onChange={(e) => setNombre(e.target.value)} />
              <TextField id="outlined-basic" label="Correo electrónico" variant="outlined" value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email' /></div>
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
            <div className="text-center p-0 "> <TextField id="outlined-basic" label="Apellido Paterno" variant="outlined" value={apellido_paterno}
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
            <div className="text-center p-0 " >

              <TextField id="outlined-basic" label="Número Telefonico" variant="outlined" type="int"
                value={numero}
                onChange={(e) => setNumero(e.target.value)} 
                inputProps={{ maxLength: 9 }}/>
                <TextField id="outlined-basic" label="Dni" variant="outlined" type="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              inputProps={{ maxLength: 8 }} /></div>

            <div className="text-center p-0 " >   <TextField id="outlined-basic" label="Contraseña" variant="outlined" type="password"
              value={password}
              onChange={handlePasswordChange} />

                {password && (
                <div className="text-center p-0 " style={{ color: passwordStrength === "Fuerte" ? "green" : passwordStrength === "Moderada" ? "orange" : "red" }}>
                  {passwordStrength === "Débil"
                    ? "Una buena contraseña debe contener al menos 8 caracteres, y contener una letra mayúscula, minúscula y un símbolo (.*[.!@#\\$%\\^&\\*])"
                    : `Fuerza de la contraseña: ${passwordStrength}`}
                </div>
              )}</div>

           

            <FormControl className="text-center p-0" style={{display: 'flex', alignItems: 'center', marginTop: '10px' }}>
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
          <div style={{display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center'}}>
          <Button type='submit' 
            sx={{
              width: '35ch',
              mt: 2,
              mb: 2,
              borderRadius: '26px',
              color: isFormValid ? 'white' : 'gray',
              backgroundColor: isFormValid ? '#BF2441' : '#cccccc',

              '&:hover': {
                backgroundColor: '#a52039',
                color: 'white'
              }
            }}
            disabled={!isFormValid()}

          >Regístrate</Button>
          </div>
          <div className="registrarse text-center my-5 text-lg text-black">¿Ya tienes una cuenta? <a href='/login' className="text-[#878ceb]">Inicia sesión</a></div>

        </div>
      </form>
      {showAdvise && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <Advise Mensaje="Ha llegado un codigo de confirmación a tu correo" URL="/verify" />
        </div>
      )}
      {correoExiste && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <Advise Mensaje="El correo ya se encuentra registrado en la base de datos" onClose={() => setCorreoExiste(false)} />
        </div>
      )}
    </div>
  )
}
