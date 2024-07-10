"use client";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRouter } from 'next/navigation';
import db_users from '@/api/ciudadano';
import { jwtDecode } from "jwt-decode";


export default function RegisterGooglePage() {
    const [showAdvise, setShowAdvise] = useState(false);
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido_paterno, setApellidoP] = useState('');
    const [apellido_materno, setApellidoM] = useState('');
  const [numero, setNumero] = useState('');
  const [dni, setDni] = useState('');
  const [sexo, setSexo] = useState('');
  const [foto, setFoto] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const User = {
        email: email,
        nombre: nombre,
        apellido_materno: " ",
        apellido_paterno: apellido_paterno,
        dni: dni,
        numero: numero,
        sexo: sexo,
        foto: " ",
  
      };
    try {
      const response = await db_users.createGoogle(User);
      if (response.status === 200) {
        router.push('/login');
      } else {
        console.log("NO")
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error al conectar');
    }
  };

  const isFormValid = () => {
    return numero && dni && sexo;
  };

  useEffect(() => {
    
    const token = localStorage.getItem('token'); 
    const decoded = jwtDecode(token);

    if (token) {
      try {
        
        const decoded = jwtDecode(token);
        const userEmail = decoded.email;
        const nombre = decoded.given_name;
        const apellido = decoded.family_name;
        setNombre(nombre);
        setApellidoP(apellido);
        setApellidoM("");
        setEmail(userEmail);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    }
  }, []);

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
          <div className="textito text-center text-[#BF2441] py-5 border-b border-silver">Regístrate con Google</div>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '20ch' },
              ml: 0,
              mt: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <div className="text-center p-0">
              <TextField id="outlined-basic" label="Número Telefónico" variant="outlined" type="tel"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                inputProps={{ maxLength: 9 }}
              />
              <TextField id="outlined-basic" label="DNI" variant="outlined" type="dni"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                inputProps={{ maxLength: 8 }}
              />
            </div>
            <FormControl style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <FormLabel id="demo-row-radio-buttons-group-label">Sexo</FormLabel>
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
          <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', marginTop: '10px' }}>
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
        </div>
      </form>
    </div>
  )
}
