import { useState, useEffect, useCallback } from "react";

// Custom hook usePokemon (Bonus #8)
function usePokemon(query) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setPokemon(null);
      setError(null);
      return;
    }

    // AbortController para cancelar búsquedas anteriores (Bonus #7)
    const controller = new AbortController();

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      setPokemon(null);

      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Pokémon no encontrado");

        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        if (err.name === "AbortError") return; // búsqueda cancelada, ignorar
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();

    return () => controller.abort(); // cleanup: cancela si query cambia
  }, [query]);

  return { pokemon, loading, error };
}

// Colores por tipo
const TYPE_COLORS = {
  fire: "#f97316",
  water: "#3b82f6",
  grass: "#22c55e",
  electric: "#eab308",
  psychic: "#ec4899",
  ice: "#67e8f9",
  dragon: "#7c3aed",
  dark: "#374151",
  fairy: "#f9a8d4",
  normal: "#9ca3af",
  fighting: "#b45309",
  flying: "#93c5fd",
  poison: "#a855f7",
  ground: "#d97706",
  rock: "#78716c",
  bug: "#84cc16",
  ghost: "#6d28d9",
  steel: "#6b7280",
};

function TypeBadge({ type }) {
  const color = TYPE_COLORS[type] || "#9ca3af";
  return (
    <span
      style={{
        background: color + "22",
        color: color,
        border: `1px solid ${color}55`,
        borderRadius: "999px",
        padding: "2px 12px",
        fontSize: "13px",
        fontWeight: "500",
        textTransform: "capitalize",
      }}
    >
      {type}
    </span>
  );
}

function Spinner() {
  return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid #e5e7eb",
          borderTop: "3px solid #6366f1",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto",
        }}
      />
      <p style={{ marginTop: "12px", color: "#9ca3af", fontSize: "14px" }}>
        Buscando...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function PokemonCard({ pokemon }) {
  const sprite =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header con imagen */}
      <div
        style={{
          background: "#f8f7ff",
          padding: "2rem",
          textAlign: "center",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <p style={{ color: "#9ca3af", fontSize: "13px", margin: "0 0 4px" }}>
          #{String(pokemon.id).padStart(3, "0")}
        </p>
        <img
          src={sprite}
          alt={pokemon.name}
          style={{ width: "140px", height: "140px", imageRendering: "pixelated" }}
        />
        <h2
          style={{
            textTransform: "capitalize",
            fontSize: "22px",
            fontWeight: "600",
            margin: "8px 0 12px",
          }}
        >
          {pokemon.name}
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          {pokemon.types.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          padding: "1.25rem",
        }}
      >
        <StatCard label="Peso" value={`${(pokemon.weight / 10).toFixed(1)} kg`} />
        <StatCard label="Altura" value={`${(pokemon.height / 10).toFixed(1)} m`} />
        <StatCard label="Experiencia base" value={pokemon.base_experience ?? "—"} />
        <StatCard
          label="Habilidades"
          value={pokemon.abilities
            .filter((a) => !a.is_hidden)
            .map((a) => a.ability.name)
            .join(", ")}
        />
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: "#f9fafb",
        borderRadius: "10px",
        padding: "12px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </p>
      <p style={{ fontSize: "15px", fontWeight: "600", margin: 0, textTransform: "capitalize" }}>
        {value}
      </p>
    </div>
  );
}

// Componente principal
export default function PokemonSearch() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");

  // Debounce: espera 500ms antes de lanzar la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim()) setQuery(inputValue.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const { pokemon, loading, error } = usePokemon(query);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (inputValue.trim()) setQuery(inputValue.trim());
    },
    [inputValue]
  );

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "2rem 1rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
        🔍 Buscador de Pokemon
      </h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nombre o número (ej: pikachu, 25)"
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 18px",
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Buscar
        </button>
      </form>

      {/* Estados */}
      {loading && <Spinner />}

      {error && !loading && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "10px",
            padding: "12px 16px",
            color: "#ef4444",
            fontSize: "14px",
          }}
        >
          ❌ {error}. Probá con otro nombre o número.
        </div>
      )}

      {pokemon && !loading && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}
