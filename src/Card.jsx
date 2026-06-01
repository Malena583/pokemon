import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Divider,
  LinearProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/Shield";

const TYPE_COLORS = {
  fire: "#ff6b35",
  water: "#4fc3f7",
  grass: "#81c784",
  electric: "#ffd54f",
  psychic: "#f48fb1",
  ice: "#80deea",
  dragon: "#7986cb",
  dark: "#78909c",
  fairy: "#f8bbd9",
  normal: "#bcaaa4",
  fighting: "#ef9a9a",
  flying: "#b39ddb",
  poison: "#ce93d8",
  ground: "#ffcc80",
  rock: "#a1887f",
  bug: "#aed581",
  ghost: "#9575cd",
  steel: "#90a4ae",
};

const StatBar = ({ label, value, icon }) => (
  <Box sx={{ mb: 1.5 }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
      <Box display="flex" alignItems="center" gap={0.5}>
        {icon}
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {label}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}>
        {value}
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={Math.min((value / 255) * 100, 100)}
      sx={{
        height: 6,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.1)",
        "& .MuiLinearProgress-bar": {
          borderRadius: 3,
          background: value > 80 ? "linear-gradient(90deg, #ee1515, #ff6b35)" : "linear-gradient(90deg, #4fc3f7, #81c784)",
        },
      }}
    />
  </Box>
);

const PokemonCard = ({ data }) => {
  if (!data) return null;

  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const id = String(data.id).padStart(3, "0");
  const image =
    data.sprites?.other?.["official-artwork"]?.front_default ||
    data.sprites?.front_default;
  const types = data.types?.map((t) => t.type.name) || [];
  const stats = data.stats || [];

  const hp = stats.find((s) => s.stat.name === "hp")?.base_stat ?? "—";
  const attack = stats.find((s) => s.stat.name === "attack")?.base_stat ?? "—";
  const defense = stats.find((s) => s.stat.name === "defense")?.base_stat ?? "—";

  const abilities = data.abilities
    ?.slice(0, 2)
    .map((a) => a.ability.name.replace("-", " "))
    .join(", ");

  const primaryType = types[0] || "normal";
  const accentColor = TYPE_COLORS[primaryType] || "#bcaaa4";

  return (
    <MuiCard
      sx={{
        maxWidth: 380,
        mx: "auto",
        mt: 4,
        borderRadius: "24px",
        background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(20px)",
        border: `1px solid rgba(255,255,255,0.1)`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${accentColor}22`,
        overflow: "hidden",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 28px 70px rgba(0,0,0,0.6), 0 0 60px ${accentColor}33`,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: `radial-gradient(circle at 70% 30%, ${accentColor}22 0%, transparent 60%)`,
          pt: 3,
          pb: 1,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.12em", fontWeight: 600 }}
          >
            #{id}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 800,
              lineHeight: 1.1,
              fontFamily: "'Segoe UI', sans-serif",
              textShadow: `0 0 30px ${accentColor}66`,
            }}
          >
            {name}
          </Typography>
          <Box display="flex" gap={1} mt={1}>
            {types.map((type) => (
              <Chip
                key={type}
                label={type.charAt(0).toUpperCase() + type.slice(1)}
                size="small"
                sx={{
                  backgroundColor: `${TYPE_COLORS[type] || "#aaa"}33`,
                  color: TYPE_COLORS[type] || "#aaa",
                  border: `1px solid ${TYPE_COLORS[type] || "#aaa"}55`,
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "22px",
                }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", textAlign: "right" }}>
          <Typography variant="caption" display="block">
            {data.height / 10}m
          </Typography>
          <Typography variant="caption" display="block">
            {data.weight / 10}kg
          </Typography>
        </Box>
      </Box>

      {/* Image */}
      {image && (
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: 180,
            height: 180,
            mx: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
      )}

      <CardContent sx={{ px: 3, pb: 3 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

        {/* Stats */}
        <Typography
          variant="overline"
          sx={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", fontSize: "0.68rem" }}
        >
          Estadísticas base
        </Typography>
        <Box mt={1.5}>
          <StatBar label="HP" value={hp} icon={<FavoriteIcon sx={{ fontSize: "0.8rem", color: "#ef9a9a" }} />} />
          <StatBar label="Ataque" value={attack} icon={<BoltIcon sx={{ fontSize: "0.8rem", color: "#ffd54f" }} />} />
          <StatBar label="Defensa" value={defense} icon={<ShieldIcon sx={{ fontSize: "0.8rem", color: "#80deea" }} />} />
        </Box>

        {abilities && (
          <>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 2 }} />
            <Typography
              variant="overline"
              sx={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", fontSize: "0.68rem" }}
            >
              Habilidades
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.75)", mt: 0.5, fontStyle: "italic", textTransform: "capitalize" }}
            >
              {abilities}
            </Typography>
          </>
        )}
      </CardContent>
    </MuiCard>
  );
};

export default PokemonCard;
