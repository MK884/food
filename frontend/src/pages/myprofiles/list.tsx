import { useModalForm } from "@refinedev/react-hook-form";
import { IProfile } from "interfaces/common";
import { HttpError } from "@refinedev/core";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { EditButton } from "@refinedev/mui";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import { EditProfile } from "components/MyProfile";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useGetIdentity } from "@refinedev/core";

type IUser = {
  id: number;
  name: string;
  avatar: string;
  email: string;
  gender: string;
  address: string;
  number : number;
};


const MyProfileList = () => {

  const { data: user } = useGetIdentity<IUser>();

  const editDrawerFormProps = useModalForm<IProfile, HttpError, IProfile>({
    refineCoreProps: { action: "edit" },
  });

  const {
    modal: { show: showEditDrawer },
  } = editDrawerFormProps;

  return (
    <>
      <EditProfile {...editDrawerFormProps} />

      <Box
        display="felx"
        sx={{
          flexDirection: "column",
        }}
      >
        <Stack>
          <Typography fontSize="28px" fontWeight={600} color="#11142d">
            My Profile
          </Typography>
        </Stack>
        <Box
          display="flex"
          sx={{
            flexDirection: { lg: "row", xs: "column" },
          }}
          gap={4}
        >
          <Box
            display="flex"
            bgcolor="#fcfcfc"
            height="27rem"
            borderRadius="15px"
            flexDirection="column"
            alignItems="center"
            padding="20px"
            mt="25px"
            sx={{
              "&:hover": {
                boxShadow: "0px 4px 16px rgba(0,0,0,.08)",
              },
              cursor: "pointer",
              width: { lg: "35%", xs: "100%" },
            }}
            gap={8}
          >
            {
              user?.avatar && 
            <Avatar
              src={user?.avatar}
              sx={{
                cursor: "pointer",
                width: {
                  xs: 250,
                  md: 280,
                },
                height: {
                  xs: 250,
                  md: 280,
                },
              }}
              alt={user?.name}
            />
            }
            <EditButton
              variant="outlined"
              size="large"
              sx={{
                width: "20rem",
                height: "3rem",
                color: "#A555EC",
                borderColor: "#a555ec",
                "&:hover": {
                  borderColor: "#a555ec",
                },
              }}
              onClick={() => showEditDrawer()}
            />
          </Box>

          <Box
            display="flex"
            bgcolor="#fcfcfc"
            height="27rem"
            borderRadius="15px"
            padding="20px"
            mt="25px"
            width="100%"
            flexDirection="column"
            sx={{
              "&:hover": {
                boxShadow: "0px 4px 16px rgba(0,0,0,.08)",
              },
              cursor: "pointer",
            }}
            gap={4}
          >
            <Stack
              display="flex"
              width="100%"
              gap={1}
              flexDirection="row"
              height="fit-content"
            >
              {
                user?.name && (
              <Typography fontSize="22px" fontWeight={600} color="#11142d">
                {user.name}
              </Typography>)

              }
              {/* { user?.gender && 

              <Typography variant="caption" color="rgb(128, 129, 145)">
                ( {user.gender} )
              </Typography>
              } */}
              <Typography variant="caption" color="rgb(128, 129, 145)">
                ( Male / Female )
              </Typography>
            </Stack>
            <Box
              sx={{
                flexDirection: { lg: "row", xs: "column" },
              }}
            >
              <Box
                display="flex"
                gap={2}
                flexDirection="row"
                alignItems="center"
              >
                <LocationOnIcon />
                <Typography
                  fontSize="15px"
                  fontWeight={500}
                  color="rgb(128, 129, 145)"
                >
                  Address
                </Typography>
              </Box>
              <Box mt={2}>
                
                <Typography>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Mollitia obcaecati voluptatem pariatur porro rerum. Eligendi
                  quis ipsa perspiciatis, perferendis, nobis recusandae impedit
                  nesciunt beatae corrupti sed non libero culpa laborum!
                </Typography>
              </Box>
            </Box>
            <Box
              display="felx"
              sx={{
                flexDirection: { lg: "row", xs: "column" },
              }}
            >
              <Box display="flex" flexDirection="column">
                <Typography
                  fontSize="15px"
                  fontWeight={500}
                  color="rgb(128, 129, 145)"
                >
                  Phone Number
                </Typography>
                <Box mt={2} display="flex" flexDirection="row" gap={2}>
                  <PhoneIcon />
                  <Typography>45447-24796</Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" mt={6}>
                <Typography
                  fontSize="15px"
                  fontWeight={500}
                  color="rgb(128, 129, 145)"
                >
                  Email
                </Typography>
                <Box mt={2} display="flex" flexDirection="row" gap={2}>
                  <MailIcon />
                  { user?.email && 

                  <Typography>{user.email}</Typography>
                  }
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MyProfileList;
