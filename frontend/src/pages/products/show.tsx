import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useShow, useOne } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { EditProduct } from "components/product";
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  DeleteButton,
} from "@refinedev/mui";
import { Box, Select, MenuItem, Table, Alert } from "@mui/material";
import { Typography, Stack } from "@mui/material";
import CustomButton from "components/CustomButton";
import { EditButton } from "@refinedev/mui";
import { IProduct } from "interfaces/common";
import { HttpError } from "@refinedev/core/dist/interfaces";
import { useModalForm } from "@refinedev/react-hook-form";

export const ProductsShow = () => {
  const currentUser = true;
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const editDrawerFormProps = useModalForm<IProduct, HttpError, IProduct>({
    refineCoreProps: { action: "edit" },
  });

  const {
    modal: { show: showEditDrawer },
  } = editDrawerFormProps;

  const navigate = useNavigate();

  const cartHanlde = () => {
    <Alert variant="filled" severity="success">
      Successfully Add to cart — check it out!
    </Alert>;
    // navigate("/My_order");
  };
  return (
    <>
      <EditProduct {...editDrawerFormProps} />
      <Show isLoading={isLoading}>
        <Box
          display="flex"
          gap={1}
          sx={{
            flexDirection: { lg: "row", xs: "column" },
          }}
        >
          <Box
            flex={1}
            borderRadius="15px"
            padding="20px"
            bgcolor="#fcfcfc"
            display="flex"
            flexDirection="column"
            minWidth="55%"
            mt="25px"
            boxShadow="0px 4px 16px rgba(0,0,0,.08)"
            gap={2}
            height="fit-content"
          >
            <Box boxShadow="0px 4px 16px rgba(0,0,0,.08)">
              <img
                width="100%"
                src="https://www.jiomart.com/images/product/600x600/491582579/amul-kool-rose-flavoured-milk-180-ml-bottle-product-images-o491582579-p491582579-0-202203170907.jpg"
                alt="product"
              />
            </Box>
            {currentUser ? (
              <Stack
                display="flex"
                justifyContent="center"
                flexDirection="row"
                gap={4}
              >
                <EditButton onClick={() => showEditDrawer()} resource="Products" variant="contained" size='large' sx={{
                  width: { lg: '15rem', xs: '7rem' },
                }} />
                <DeleteButton
                  fullWidth
                  variant="contained"
                  resource="Products"
                  size='large' sx={{
                    width: { lg: '15rem', xs: '7rem' },
                  }}
                />
              </Stack>
            ) : (
              <CustomButton
                title="Add to Cart"
                backgroundColor="#A555EC"
                color="#fcfcfc"
                icon={<ShoppingCartIcon />}
                fullWidth
                handleClick={cartHanlde}
              />
            )}
          </Box>
          <Box
            flex={1}
            borderRadius="15px"
            padding="20px"
            bgcolor="#fcfcfc"
            display="flex"
            flexDirection="column"
            minWidth="40%"
            mt="25px"
            gap={1}
            boxShadow="0px 4px 16px rgba(0,0,0,.08)"
          >
            <Stack gap={2} borderBottom="1px solid #e0e0e0" paddingBottom={4}>
              <Typography variant="subtitle1" fontWeight={600}>
                Amul Kool Rose Flavoured Milk 180 ml (Bottle)
              </Typography>
              <Typography>
                M.R.P:<strong> ₹25.00</strong> (Incl. of all taxes)
              </Typography>
              <Stack flexDirection="row" gap={1}>
                <Typography
                  bgcolor="#e5f7ee"
                  color="#67be23"
                  fontWeight={500}
                  fontSize="14px"
                >
                  In Stock
                </Typography>
                <Typography variant="caption">
                  Sold By Reliance Retail
                </Typography>
              </Stack>
            </Stack>
            <hr />
            <Stack gap={2} borderBottom="1px solid #e0e0e0" paddingBottom={4}>
              <Typography fontSize={25} fontWeight={700}>
                Offers
              </Typography>
              <Stack flexDirection="row" gap={2}>
                <LocalOfferIcon
                  sx={{
                    color: "#67be23",
                  }}
                />
                <Typography color="#67be23">15% OFF</Typography>
              </Stack>
            </Stack>
            <Stack gap={2} borderBottom="1px solid #e0e0e0" paddingBottom={4}>
              <Typography fontSize={25} fontWeight={700}>
                Description
              </Typography>
              <Typography>
                Flavoured milk is one of the best options to make children have
                milk without any complaints. It endures all the proteins from
                milk along with giving an added flavour for tasty consumption.
                Moreover, its packaging makes it easier to stock up or carry
                while travelling. A yummy treat for both adults and children,
                buy Amul Kool Rose Flavoured Milk online today!
              </Typography>
            </Stack>
            <Stack gap={2} borderBottom="1px solid #e0e0e0" paddingBottom={4}>
              <Typography fontSize={25} fontWeight={700}>
                Product Information
              </Typography>
              <table>
                <tr>
                  <td width="30%">
                    <strong>Brand</strong>
                  </td>
                  <td width="70%">Amul</td>
                </tr>
                <tr>
                  <td width="30%">
                    <strong>Store Name</strong>
                  </td>
                  <td width="70%">Reliance Retail</td>
                </tr>
                <tr>
                  <td width="30%">
                    <strong>Store Email</strong>
                  </td>
                  <td width="70%">store@gmail.com</td>
                </tr>
                <tr>
                  <td width="30%">
                    <strong>Category</strong>
                  </td>
                  <td width="70%">Food</td>
                </tr>
                <tr>
                  <td width="30%">
                    <strong>Store Address</strong>
                  </td>
                  <td width="70%">
                    Gujarat Cooperative Milk Marketing Federation Po Box 10,
                    Amul Dairy Road, Anand 388 001, Gujarat, India.
                  </td>
                </tr>
              </table>
            </Stack>
          </Box>
        </Box>
      </Show>
    </>
  );
};
export default ProductsShow;
