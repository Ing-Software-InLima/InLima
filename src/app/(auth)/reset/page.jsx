"use client";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import tokenApi from '@/api/token';
import Advise from '@/components/Advise';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [showAdvise, setShowAdvise] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await tokenApi.sendTokenRs({ email: email });
            if (response.status === 200) {
                Cookies.set('aux', JSON.stringify({ email: email }));
                setShowAdvise(true);
            } else {
                console.log("Error al enviar el correo");
            }
        } catch (error) {
            console.error('Error:', error.message);
            //alert('Error al conectar');
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="loquequieras h-screen m-0 p-0 font-montserrat" 
        style={{ 
          backgroundImage: "url('/fondo_login.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center"
        }}>
            <div className="logo absolute pt-5 pl-24">
                <img src="/inlima2.png" alt="InLima" style={{ width: "110px", height: "auto" }} />
            </div>
            <div className="formulario absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg">
                <img src="/candado.png" className="relative left-1/2 transform -translate-x-1/2 translate-y-2.5" alt="InLima" style={{ width: "110px", height: "auto", marginBottom: "20px" }} />
                <div className="textito text-center text-[#BF2441] pt-5 font-bold">¿Tienes problemas para iniciar sesión?</div>
                <div className="textito2 text-center text-black py-5 px-8 border-b border-silver">Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '30.6ch' },
                        ml: 0,
                        mt: 2,
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className="text-center p-0">
                        <TextField id="outlined-basic" label="Correo electrónico" variant="outlined" onChange={handleChange} />
                    </div>
                </Box>
                <Button
                    sx={{
                        width: '35ch',
                        ml: 8,
                        mt: 2,
                        mb: 2,
                        backgroundColor: '#BF2441',
                        color: 'white',
                        borderRadius: '26px',
                        '&:hover': {
                            backgroundColor: '#a52039',
                            color: 'white',
                        },
                    }} onClick={handleSubmit}>Enviar enlace</Button>
                {showAdvise && <div className="text-center text-green-600">Correo enviado con éxito</div>}
                <div className="textito3 relative text-center text-black py-5 border-l border-r border-silver">o</div>
                <div className="centrado text-center text-[#BF2441] font-bold py-1.5 border-b border-silver">
                    <a href="/register">Crea una cuenta nueva</a>
                </div>
                <div className="centradoo text-center font-bold mx-2.5 my-2.5">
                    <a href="/login">Volver a inicio de sesión</a>
                </div>
            </div>
            {showAdvise && (
                    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                        <Advise Mensaje="Ha llegado un codigo de confirmación a tu correo" URL="/resetPass"/>
                    </div>
                )}
        </div>
    );
}
