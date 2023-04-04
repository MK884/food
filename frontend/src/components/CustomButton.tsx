import React from 'react'
import  Button  from "@mui/material/Button";
import { CustomButtonProps } from "interfaces/common";
const CustomButton = ({ type, title, variant, backgroundColor,color,fullWidth,icon,handleClick, disabled }: CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      type={ type === 'submit' ? 'submit' : 'button'}
      variant={variant === 'outlined' ? 'outlined' : 'contained'}
      sx={{
        flex: fullWidth ? 1: 'unset',
        padding: '10px 10px',
        width: fullWidth ? '100%' : 'fit-content',
        minWidth: 130,
        backgroundColor,
        color,
        fontSize: 16,
        fontWeight: 600,
        gap: '10px',
        textTransform: 'capitalize',
        '&:hover': {
          opacity: 0.9,
          backgroundColor,
        }
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  )
}

export default CustomButton