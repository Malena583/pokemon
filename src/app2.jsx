import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

import Input from "./components/Input";
import PokemonCard from "./components/Card";
import useFetch from "./hooks/useFetch";

function App() {
  const [query, setQuery] = useState("");

  const url = query
    ? `https://pokeapi.co/api/v2/pokemon/${query}`
    : null;

  const { data, loading, error } = useFetch(url);

  const handleSearch = (value) => {
    setQuery(value);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0d0d0d 0%, #1a0000 50%, #0d0d0d 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        {/* Header */}
        <Box textAlign="center" mb={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1.5}
            mb={1}
          >
            <CatchingPokemonIcon
              sx={{
                fontSize: "2.8rem",
                color: "#ee1515",
                filter: "drop-shadow(0 0 12px #ee151588)",
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.02em",
                fontFamily: "'Segoe UI', sans-serif",
                textShadow: "0 0 40px rgba(238,21,21,0.4)",
              }}
            >
              PokéSearch
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}
          >
            Buscá cualquier Pokémon por nombre o número de ID
          </Typography>
        </Box>

        {/* Input (hijo recibe onSearch y loading como props del padre) */}
        <Input onSearch={handleSearch} loading={loading} />

        {/* Loading */}
        {loading && (
          <Fade in={loading}>
            <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={5}>
              <CircularProgress
                size={48}
                thickness={4}
                sx={{
                  color: "#ee1515",
                  filter: "drop-shadow(0 0 10px #ee151566)",
                }}
              />
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>
                Buscando Pokémon...
              </Typography>
            </Box>
          </Fade>
        )}

        {/* Error */}
        {error && !loading && (
          <Fade in={!!error}>
            <Alert
              severity="error"
              sx={{
                mt: 4,
                borderRadius: "12px",
                background: "rgba(211,47,47,0.12)",
                border: "1px solid rgba(211,47,47,0.3)",
                color: "#ff8a80",
                "& .MuiAlert-icon": { color: "#ff5252" },
              }}
            >
              {error}
            </Alert>
          </Fade>
        )}

        {/* Card (hijo recibe data como prop del padre) */}
        {!loading && !error && data && (
          <Fade in={!loading && !!data}>
            <div>
              <PokemonCard data={data} />
            </div>
          </Fade>
        )}

        {/* Estado inicial — sin búsqueda todavía */}
        {!query && !loading && (
          <Box textAlign="center" mt={6} sx={{ opacity: 0.25 }}>
            <CatchingPokemonIcon sx={{ fontSize: "5rem", color: "#fff" }} />
            <Typography variant="body2" sx={{ color: "#fff", mt: 1 }}>
              Ingresá un nombre o ID para comenzar
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
