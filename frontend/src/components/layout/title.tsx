import React from "react";
import {
  useRouterContext,
  TitleProps,
  useLink,
  useRouterType,
} from "@refinedev/core";
import { Button } from "@mui/material";
import { Logo2, FoodBlack } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <Button fullWidth variant="text" disableRipple>
      <ActiveLink to="/">
        {collapsed ? (
          <img
           
            src={Logo2}
            alt="Food Delivery"
            width="28px"
            style={{ maxHeight: "38px" }}
          />
        ) : (
          <img
         
            src={FoodBlack}
            alt="Food Delivery"
            width="140px"
          />
        )}
      </ActiveLink>
    </Button>
  );
};
