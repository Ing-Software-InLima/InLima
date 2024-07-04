"use client";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRouter } from 'next/navigation';
import db_users from '@/api/ciudadano';
import tokenApi from '@/api/token';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

export default function VerifyPage() {
    const [showAdvise, setShowAdvise] = useState(false);
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');
    const [num4, setNum4] = useState('');
    const [num5, setNum5] = useState('');
    const [num6, setNum6] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const aux = `${num1}${num2}${num3}${num4}${num5}${num6}`;

        try {
            const registrationData = JSON.parse(Cookies.get('registrationData'));
            if (!registrationData) {
                throw new Error('No registration data found');
            }

            const token = {
                email: registrationData.email,
                token: aux
            };
            const response = await tokenApi.verifyToken(token);

            if(response.status === 200) {
                const registro = await db_users.create(registrationData);
                Cookies.remove('registrationData');
                alert('Usuario creado con exito')
                router.push('/login');
            }else{
                if(response.status === 300){
                    alert('Token incorrecto')
                }else if(response.status === 400){
                    alert('Token expirado. Vuelva a generarlo')
                }else{
                    alert('Error al verificar.')
                }
            }

        } catch (error) {
            console.error('Error:', error.message);
            alert('Error al conectar');
        }
    };

    const handleVolverEnviar = async (event) => {
        event.preventDefault();
        try {
            const registrationData = JSON.parse(localStorage.getItem('registrationData'));
            if (!registrationData) {
                throw new Error('No registration data found');
            }

            const response = await tokenApi.sendToken(registrationData.email);

            if(response.status === 200) {
                const registro = await db_users.create(registrationData);
                alert('Token enviado con exito');
            }else{
                alert('Error al enviar');
            }

        } catch (error) {
            console.error('Error:', error.message);
            alert('Error al conectar');
        }
    } 

    const isFormValid = () => {
        return num1 && num2 && num3 && num4 && num5 && num6;
    };
    const handleNumberChange = (setter) => (e) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) { // Verifica si el valor es un solo dígito
            setter(value);
        }
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
                    <div className="textito text-center text-[#BF2441] py-5 border-b border-silver">Regístrate con Google</div>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
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
                        >Aceptar</Button>
                    </div>
                    <div className=" text-center my-5 text-lg text-black">Introduce el código que te mandamos a tu correo </div>
                </div>
            </form>
        </div>
    )
}
