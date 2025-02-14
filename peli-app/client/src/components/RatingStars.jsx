import * as React from "react";
import Rating from "@mui/material/Rating";

import StarIcon from "@mui/icons-material/Star";

export const RatingStars = ({ value, onChange }) => {
  return (
   
      <Rating
        name="half-rating"
        value={value} // Recibe el valor actual
        precision={0.5}
        size="small"
        onChange={(event, newValue) => onChange(newValue)} // Notifica cambios
        emptyIcon={<StarIcon style={{ opacity: 0.1, color: "grey" }} fontSize="inherit" />}
      />
    
  );
};