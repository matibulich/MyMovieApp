import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';


export const SearchMovie = () => {
  return (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centrar horizontalmente
          alignItems: "center",
          backgroundColor:"primary",
          height:100,
          
        }}
      >
   <TextField
   
  fullWidth
  label="Buscar película"
  id="fullWidth"
  color="primary"
 
    InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "40px",
            borderRadius:7, // Ajustar la altura para alinearlo con el input
          }}
        >
          <SearchIcon/>
        </Button>
      </InputAdornment>
    ),
  }}
 
 
  sx={{
    marginTop: 4,
    maxWidth: {
      xs: 300, // Para pantallas extra pequeñas
      sm: 400, // Para pantallas pequeñas
      md: 900}, // Para pantallas medianas y mayores}}
   
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'primary',
        borderWidth:2,
        borderRadius:7,
        
      },
      '&:hover fieldset': {
        borderColor: 'primary', // Color al pasar el mouse
      },
      '&.Mui-focused fieldset': {
        borderColor: 'primary', // Color al enfocar
      },
    },
     }}
/>
      </Box>
   
  );
};
