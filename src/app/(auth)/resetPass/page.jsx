"use client";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NuevaContraPage(){
  const [showAdvise, setShowAdvise] = useState(false);
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [num4, setNum4] = useState('');
  const [num5, setNum5] = useState('');
  const [num6, setNum6] = useState('');
  const router = useRouter();

  const isFormValid = () => {
    return num1 && num2 && num3 && num4 && num5 && num6;
};
const handleNumberChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) { // Verifica si el valor es un solo dígito
        setter(value);
    }
};

    return <div className="Cuerpo m-0 p-0 font-montserrat bg-gradient-to-br from-[#BF2441] to-[#F2F2F2] h-screen">
    <div className="logo absolute pt-5 pl-24"><img src="/inlima2.png" alt="InLima " style={{width: "110px", height: "auto"}}/></div>
    <div className="formulario absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg">
    <img src="/candado.png" class="relative left-1/2 transform -translate-x-1/2 translate-y-2.5" alt="InLima " style={{width: "110px", height: "auto", marginBottom: "20px"}}/>
    
    <div className="textito text-center text-[#BF2441] pt-5 font-bold">¿Tienes problemas para iniciar sesión?</div>
    <div className="textito2 text-center text-black py-5 px-8 border-b border-silver">Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</div>
 
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
    <div className="text-center p-0 "><TextField id="outlined-basic" label="Contraseña" variant="outlined" /></div>
    <div className="text-center p-0 "><TextField id="outlined-basic" label="Repetri Contraseña" variant="outlined" /></div>
    </Box>

    <Box
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '5ch' },
                            ml: 0,
                            mt: 2,
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="text-center p-0">
                            <TextField id="outlined-basic" variant="outlined" 
                                value={num1}
                                onChange={handleNumberChange(setNum1)}
                                inputProps={{ maxLength: 1 }}
                            />
                            <TextField id="outlined-basic" variant="outlined"
                                value={num2}
                                onChange={handleNumberChange(setNum2)}
                                inputProps={{ maxLength: 1 }}
                            />
                            <TextField id="outlined-basic" variant="outlined"
                                value={num3}
                                onChange={handleNumberChange(setNum3)}
                                inputProps={{ maxLength: 1 }}
                            />
                            <TextField id="outlined-basic" variant="outlined"
                                value={num4}
                                onChange={handleNumberChange(setNum4)}
                                inputProps={{ maxLength: 1 }}
                            />
                            <TextField id="outlined-basic" variant="outlined"
                                value={num5}
                                onChange={handleNumberChange(setNum5)}
                                inputProps={{ maxLength: 1 }}
                            />
                            <TextField id="outlined-basic" variant="outlined"
                                value={num6}
                                onChange={handleNumberChange(setNum6)}
                                inputProps={{ maxLength: 1 }}
                            />

                        </div>
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
          }}}>Cambiar Contraseña</Button>

<div class="textito3 relative text-center text-black py-5 border-l border-r border-silver">o</div>
<div class="centrado text-center text-[#BF2441] font-bold py-1.5 border-b border-silver"><a  href="/register">Crea una cuenta nueva </a></div>
<div class="centradoo text-center font-bold mx-2.5 my-2.5"><a  href="/login">Volver a inicio de sesión </a></div>
    
    </div>
   
    </div>
    
        
         
}
