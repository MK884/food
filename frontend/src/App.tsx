import { AuthBindings, Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

// icons
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import LocalMallIcon from "@mui/icons-material/LocalMall";
// import Home from "./Admin Dashboard/pages/home/Home"

import { AuthPage } from "./components/pages/auth";
import {
  ErrorComponent,
  // Layout,
  RefineSnackbarProvider,
  notificationProvider,
} from "@refinedev/mui";
import { Layout } from "components/layout";
// import { Header } from "components/layout/header";
import { Sider } from "components/layout/sider";
import { Title } from "components/layout/title";
import { CssBaseline, GlobalStyles } from "@mui/material";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
// import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";

import { Login } from "pages/login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { HomeList } from "pages/home";

import {
  My_orderCreate,
  My_orderEdit,
  My_orderList,
  My_orderShow,
} from "pages/my_orders";

import { MyProfileList } from "pages/myprofiles";
import { useFormContext } from "react-hook-form";
import FormControlLabel from "@mui/material";
import Checkbox from "@mui/material";
import authProvider from "./authProvider";
import { ProductsList, ProductsShow } from "pages/products";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          })
        );

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: new Error("Not authenticated"),
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  // const authProvider: AuthBindings = {
  //   login: async ({ credential , providerName, email }:CredentialResponse) => {
  //     if (providerName === "google") {
  //       const profileObj = credential ? parseJwt(credential) : null;

  //       if (profileObj) {
  //         localStorage.setItem(
  //           "user",
  //           JSON.stringify({
  //             ...profileObj,
  //             avatar: profileObj.picture,
  //           })
  //         );

  //         localStorage.setItem("token", `${credential}`);

  //         return {
  //           success: true,
  //           redirectTo: "/",
  //         };
  //       }
  //       window.location.href = `https://oauth2.googleapis.com/${}`;
  //       // window.location.href = "https://accounts.google.com/o/oauth2/v2/auth";
  //       return {
  //         success: true,
  //       };
  //     }

  //     if (providerName === "github") {
  //       window.location.href = "https://github.com/login/oauth/authorize";
  //       return {
  //         success: true,
  //       };
  //     }

  //     if (email) {
  //       localStorage.setItem("email", email);
  //       return {
  //         success: true,
  //         redirectTo: "/",
  //       };
  //     }

  //     return {
  //       success: false,
  //       error: {
  //         message: "Login failed",
  //         name: "Invalid email or password",
  //       },
  //     };
  //   },
  //   register: async (params) => {
  //     if (params.email && params.password) {
  //       localStorage.setItem("email", params.email);
  //       return {
  //         success: true,
  //         redirectTo: "/",
  //       };
  //     }
  //     return {
  //       success: false,
  //       error: {
  //         message: "Register failed",
  //         name: "Invalid email or password",
  //       },
  //     };
  //   },
  //   updatePassword: async (params) => {
  //     if (params.newPassword) {
  //       //we can update password here
  //       return {
  //         success: true,
  //       };
  //     }
  //     return {
  //       success: false,
  //       error: {
  //         message: "Update password failed",
  //         name: "Invalid password",
  //       },
  //     };
  //   },
  //   forgotPassword: async (params) => {
  //     if (params.email) {
  //       //we can send email with reset password link here
  //       return {
  //         success: true,
  //       };
  //     }
  //     return {
  //       success: false,
  //       error: {
  //         message: "Forgot password failed",
  //         name: "Invalid email",
  //       },
  //     };
  //   },
  //   logout: async () => {
  //     localStorage.removeItem("email");
  //     return {
  //       success: true,
  //       redirectTo: "/login",
  //     };
  //   },
  //   onError: async (error) => {
  //     console.error(error);
  //     return { error };
  //   },
  //   check: async () =>
  //     localStorage.getItem("email")
  //       ? {
  //           authenticated: true,
  //         }
  //       : {
  //           authenticated: false,
  //           error: {
  //             message: "Check failed",
  //             name: "Not authenticated",
  //           },
  //           logout: true,
  //           redirectTo: "/login",
  //         },
  //   getPermissions: async () => ["admin"],
  //   getIdentity: async () => ({
  //     id: 1,
  //     name: "Jane Doe",
  //     avatar:
  //       "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
  //   }),
  // };

  // const RememeberMe = () => {
  //     const { register } = useFormContext();

  //     return (
  //         <FormControlLabel
  //             sx={{
  //                 span: {
  //                     fontSize: "12px",
  //                     color: "text.secondary",
  //                 },
  //             }}
  //             color="secondary"
  //             control={
  //                 <Checkbox
  //                     size="small"
  //                     id="rememberMe"
  //                     {...register("rememberMe")}
  //                 />
  //             }
  //             label="Remember me"
  //         />
  //     );
  // };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("http://localhost:4000/api")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "Home",

                  list: "/Home",

                  meta: {
                    icon: <HomeIcon />,
                  },
                },
                {
                  name: "Products",

                  list: "/Products",
                  show: "/Products/show/:id",
                  meta: {
                    icon: <LocalMallIcon />,
                  },
                },

                {
                  name: "My_order",

                  list: "/My_order",
                  create: "/My_order/create",
                  edit: "/My_order/edit/:id",
                  show: "/My_order/show/:id",
                  meta: {
                    icon: <ShoppingCartIcon />,
                  },
                },

                {
                  name: "MyProfile",

                  list: "/MyProfile",

                  meta: {
                    icon: <AccountCircleOutlinedIcon />,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <Layout Header={Header} Sider={Sider} Title={Title}>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="Home" />}
                  />
                  <Route>
                    <Route path="/Home" element={<HomeList />} />
                  </Route>

                  <Route
                    index
                    element={<NavigateToResource resource="My_order" />}
                  />
                  <Route>
                    <Route path="/My_order" element={<My_orderList />} />
                    <Route
                      path="/My_order/create"
                      element={<My_orderCreate />}
                    />
                    <Route
                      path="/My_order/edit/:id"
                      element={<My_orderEdit />}
                    />
                    <Route
                      path="/My_order/show/:id"
                      element={<My_orderShow />}
                    />
                  </Route>

                  <Route
                    index
                    element={<NavigateToResource resource="MyProfile" />}
                  />
                  <Route>
                    <Route path="/MyProfile" element={<MyProfileList />} />
                  </Route>
                  <Route
                    index
                    element={<NavigateToResource resource="Products" />}
                  />
                  <Route>
                    <Route path="/Products" element={<ProductsList />} />

                    <Route
                      path="/Products/show/:id"
                      element={<ProductsShow />}
                    />
                  </Route>
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                />
                  <Route element={<Authenticated fallback={<Outlet />} />}>
                    {/* <Route
                      path="/login"
                      element={
                        <AuthPage
                          providers={[
                            {
                              name: "github",
                              icon: <GitHubIcon />,
                              label: "Sign in with GitHub",
                            },
                            {
                              name: "google",
                              icon: <GoogleIcon />,
                              label: "Sign in with Google",
                            },
                          ]}
                        />
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        <AuthPage
                          type="register"
                          providers={[
                            {
                              name: "github",
                              icon: (
                                <GitHubIcon
                                  style={{
                                    fontSize: 24,
                                  }}
                                />
                              ),
                              label: "Sign in with GitHub",
                            },
                            {
                              name: "google",
                              icon: (
                                <GoogleIcon
                                  style={{
                                    fontSize: 24,
                                  }}
                                />
                              ),
                              label: "Sign in with Google",
                            },
                          ]}
                        />
                      }
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                    />
                    <Route
                      path="/update-password"
                      element={<AuthPage type="updatePassword" />}
                    /> */}
                    <Route path="/login" element={<Login />} /> </Route>
                {/* </Route> */}
                    {/* <Route path="/admin" element={<Home />} />  */}
                <Route
                  element={
                    <Authenticated>
                      <Layout Header={Header}>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
