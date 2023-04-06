import * as React from "react";
import { AuthPage as MUIAuthPage, AuthProps } from "@refinedev/mui";
import { Link } from "react-router-dom";
import { login_backgroud, FoodDelivery } from "assets";
const authWrapperProps = {
    style: {
        background:
            `radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url("${login_backgroud}")`,
        backgroundSize: "cover",
    },
};

const renderAuthContent = (content: React.ReactNode) => {
    return (
        <div
            style={{
                margin: "auto",
            }}
        >
            <Link to="/">
                <img
                    src={FoodDelivery}
                    alt="Food-delivery Logo"
                    style={{ width: "100%", marginBottom: 26 }}
                />
            </Link>
            {content}
        </div>
    );
};

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
    return (
        <MUIAuthPage
            type={type}
            wrapperProps={authWrapperProps}
            renderContent={renderAuthContent}
            formProps={formProps}
        />
    );
};
