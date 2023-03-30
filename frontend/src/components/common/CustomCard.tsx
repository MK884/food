import { Place } from "@mui/icons-material";
// import { Link } from "@refinedev/react-router-v6";
import {
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    Stack,
} from "@mui/material";

import { CustomCardProps } from "interfaces/common";
import { Link } from "react-router-dom";

const CustomCard = ({id,  title,  price, photo, discount}: CustomCardProps) => {
  return (
    <Card
      component={Link}
      to={`/Home/show/${id}`}
      sx={{
          maxWidth: "230px",
          padding: "10px",
          textDecoration: 'none',
          "&:hover": {
            boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          },
          cursor: "pointer",
          bgcolor:"#fcfcfc",
         
      }}
      elevation={0}      
    >
    <CardMedia
      component="img"
      width="100%"
      height={210}
      image={photo}
      alt="card Image"
      sx={{
        borderRadius: '10px'
      }}
    />
    <CardContent sx={{
      display: 'flex',flexDirection: 'row', justifyContent: 'space-between', gap: '10px', paddingX: '5px'
    }}>
      <Stack direction="column" gap={1} sx={{

      }}>
        <Typography fontSize={16} fontWeight={500} 
        color="#11142d">{title}</Typography>
      <Box px={1.5} py={0.5} borderRadius={1} bgcolor="#e5f7ee" height="fit-content" width="fit-content">
        <Typography fontSize={12} fontWeight={600}
        color="#03753c">
          {discount}
        </Typography>
      </Box>
      </Stack>
      <Box px={1.5} py={0.5} borderRadius={1} bgcolor="#dadefa" height="fit-content">
        <Typography fontSize={12} fontWeight={600}
        color="#475be8">
          ${price}
        </Typography>
      </Box>
    </CardContent>
    </Card>
  )
}

export default CustomCard