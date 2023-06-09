import React from "react";
import {
  Add,
  AddAlert,
  AddAPhoto,
  AddAPhotoRounded,
  AddBox,
  AddBusiness,
  AddCard,
} from "@mui/icons-material";
import { CreateButton } from "@refinedev/mui";
import { useModalForm } from "@refinedev/react-hook-form";
import { IProduct } from "interfaces/common";
import {
  HttpError,
  useTranslate,
  IResourceComponentsProps,
} from "@refinedev/core";
import { CreateProduct} from "components/product";

import { useTable } from "@refinedev/core";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import CustomButton from "components/CustomButton";
import CustomCard from "components/common/CustomCard";
import Autocomplete from "@mui/material/Autocomplete";
export const ProductsList: React.FC<IResourceComponentsProps> = () => {
  // const t = useTranslate();
  // const createDrawerFormProps = useModalForm<IProduct, HttpError, IProduct>({
  //   refineCoreProps: { action: "create" },
  // });

  // const {
  //   modal: { show: showCreateDrawer },
  // } = createDrawerFormProps;

 
  const currentPrice = "asc";

  const {
    tableQueryResult: { data, isLoading, isError },
    setSorters,
  } = useTable();

  const toggleSort = (field: string) => {
    setSorters([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  };
  const navigate = useNavigate();

  const products = data?.data ?? [];

  const image5 = [
    {
      id: 1,
      title: "Noodles Yippee",
      price: "100",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587636_3.jpg",
      discount: "40% OFF",
    },
    {
      id: 2,
      title: "Snacks and Chips",
      price: "150",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587610_2.jpg",
      discount: "10% OFF",
    },
    {
      id: 3,
      title: "Chocolates",
      price: "250",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587690_5.jpg",
      discount: "50% OFF",
    },
    {
      id: 4,
      title: "Biscuits",
      price: "300",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587565_1.jpg",
      discount: "10% OFF",
    },
    {
      id: 5,
      title: "Colgate",
      price: "100",
      photo:
        "https://www.jiomart.com/images/product/150x150/491252787/colgate-strong-teeth-dental-cream-toothpaste-200-g-pack-of-4-product-images-o491252787-p491252787-0-202206232110.jpg",
      discount: "10% OFF",
    },
    {
      id: 6,
      title: "Noodles Yippee",
      price: "100",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587636_3.jpg",
      discount: "40% OFF",
    },
    {
      id: 7,
      title: "Snacks and Chips",
      price: "150",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587610_2.jpg",
      discount: "10% OFF",
    },
    {
      id: 8,
      title: "Chocolates",
      price: "250",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587690_5.jpg",
      discount: "50% OFF",
    },
    {
      id: 9,
      title: "Biscuits",
      price: "300",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587565_1.jpg",
      discount: "10% OFF",
    },
    {
      id: 10,
      title: "Colgate",
      price: "100",
      photo:
        "https://www.jiomart.com/images/product/150x150/491252787/colgate-strong-teeth-dental-cream-toothpaste-200-g-pack-of-4-product-images-o491252787-p491252787-0-202206232110.jpg",
      discount: "10% OFF",
    },
    {
      id: 11,
      title: "Noodles Yippee",
      price: "100",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587636_3.jpg",
      discount: "40% OFF",
    },
    {
      id: 12,
      title: "Snacks and Chips",
      price: "150",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587610_2.jpg",
      discount: "10% OFF",
    },
    {
      id: 13,
      title: "Chocolates",
      price: "250",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587690_5.jpg",
      discount: "50% OFF",
    },
    {
      id: 14,
      title: "Biscuits",
      price: "300",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587565_1.jpg",
      discount: "10% OFF",
    },
    {
      id: 15,
      title: "Colgate",
      price: "100",
      photo:
        "https://www.jiomart.com/images/product/150x150/491252787/colgate-strong-teeth-dental-cream-toothpaste-200-g-pack-of-4-product-images-o491252787-p491252787-0-202206232110.jpg",
      discount: "10% OFF",
    },
    {
      id: 16,
      title: "Noodles Yippee",
      price: "100",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587636_3.jpg",
      discount: "40% OFF",
    },
    {
      id: 17,
      title: "Snacks and Chips",
      price: "150",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587610_2.jpg",
      discount: "10% OFF",
    },
    {
      id: 18,
      title: "Chocolates",
      price: "250",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587690_5.jpg",
      discount: "50% OFF",
    },
    {
      id: 19,
      title: "Biscuits",
      price: "300",
      photo:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1677587565_1.jpg",
      discount: "10% OFF",
    },
    {
      id: 20,
      title: "Colgate",
      price: "100",
      photo:
        "https://www.jiomart.com/images/product/150x150/491252787/colgate-strong-teeth-dental-cream-toothpaste-200-g-pack-of-4-product-images-o491252787-p491252787-0-202206232110.jpg",
      discount: "10% OFF",
    },
  ];

  const Categories = [
    {
      title: "Burger",
    },
    {
      title: "Pizza",
    },
    {
      title: "Food",
    },
    {
      title: "Breakfast",
    },
    {
      title: "Nashta",
    },
    {
      title: "Vegan",
    },
    {
      title: "BBQ",
    },
    {
      title: "Noodles Yippee",
    },
    {
      title: "Snacks and Chips",
    },
    {
      title: "Chocolates",
    },
    {
      title: "Biscuits",
    },
    {
      title: "Colgate",
    },
  ];

  return (
    <>
      {/* <CreateProduct {...createDrawerFormProps} /> */}
      <Box>
        <Stack
          display="flex"
          gap={2}
          sx={{
            flexDirection: {
              lg: "row",
              md: "column",
            },
          }}
          flex={1}
          borderRadius="15px"
          padding="20px"
          bgcolor="#fcfcfc"
          minWidth="100%"
          mt="25px"
        >
          <CustomButton
            title={`Sort price ${currentPrice === "asc" ? "↑" : "↓"}`}
            handleClick={() => toggleSort("price")}
            backgroundColor="#A555EC"
            color="#fcfcfc"
          />
          <Autocomplete
            freeSolo
            id="serachBar"
            disableClearable
            fullWidth
            options={Categories.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Products"
                onChange={() => {}}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue=""
            // value={currentFilterValues.propertyType}
            // onChange={(e) => {
            //   setFilters([
            //     {
            //       field: "propertyType",
            //       operator: "eq",
            //       value: e.target.value,
            //     }
            //   ],"replace");
            // }}
          >
            <MenuItem value="">All</MenuItem>
            {["Burger", "Vegan", "Pizza", "BreakFast", "Cakes", "Barbeque"].map(
              (type) => (
                <MenuItem key={type} value={type.toLowerCase()}>
                  {type}
                </MenuItem>
              )
            )}
          </Select>
          {/* <Stack direction="row" alignItems="center">
           
            <CreateButton
              onClick={() => showCreateDrawer()}
              variant='contained'
            
              size="large"
              sx={{
                bgcolor: '#a555ec',
                height: "3rem",
                color: "#fcfcfc",
                borderColor: "#a555ec",
                "&:hover": {
                  borderColor: "#a555ec",
                  bgcolor: '#a555ec',
                },
              }}
            >
              {t("addProduct")}
            </CreateButton>
          </Stack> */}
        </Stack>
        <Box
          flex={1}
          borderRadius="15px"
          padding="20px"
          bgcolor="#fcfcfc"
          display="flex"
          flexDirection="column"
          minWidth="100%"
          mt="25px"
        >
          <Typography fontSize="18px" fontWeight={600} color="#11142d">
            Products
          </Typography>
          <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {products.map((product) => (
              <CustomCard

                key={product._id}
                id={product._id}
                photo={product.photos[0]}
                title={product.name}
                price={product.price}
                discount={product.discount}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

// export default ProductsList;
