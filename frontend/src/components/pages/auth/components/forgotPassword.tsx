import React, { useState } from "react";
import {
  useTranslate,
  useRouterContext,
  useLink,
  useRouterType,
  useForgotPassword,
  ForgotPasswordFormTypes,
  ForgotPasswordPageProps,
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

type ForgotPasswordProps = ForgotPasswordPageProps<
  DivPropsType,
  DivPropsType,
  FormPropsType
>;

export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const [email, setEmail] = useState("");

  const { mutate: forgotPassword, isLoading } =
    useForgotPassword<ForgotPasswordFormTypes>();

  const renderLink = (link: React.ReactNode, text?: string) => {
    if (link) {
      if (typeof link === "string") {
        return <ActiveLink to={link}>{text}</ActiveLink>;
      }
      return link;
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
      <h1 style={{ textAlign: "center", color: '#a555ec' }}>
        {translate("pages.forgotPassword.title", "Forgot your password?")}
      </h1>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          forgotPassword({ email });
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
              <Button
                sx={{
                  bgcolor: "#a555ec",
                  "&:hover":{
                    bgcolor: "#a555ec",

                  }
                }}
                variant="contained"
                type="submit"
                value={translate("pages.login.submit", "Send reset instructions")}
              >Submit</Button>
          {/* <input
            type="submit"
            disabled={isLoading}
            value={translate(
              "pages.forgotPassword.buttons.submit",
              "Send reset instructions"
            )}
          /> */}
          <br />
          {loginLink ?? (
            <span>
              {translate(
                "pages.register.buttons.haveAccount",
                "Have an account? "
              )}{" "}
              {renderLink("/login", translate("pages.login.signin", "Sign in"))}
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
