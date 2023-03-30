import type { AuthBindings } from "@refinedev/core";

const mockUsers = [{ email: "john@gmail.com" }, { password: "1234" }];



const authProvider: AuthBindings = {
    
    login: async ({ email, password, remember, providerName }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === email);
        const pass = mockUsers.find((item) => item.password === password);

        if (user && pass) {
            localStorage.setItem("auth", JSON.stringify(user));
            return {
                success: true,
                redirectTo: "/",
            };
        }

        return {
            success: false,
            error: new Error("Invalid email or password"),
        };
    },
    check: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            logout: true,
            redirectTo: "/login",
            error: new Error("User is not authenticated"),
        };
    },
    logout: async () => {
        localStorage.removeItem("auth");
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        if (error.status === 401 || error.status === 403) {
            return {
                logout: true,
                redirectTo: "/login",
                error,
            };
        }

        return {};
    },
    register: async ({ email, password, providerName }) => {
        const user = mockUsers.find((user) => user.email === email);

        if (user) {
            return {
                success: false,
                error: {
                    name: "Register Error",
                    message: "User already exists",
                },
            };
        }

        mockUsers.push({ email });

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    forgotPassword: async ({ email }) => {
        // send password reset link to the user's email address here

        // if request is successful
        return {
            success: true,
            redirectTo: "/login",
        };

        // if request is not successful
        return {
            success: false,
            error: {
                name: "Forgot Password Error",
                message: "Email address does not exist",
            },
        };
    },
    updatePassword: async ({ password, confirmPassword }) => {
        // update the user's password here

        // if request is successful
        return {
            success: true,
            redirectTo: "/login",
        };

        // if request is not successful
        return {
            success: false,
            error: {
                name: "Forgot Password Error",
                message: "Email address does not exist",
            },
        };
    },

};

export default authProvider;