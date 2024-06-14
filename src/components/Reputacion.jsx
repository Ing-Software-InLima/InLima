import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function Reputacion({ calificacion }) {
    // Asegurarse de que la calificación esté en el rango de 1 a 5
    const rating = Math.max(1, Math.min(5, calificacion));

    return (
        <div className="flex items-center">
            <Stack spacing={1} direction="row" alignItems="center">
                <Rating name="read-only" value={rating} precision={0.1} readOnly />
                <span className="ml-2 text-lg font-bold text-inLima_red">{calificacion.toFixed(1)}</span>
            </Stack>
        </div>
    );
}
