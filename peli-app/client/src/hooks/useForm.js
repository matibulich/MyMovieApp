import { useState } from "react";

export const useForm = (initialForm) => {
  const [formstate, setFormState] = useState(initialForm);

  const handleOnchange = (event) => {
      
        const {name, value} = event.target;

    setFormState({
      ...formstate,
      [name]: value,
    });
  };

  return {
   
    formstate,
    handleOnchange,
  };
};
