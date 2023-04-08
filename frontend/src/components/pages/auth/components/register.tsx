import React, { useState } from "react";
import {
  RegisterPageProps,
  useTranslate,
  useRouterContext,
  useLink,
  useRouterType,
  useRegister,
  useActiveAuthProvider,
} from "@refinedev/core";
import { Button, colors } from "@mui/material";
import { FoodBlack } from "assets";
import {
  Drawer,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Avatar,
  Typography,
  FormLabel,
  Stack,
  Box,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Autocomplete,
} from "@mui/material";

type DivPropsType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type FormPropsType = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type RegisterProps = RegisterPageProps<
  DivPropsType,
  DivPropsType,
  FormPropsType
>;

export const RegisterPage: React.FC<RegisterProps> = ({
  providers,
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: register, isLoading } = useRegister({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const renderLink = (link: React.ReactNode, text?: string) => {
    if (link) {
      if (typeof link === "string") {
        return <ActiveLink to={link}>{text}</ActiveLink>;
      }
      return link;
    }
    return null;
  };

  const renderProviders = () => {
    if (providers) {
      return providers.map((provider) => (
        <div
          key={provider.name}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={() =>
              register({
                providerName: provider.name,
              })
            }
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {provider?.icon}
            {provider.label ?? <label>{provider.label}</label>}
          </button>
        </div>
      ));
    }
    return null;
  };

  const content = (
    <Box display="grid" justifyContent="center" margin="10rem 0">
      <Link to="/">
        <img
          src={FoodBlack}
          alt="Food-delivery Logo"
          style={{ width: "100%", marginBottom: 26 }}
        />
      </Link>

      <Box
        padding="10px"
        borderRadius="15px"
        bgcolor="#fcfcfc"
        height="fit-content"
        width="32rem"
      >
        <div {...contentProps}>
          <h1 style={{ textAlign: "center", color: "#a555ec" }}>
            {translate("pages.register.title", "Sign up for your account")}
          </h1>
          {renderProviders()}
          <hr />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              register({ email, password, });
            }}
            {...formProps}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 25,
              }}
              gap={2}
            >
              
              
               <FormControl>
                <TextField
                  fullWidth
                  label="Email"
                  autoCorrect="off"
                  spellCheck={false}
                  autoCapitalize="off"
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <TextField
                  fullWidth
                  label="password"
                  required
                  type="password"
                  name="pasword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                sx={{
                  bgcolor: "#a555ec",
                  "&:hover":{
                    bgcolor: "#a555ec",

                  }
                }}
                variant="contained"
                type="submit"
                value={translate("pages.login.signup", "Sign Up")}
              >Sign Up</Button>
                {/* <input
                  type="submit"
                  value={translate("pages.register.buttons.submit", "Sign up")}
                  disabled={isLoading}
                /> */}
                {loginLink ?? (
                  <>
                    <span>
                      {translate(
                        "pages.login.buttons.haveAccount",
                        "Have an account?"
                      )}{" "}
                      {renderLink(
                        "/login",
                        translate("pages.login.signin", "Sign in")
                      )}
                    </span>
                  </>
                )}
       
            </Box>
          </form>
        </div>
      </Box>
    </Box>
  );

  return (
    <div {...wrapperProps}>
      {renderContent ? renderContent(content, title) : content}
    </div>
  );
};
