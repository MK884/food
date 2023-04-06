import { useEffect, useRef } from "react";
import { useLogin } from "@refinedev/core";
import { Box, Container } from "@mui/material";

import { FoodBlack } from "assets";

import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
 // Todo: Update your Google Client ID here
 const GOOGLE_CLIENT_ID =
 "1041339102270-jlljcjl19jo1hkgf695em3ibr7q2m734.apps.googleusercontent.com";
const { mutate: login } = useLogin<CredentialResponse>();

const GoogleButton = (): JSX.Element => {
 const divRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
   if (typeof window === "undefined" || !window.google || !divRef.current) {
     return;
   }

   try {
     window.google.accounts.id.initialize({
       ux_mode: "popup",
       client_id: GOOGLE_CLIENT_ID,
       callback: async (res: CredentialResponse) => {
         if (res.credential) {
           login(res);
         }
       },
     });
     window.google.accounts.id.renderButton(divRef.current, {
       theme: "outline",
       size: "medium",
       type: "standard",
     });
   } catch (error) {
     console.log(error);
   }
 }, []);

 return <div ref={divRef} />;
};


  return (
    <Box
      component="div"
      sx={{ backgroundColor: '#E3DFFD' }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src={FoodBlack} alt="Food Logo" />
          </div>
          <Box mt={4}>
            <GoogleButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
