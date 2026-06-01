import { useState } from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

const Input = ({ onSearch, loading }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      sx={{ mt: 4, mb: 2 }}
    >
      <TextField
        label="Nombre o ID del Pokémon"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        placeholder="ej: pikachu o 25"
        sx={{
          width: { xs: "100%", sm: "360px" },
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "rgba(255,255,255,0.06)",
            color: "#fff",
            "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
            "&:hover fieldset": { borderColor: "#ee1515" },
            "&.Mui-focused fieldset": { borderColor: "#ee1515" },
          },
          "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#ee1515" },
          "& input": { color: "#fff" },
          "& ::placeholder": { color: "rgba(255,255,255,0.3)" },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CatchingPokemonIcon sx={{ color: "rgba(255,255,255,0.4)" }} />
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={loading || !query.trim()}
        startIcon={<SearchIcon />}
        sx={{
          height: "56px",
          px: 4,
          borderRadius: "12px",
          fontWeight: 700,
          fontSize: "0.95rem",
          textTransform: "none",
          background: "linear-gradient(135deg, #ee1515 0%, #cc0000 100%)",
          boxShadow: "0 4px 20px rgba(238,21,21,0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #ff2525 0%, #dd0000 100%)",
            boxShadow: "0 6px 28px rgba(238,21,21,0.5)",
            transform: "translateY(-1px)",
          },
          "&:disabled": {
            background: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.3)",
          },
          transition: "all 0.2s ease",
        }}
      >
        Buscar
      </Button>
    </Box>
  );
};

export default Input;
