"use client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import api_datos from "@/api/usuario"; // **Falta corroborar**
import db_users from "@/api/usuario";
import Layout from "@/components/Layout";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [nombre, setNombre] = useState("Nombre");
  const [imagen, setImagen] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false); // para lógica de mostrar contraseña
  const router = useRouter();
  const fileInputRef = useRef(null);

  const obtenerDatos = async () => {
    try {
      const response = await api_datos.ObtenerDatos();
      setCorreo(response.data.email); // **Falta corroborar**
      setContraseña(response.data.password); // **Falta corroborar**
      setNombre(response.data.nombre); // **Falta corroborar**
      setImagen(response.data.imagen); // **Falta corroborar**
    } catch (error) {
      alert("Error al conectar");
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const User = {
      email: correo,
      password: contraseña,
      imagen: imagen, // Añadimos la imagen aquí
    };
    try {
      const response = await db_users.actualizar(User);
      console.log("signin: ", response);
      if (response.status == 200) {
        alert("Se guardó satisfactoriamente");
        // Puedes redirigir si es necesario, por ejemplo: router.push('/home');
      } else {
        console.log("NO");
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

  return (
    <Layout>
      <div className="bg-white h-screen m-0 p-0 font-montserrat flex flex-col lg:flex-row">
        <div className="lg:w-1/4 w-full flex flex-col items-center justify-center p-6">
          <img
            src={imagen ? imagen : "/default-avatar.png"} // Default avatar si no hay imagen
            alt="User photo"
            className="rounded-full mb-4"
            style={{ width: "150px", height: "150px" }}
          />
          <h1 className="mb-4">{nombre}</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <Button
            onClick={handleClickUpload}
            sx={{
              width: "100%",
              backgroundColor: "#BF2441",
              color: "white",
              borderRadius: "26px",
              "&:hover": {
                backgroundColor: "#a52039",
                color: "white",
              },
            }}
          >
            SUBIR UNA FOTO
          </Button>
        </div>
        <form
          className="lg:w-3/4 w-full flex flex-col justify-center items-center p-6"
          onSubmit={handleSubmit}
        >
          <div className="w-full max-w-lg bg-white rounded-lg p-6 shadow-md">
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Correo electrónico"
                variant="outlined"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                type={mostrarContraseña ? "text" : "password"}
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={toggleMostrarContraseña}
                sx={{ mt: 1, width: "100%" }}
              >
                {mostrarContraseña
                  ? "Ocultar Contraseña"
                  : "Mostrar Contraseña"}
              </Button>
            </Box>
            <Button
              type="submit"
              sx={{
                width: "100%",
                mt: 2,
                backgroundColor: "#BF2441",
                color: "white",
                borderRadius: "26px",
                "&:hover": {
                  backgroundColor: "#a52039",
                  color: "white",
                },
              }}
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
