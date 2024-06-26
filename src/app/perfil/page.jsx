"use client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Advise from '@/components/Advise';
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import db_users from "@/api/usuario";
import Image from 'next/image';
import Layout from "@/components/Layout";
import apiciudadano from "@/api/ciudadano"
import Reputacion from "@/components/Reputacion";
import "./page.css"
export default function LoginPage() {
  const [passVal, setPassVal] = useState(false);
  const [samePass, setSamePass] = useState(false);
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showAdvise, setShowAdvise] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contraseña, setContraseña] = useState("");
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const [imagenAux, setImagenAux] = useState("");
  const [isGmail, setIsGmail] = useState(false);
  const [id, setID] = useState(0);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const fileInputRef = useRef(null);
  const [reputacion, setReputacion] = useState(0);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await db_users.findUserToken();
        console.log(response.data);
        setContraseña(response.data.usuarioEncontrado.password);
        setNombre(response.data.usuarioEncontrado.nombre);
        setImagen(response.data.usuarioEncontrado.foto);
        setImagenAux(response.data.usuarioEncontrado.foto);
        setID(response.data.usuarioEncontrado.id);
        setIsGmail(response.data.usuarioEncontrado.email.includes("@gmail.com"));
      } catch (error) {
        alert("Error al conectar");
      } finally {
        setLoading(true);
      }
    };

    obtenerDatos();
  }, []);

  useEffect(() => {
    const fetchReputation = async () => {
      if (id !== 0) {
        try {
          const ciudadanoResponse = await apiciudadano.encontrarCiudadano({ id_usuario: id });
          const ciudadano_id = ciudadanoResponse.data.ciudadano.id;
          console.log(ciudadano_id);
          if (ciudadano_id && ciudadano_id !== 0) {
            const reputationResponse = await apiciudadano.calcularReputacion({ id_ciudadano: ciudadano_id });
            setReputacion(reputationResponse.data.ciudadano.reputacion);

          } else {
            console.warn('Ciudadano ID no es válido. Evitando llamada a calcularReputacion.');
          }
        } catch (error) {
          console.error('Error fetching reputation:', error);
        }
      }
    };

    fetchReputation();
  }, [id]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await db_users.obtenerRol();
        setRole(response.data.rol);
      } catch (error) {
        console.error('Error obteniendo el rol del usuario:', error);
      }
    };

    if (id) {
      fetchUserRole();
    }
  }, [id]);

  /* PARA VER LA REPUTACION
  useEffect(() => {
    console.log('Reputation response:', reputacion);
  }, [reputacion]);
  */


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagen(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPhoto = async (event) => {
    event.preventDefault();
    const User = {
      imagen: imagen,
    };
    console.log(User);
    try {
      const response = await db_users.actualizarCuenta(User);
      console.log("signin: ", response);
      if (response.status === 200) {
        setShowAdvise(true);
      } else {
        console.log("No se guardó, error...");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al conectar");
    }
  };
  const handleSubmitPass = async (event) => {
    event.preventDefault();
    const User = {
      contraseña: nuevaContraseña,
    };
    console.log(User);
    try {
      const response = await db_users.actualizarCuenta(User);
      console.log("signin: ", response);
      if (response.status === 200) {
        setShowAdvise(true);
      } else {
        console.log("No se guardó, error...");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al conectar");
    }
  };

  const toggleMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const validatePassword = (password) => {
    let strength = "Débil";
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})/;

    if (strongRegex.test(password)) {
      strength = "Fuerte";
    } else if (password.length >= 6) {
      strength = "Moderada";
    }

    return strength;
  };

  const passwordVerify = (event) => {
    const password = event.target.value;
    if (password === contraseña) {
      setPassVal(true);
    } else {
      setPassVal(false);
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setNuevaContraseña(newPassword);
    if (newPassword !== contraseña) {
      setSamePass(true);
    } else {
      setSamePass(false);
    }
    setPasswordStrength(validatePassword(newPassword));
  };

  return (
    <Layout>
      {!loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <h1 className="mb-4 pl-9 text-first w-full uppercase">Bienvenido, <b>{nombre}!</b></h1>
          <Image src="/divider.svg" alt="divider" width={500} height={10} className="mt-3" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <div className="m-0 p-16 font-montserrat flex flex-col lg:flex-row  bg-red-300 rounded-3xl ml-9 mr-9 mt-9">
            <div className="lg:w-1/4 w-full flex flex-col items-center justify-center p-6 -mt-9 ">
              <div className="pt-4 pb-4">
                {role === 1 ? (
                  <>
                    <div className="pt-4"></div>
                    <p className="text-center font-bold mb-2">Reputación</p>
                    <div className="bg-white px-4 py-2 rounded-full bg-center" style={{ width: '190px' }}>
                      <Reputacion calificacion={reputacion} />
                    </div>
                  </>
                ) : role === 2 ? (
                  <>
                  </>
                ) : null}
              </div>
              <div className="animacionjeje-container">
                <p className="animacionjeje-text font-bold">Si quiere cambiar la foto, haga clic en esta :)</p>
              </div>
              <a onClick={handleClickUpload} className="cursor-pointer ">
                <img
                  src={imagen !== " " ? imagen : '/userDefault.png'}
                  alt="User photo"
                  className="mb-4 p-3 border   border-red-500 border-solid rounded-3xl"
                  style={{ minWidth: "198px", minHeight: "198px" }}
                /></a>
              <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: "none" }} />
              <Button onClick={handleSubmitPhoto} disabled={imagen === imagenAux} sx={{ width: "12rem", backgroundColor: "#BF2441", color: "white", borderRadius: "26px", "&:hover": { backgroundColor: "#a52039", color: "white", }, }}>
                ACTUALIZAR LA FOTO
              </Button>
            </div>
            <form className="lg:w-3/4 w-full flex flex-col justify-center items-center p-6" onSubmit={handleSubmitPass}>
              <div className="w-full max-w-lg bg-white rounded-lg p-6 shadow-md min-h-96 flex flex-col">
                <Box sx={{ "& .MuiTextField-root": { m: 1, width: "100%" }, }} noValidate autoComplete="off">
                  <TextField className="z-0" id="outlined-basic" label="Contraseña Actual" variant="outlined" disabled={isGmail} type={mostrarContraseña ? "text" : "password"} onChange={passwordVerify} />
                  <div className="text-center p-0 " style={{ color: passVal ? "green" : "red" }}>
                    {isGmail ? "" : (
                      passVal ? "La contraseña sí coincide" : "La contraseña no coincide")}
                  </div>
                  <TextField className="z-0" id="outlined-basic" label="Contraseña Nueva" disabled={isGmail} variant="outlined" type={mostrarContraseña ? "text" : "password"} value={nuevaContraseña} onChange={handlePasswordChange} />
                  <Button variant="outlined" onClick={toggleMostrarContraseña} disabled={isGmail} sx={{ mt: 1, width: "100%" }}>
                    {mostrarContraseña ? "Ocultar Contraseña" : "Mostrar Contraseña"}
                  </Button>
                  <div className="text-center p-0 " style={{ color: passwordStrength === "Fuerte" ? "green" : passwordStrength === "Moderada" ? "orange" : "red" }}>
                    {isGmail ? "Sección deshabilitada para usuarios registrados en Google" : (!samePass ? "No puede repetir la misma contraseña" : (
                      passwordStrength === "Débil"
                        ? "Una buena contraseña debe contener al menos 8 caracteres, y contener una letra mayúscula, minúscula y un símbolo (.*[.!@#\\$%\\^&\\*])"
                        : `Fuerza de la contraseña: ${passwordStrength}`))}
                  </div>
                </Box>
                <Button
                  type="submit"
                  disabled={passwordStrength === "Débil" || !samePass || !passVal || isGmail}
                  sx={{
                    width: "100%",
                    mt: 2,
                    backgroundColor: passwordStrength === "Débil" || !samePass || !passVal ? "#CCCCCC" : "#BF2441",
                    color: "white",
                    borderRadius: "26px",
                    "&:hover": { backgroundColor: passwordStrength === "Débil" || !samePass || !passVal ? "#CCCCCC" : "#a52039", color: "white" }
                  }}
                >
                  Actualizar
                </Button>
              </div>
            </form>
          </div>
          {
            showAdvise && (
              <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                <Advise Mensaje="¡Datos actualizados con éxito! Volviendo al menú..."  URL="/home"/>
              </div>
            )
          }
        </>
      )
      }
    </Layout >
  )
};

