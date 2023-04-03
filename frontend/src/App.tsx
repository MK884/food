import {
  AuthBindings,
  Authenticated,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

// icons
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import WidgetsIcon from "@mui/icons-material/Widgets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import LocalMallIcon from '@mui/icons-material/LocalMall';

import { AuthPage } from "@refinedev/core";
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
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "pages/categories";
import { Login } from "pages/login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { HomeCreate, HomeEdit, HomeList, HomeShow } from "pages/home";
import {
  DashboardCreate,
  DashboardEdit,
  DashboardList,
  DashboardShow,
} from "pages/dashboard";
import {
  Shop_By_CategoryCreate,
  Shop_By_CategoryEdit,
  Shop_By_CategoryList,
  Shop_By_CategoryShow,
} from "pages/shop_by_categories";
import {
  My_orderCreate,
  My_orderEdit,
  My_orderList,
  My_orderShow,
} from "pages/my_orders";
import {
  WishlistCreate,
  WishlistEdit,
  WishlistList,
  WishlistShow,
} from "pages/wishlists";
import {
  WalletCreate,
  WalletEdit,
  WalletList,
  WalletShow,
} from "pages/wallets";
import {
  StoresListCreate,
  StoresListEdit,
  StoresListList,
  StoresListShow,
} from "pages/storeslists";
import {
  MyProfileCreate,
  MyProfileEdit,
  MyProfileList,
  MyProfileShow,
} from "pages/myprofiles";





import authProvider from "./authProvider";
import { ProductsList, ProductsShow } from "pages/products";
// import { LoginPage } from "components/pages/auth/components";

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

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[{
               
                name: "Dashboard",

                list: "/Dashboard",
                create: "/Dashboard/create",
                edit: "/Dashboard/edit/:id",
                show: "/Dashboard/show/:id",
                meta: {
                  icon: <WidgetsIcon />,
                },
              }, {
                
                name: "Home",

                list: "/Home",
                create: "/Home/create",
                edit: "/Home/edit/:id",
                show: "/Home/show/:id",
                meta: {
                  canDelete: true,
                  icon: <HomeIcon />,
                },
              },{
            
                name: "Products",

                list: "/Products",
                show: "/Products/show/:id",
                meta: {
                  icon: <LocalMallIcon/>,
                }
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
                
                name: "Stores",

                list: "/StoresList",
                create: "/StoresList/create",
                edit: "/StoresList/edit/:id",
                show: "/StoresList/show/:id",
                meta: {
                  icon: <StoreIcon />,
                },
              }, {
                name: "MyProfile",

                list: "/MyProfile",
                create: "/MyProfile/create",
                edit: "/MyProfile/edit/:id",
                show: "/MyProfile/show/:id",
                meta: {
                  icon: <AccountCircleOutlinedIcon />,
                },
              }, ]}
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
                    element={<NavigateToResource resource="Dashboard" />}
                  />
                  <Route>
                    <Route path="/Dashboard" element={<DashboardList />} />
                    <Route
                      path="/Dashboard/create"
                      element={<DashboardCreate />}
                    />
                    <Route
                      path="/Dashboard/edit/:id"
                      element={<DashboardEdit />}
                    />
                    <Route
                      path="/Dashboard/show/:id"
                      element={<DashboardShow />}
                    />
                  </Route>

                  <Route
                    index
                    element={<NavigateToResource resource="Home" />}
                  />
                  <Route>
                    <Route path="/Home" element={<HomeList />} />
                    <Route path="/Home/create" element={<HomeCreate />} />
                    <Route path="/Home/edit/:id" element={<HomeEdit />} />
                    <Route path="/Home/show/:id" element={<HomeShow />} />
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
                    element={<NavigateToResource resource="StoresList" />}
                  />
                  <Route>
                    <Route path="/StoresList" element={<StoresListList />} />
                    <Route
                      path="/StoresList/create"
                      element={<StoresListCreate />}
                    />
                    <Route
                      path="/StoresList/edit/:id"
                      element={<StoresListEdit />}
                    />
                    <Route
                      path="/StoresList/show/:id"
                      element={<StoresListShow />}
                    />
                  </Route>

                  <Route
                    index
                    element={<NavigateToResource resource="MyProfile" />}
                  />
                  <Route>
                    <Route path="/MyProfile" element={<MyProfileList />} />
                    <Route
                      path="/MyProfile/create"
                      element={<MyProfileCreate />}
                    />
                    <Route
                      path="/MyProfile/edit/:id"
                      element={<MyProfileEdit />}
                    />
                    <Route
                      path="/MyProfile/show/:id"
                      element={<MyProfileShow />}
                    />
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
                >
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
                    <Route path="/login" element={<Login />}/>
                  </Route>{" "}
                </Route>
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
