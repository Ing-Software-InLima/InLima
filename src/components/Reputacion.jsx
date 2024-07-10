import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function Reputacion({ calificacion }) {
    // Asegurarse de que la calificación sea un número válido y está en el rango de 1 a 5
    const rating = typeof calificacion === 'number' ? Math.max(0, Math.min(5, calificacion)) : 0;

    return (
        <div className="flex items-center">
            <Stack spacing={1} direction="row" alignItems="center">
                <Rating name="read-only" value={rating} precision={0.1} readOnly />
                <span className="ml-2 text-lg font-bold text-inLima_red">
                    {typeof calificacion === 'number' ? calificacion.toFixed(1) : 'N/A'}
                </span>
            </Stack>
        </div>
    );
}
