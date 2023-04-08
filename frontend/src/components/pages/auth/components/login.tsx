import React, { useState } from "react";
import {
  LoginPageProps,
  LoginFormTypes,
  useRouterContext,
  useLink,
  useRouterType,
  useLogin,
  useTranslate,
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

type LoginProps = LoginPageProps<DivPropsType, DivPropsType, FormPropsType>;

export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
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
  const [remember, setRemember] = useState(false);

  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: login } = useLogin<LoginFormTypes>({
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
              login({
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
            {translate("pages.login.title", "Sign in to your account")}
          </h1>
          {renderProviders()}
          <hr />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login({ email, password, remember });
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
             
              {rememberMe ?? (
                <>
                  <label>
                    {translate("pages.login.buttons.rememberMe", "Remember me")}
                    <input
                      name="remember"
                      type="checkbox"
                      size={20}
                      checked={remember}
                      value={remember.toString()}
                      onChange={() => {
                        setRemember(!remember);
                      }}
                    />
                  </label>
                </>
              )}
              <br />
              {forgotPasswordLink ??
                renderLink(
                  "/forgot-password",
                  translate(
                    "pages.login.buttons.forgotPassword",
                    "Forgot password?"
                  )
                )}
              <Button
                sx={{
                  bgcolor: "#a555ec",
                  "&:hover":{
                    bgcolor: "#a555ec",

                  }
                }}
                variant="contained"
                type="submit"
                value={translate("pages.login.signin", "Sign in")}
              >Sign In</Button>
              {registerLink ?? (
                <span>
                  {translate(
                    "pages.login.buttons.noAccount",
                    "Don’t have an account?"
                  )}{" "}
                  {renderLink(
                    "/register",
                    translate("pages.login.register", "Sign up")
                  )}
                </span>
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
