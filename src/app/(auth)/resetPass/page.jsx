"use client";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import tokenApi from '@/api/token';
import usuarioApi from '@/api/usuario';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Advise from '@/components/Advise';

export default function NuevaContraPage() {
    const [showAdvise, setShowAdvise] = useState(false);
    const [showAdvisePs, setShowAdvisePs] = useState(false);
    const [showAdviseTk, setShowAdviseTk] = useState(false);
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');
    const [num4, setNum4] = useState('');
    const [num5, setNum5] = useState('');
    const [num6, setNum6] = useState('');
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [passwordx2, setPasswordx2] = useState('');

    const isFormValid = () => {
        return num1 && num2 && num3 && num4 && num5 && num6;
    };
    const handleNumberChange = (setter) => (e) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) { // Verifica si el valor es un solo dígito
            setter(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const aux = `${num1}${num2}${num3}${num4}${num5}${num6}`;

        if (password === passwordx2) {
            try {
                const auxiliar = JSON.parse(Cookies.get('aux'));
                if (!auxiliar) {
                    throw new Error('No registration data found');
                }

                const token = {
                    email: auxiliar.email,
                    token: aux
                };
                const response = await tokenApi.verifyToken(token);

                if (response.status === 200) {
                    await usuarioApi.resetps({ email: auxiliar.email, password: password });
                    setShowAdvise(true);
                    Cookies.remove('aux');
                    //alert('Contraseña actualizada con exito')
                    //router.push('/login');
                } else {
                    if (response.status === 300) {
                        setShowAdviseTk(true);
                    } else if (response.status === 400) {
                        alert('Token expirado. Vuelva a generarlo')
                    } else {
                        alert('Error al verificar.')
                    }
                }

            } catch (error) {
                console.error('Error:', error.message);
                //alert('Error al conectar');
            }
        } else {
            setShowAdvisePs(true);
        }

    };

    return     <div className="loquequieras h-screen m-0 p-0 font-montserrat" 
    style={{ 
      backgroundImage: "url('/fondo_login.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center"
    }}>
        <div className="logo absolute pt-5 pl-24"><img src="/inlima2.png" alt="InLima " style={{ width: "110px", height: "auto" }} /></div>
        <div className="formulario relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg">
            <img src="/candado.png" className="relative left-1/2 transform -translate-x-1/2 translate-y-2.5" alt="InLima " style={{ width: "110px", height: "auto", marginBottom: "20px" }} />

            <div className="textito text-center text-[#BF2441] pt-5 font-bold">Restablece tu Contraseña</div>
            <div className="textito2 text-center text-black py-5 px-8 border-b border-silver">Ingresa tu nueva contaseña y el código enviado a tu correo.</div>

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
                <div className="text-center p-0 "><TextField id="outlined-basic" label="Contraseña" type='password' variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                <div className="text-center p-0 "><TextField id="outlined-basic" label="Repetir Contraseña" type='password' variant="outlined" value={passwordx2} onChange={(e) => setPasswordx2(e.target.value)} /></div>
            </Box>

            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '4ch' },
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
                        inputProps={{ maxLength: 1 , style:{textAlign: 'center'}}}
                        size='small'
                    />
                    <TextField id="outlined-basic" variant="outlined"
                        value={num2}
                        onChange={handleNumberChange(setNum2)}
                        inputProps={{ maxLength: 1 , style:{textAlign: 'center'}}}
                        size='small'
                    />
                    <TextField id="outlined-basic" variant="outlined"
                        value={num3}
                        onChange={handleNumberChange(setNum3)}
                        inputProps={{ maxLength: 1 , style:{textAlign: 'center'}}}
                        size='small'
                    />
                    <TextField id="outlined-basic" variant="outlined"
                        value={num4}
                        onChange={handleNumberChange(setNum4)}
                        inputProps={{ maxLength: 1 , style:{textAlign: 'center'}}}
                        size='small'
                    />
                    <TextField id="outlined-basic" variant="outlined"
                        value={num5}
                        onChange={handleNumberChange(setNum5)}
                        inputProps={{ maxLength: 1 , style:{textAlign: 'center'}}}
                        size='small'
                    />
                    <TextField id="outlined-basic" variant="outlined"
                        value={num6}
                        onChange={handleNumberChange(setNum6)}
                        inputProps={{ maxLength: 1 , style:{textAlign: 'center'}}}
                        size='small'
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

                    onClick={handleSubmit}
                >Aceptar</Button>
            </div>

            <div className="textito3 relative text-center text-black py-5 border-l border-r border-silver">o</div>
            <div className="centrado text-center text-[#BF2441] font-bold py-1.5 border-b border-silver">Reenviar codigo</div>
            <div className="centradoo text-center font-bold mx-2.5 my-2.5"><a href="/login">Volver a inicio de sesión </a></div>

        </div>
        {showAdvise && (
            <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                <Advise Mensaje="Contraseña actualizada con exito" URL="/login" />
            </div>
        )}
        {showAdvisePs && (
            <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                <Advise Mensaje="Las contraseñas no coindicen" onClose={() => setShowAdvisePs(false)} />
            </div>
        )}
        {showAdviseTk && (
            <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                <Advise Mensaje="Token incorrecto" onClose={() => setShowAdviseTk(false)} />
            </div>
        )}
    </div>



}
