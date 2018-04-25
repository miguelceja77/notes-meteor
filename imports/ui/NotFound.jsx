import React from 'react';
import { Link } from 'react-router-dom';


export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Página no encontrada</h1>
        <p>¡Ups! Parece que la página no existe o es incorrecta</p>
        <Link className="button--link" to="/">Vuelve a la Vida</Link>
      </div>
    </div>
  )
};

