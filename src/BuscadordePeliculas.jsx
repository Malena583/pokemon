import { useState } from "react";

const peliculas = [
  "Batman", "Spider-Man", "Interstellar", "Inception",
  "Avatar", "Titanic", "The Matrix", "Joker"
];

function BuscadordePeliculas() {
  const [busqueda, setBusqueda] = useState("");

  const filtradas = peliculas.filter((p) =>
    p.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon" style={{ background: "#2d1f5e" }}>🎥</div>
        <span className="card-title">Buscador de películas</span>
      </div>

      <input
        className="input"
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar película..."
      />

      <p className="count">{filtradas.length} resultado{filtradas.length !== 1 ? "s" : ""}</p>

      {filtradas.length === 0 ? (
        <p className="sin-resultados">Sin resultados 🔍</p>
      ) : (
        <ul className="movie-list" style={{ listStyle: "none" }}>
          {filtradas.map((pelicula) => (
            <li className="movie-item" key={pelicula}>
              <span className="movie-dot"></span>
              {pelicula}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuscadordePeliculas;