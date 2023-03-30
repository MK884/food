import { Box } from "@mui/system";
import CustomButton from "components/CustomButton";
import { Divider } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Typography,
  FormControl,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { Macaroon, FoodDelivery } from "assets";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { useLogin } from "@refinedev/core";
import { CredentialResponse } from "../interfaces/google";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useRef } from "react";
import * as React from "react";

const Signup = () => {
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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box width="100%" height="auto">
      <Box
        marginRight={8}
        borderRadius="0px 25px 25px 0px"
        bgcolor="#F3CCFF"
        height="100vh"
        width="full"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ sm: "column", lg: "row" }}
        gap={5}
      >
        <Box
          borderRadius="50px"
          bgcolor="#ededed"
          height="auto"
          padding={8}
          width={{ sm: "auto", lg: "40rem" }}
          marginLeft={10}
          sx={{
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 4px )",
          }}
        >
          <form>
            <Stack display='grid' justifyContent="center" alignContent="center">

              <img src={FoodDelivery} alt="FoodDelivery" />
            </Stack>
            <Typography
              variant="h4"
              align="center"
              component="h2"
              color="#A555EC"
              fontWeight="bold"
              marginBottom={5}
            >
              Sign Up
            </Typography>
            <Stack spacing={2} marginBottom={5}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-start-adornment"
                  label="Name"
                  variant="outlined"
                  type="email"
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="outlined-number"
                  label="Mobile Number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="outlined-start-adornment"
                  label="Email Address"
                  variant="outlined"
                  type="email"
                />
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </Stack>
            <CustomButton
              type="submit"
              title="Register"
              backgroundColor="#A555EC"
              color="#fcfcfc"
              fullWidth
            />
          </form>
          <Divider
            sx={{
              margin: 5,
            }}
          >
            OR
          </Divider>
          <Button fullWidth>
            <GoogleButton />
          </Button>
        </Box>
        <Box marginBottom={19}>
          <img src={Macaroon} alt="macaroon" />
          <Stack marginLeft={5}>
            <Typography
              variant="h4"
              color="#A555EC"
              fontWeight={700}
              fontSize={30}
            >
              Satisfy Your Cravings with a Wide Range of Restaurant Options
            </Typography>
            <Typography color="whitesmoke" fontSize={25} fontWeight={700}>
              Discover Your Next Meal Here !
            </Typography>
            <CustomButton
              color="#fcfcfc"
              icon={<ArrowBackIosIcon />}
              title=""
              borderRadius=""
              type="button"
              backgroundColor="#A555EC"
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
