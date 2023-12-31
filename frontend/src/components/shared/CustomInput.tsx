import { FC } from 'react';
import { TextField } from '@mui/material';

type CustomInputProps = {
  name: string;
  type: string;
  label: string;
};

const CustomInput: FC<CustomInputProps> = ({ name, type, label }) => {
  return (
    <TextField
      margin='normal'
      InputLabelProps={{ style: { color: 'white' } }}
      name={name}
      type={type}
      label={label}
      inputProps={{
        style: {
          width: 400,
          borderRadius: 10,
          fontSize: 20,
          color: 'white',
        },
      }}
    />
  );
};

export default CustomInput;
