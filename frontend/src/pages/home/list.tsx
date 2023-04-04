import { Box, Typography, Stack } from "@mui/material";
import Carousel from "components/common/carousel";
import CustomCard from "components/common/CustomCard";
import ButtonBases from "components/common/ButtonBases";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useNavigate } from "react-router-dom";
const HomeList = () => {
  const images = [
    {
      imgPath:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1679934078_Edible_Oil_Desktop.jpg",
    },
    {
      imgPath:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1679842956_Top_Deals_on_Dry_Fruits_desktop.jpg",
    },
    {
      imgPath:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1679433911_Super_Savings_On_Summer_Coolers_Desktop.jpg",
    },
    {
      imgPath:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1679480481_Breakfast_Mela_Desktop.jpg",
    },
  ];
  const images2 = [
    {
      imgPath:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1679516944_1680X320.jpg",
    },
    {
      imgPath:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1680097553_MUMBAI.jpg",
    },
    {
      imgPath:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1679551587_Web_Mumbai_PremiumFruits.jpg",
    },
    {
      imgPath:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1679483132_Desktop_1680x320_V1.jpg",
    },
  ];
  const images3 = [
    {
      imgPath: "https://images5.alphacoders.com/415/415257.jpg",
      title: "Burger",
    },
    {
      imgPath:
        "https://previews.123rf.com/images/deemwave/deemwave1611/deemwave161100066/65545518-fresh-vegetables-vegan-background-asian-style.jpg",
      title: "Vegan",
    },
    {
      imgPath:
        "https://media.istockphoto.com/id/1303021179/photo/different-tipes-of-pizza.jpg?b=1&s=170667a&w=0&k=20&c=LkDbMg4uxhFmvsFomSxh1xHMSqwgOYRN5hMZixe9smM=",
      title: "Pizza",
    },
    {
      imgPath:
        "https://thumbs.dreamstime.com/b/healthy-breakfast-background-muesli-fruits-berries-nuts-coffee-eggs-honey-oat-grains-other-white-flat-lay-top-view-216462498.jpg",
      title: "BreakFast",
    },
    {
      imgPath:
        "https://w0.peakpx.com/wallpaper/201/721/HD-wallpaper-chocolate-cake-blur-sweets-cake-with-cherry-dessert.jpg",
      title: "Cakes",
    },
    {
      imgPath:
        "https://img.freepik.com/free-vector/vector-illustration-culinary-banner-barbecue-background-with-grilled-meat-sausages-vegetables-sauces_1441-463.jpg",
      title: "Barbeque",
    },
  ];
  const image4 = [
    {
      id: 1,
      title: "Bombay Burger's",
      price: "100",
      photo:
        "https://b.zmtcdn.com/data/pictures/chains/7/43327/430a758563e3eba9bebb5d507c286efa_o2_featured_v2.jpg",
      discount: "40% OFF",
    },
    {
      id: 2,
      title: "Tewari Bros. Mithaiwala",
      price: "150",
      photo:
        "https://b.zmtcdn.com/data/pictures/6/37756/097ee877f458c23fe0bd5f95c5c881b3_o2_featured_v2.jpg",
      discount: "10% OFF",
    },
    {
      id: 3,
      title: "Ice-cream",
      price: "250",
      photo:
        "https://b.zmtcdn.com/data/pictures/chains/5/32465/6b00eb570232fb20472ce52c3211e1f2_o2_featured_v2.jpg",
      discount: "50% OFF",
    },
    {
      id: 4,
      title: "Choko File",
      price: "300",
      photo:
        "https://www.jiomart.com/images/product/600x600/491319789/sunfeast-dark-fantasy-original-choco-filled-biscuits-300-g-product-images-o491319789-p491319789-0-202205301919.jpg",
      discount: "10% OFF",
    },
    {
      id: 5,
      title: "BreakFast",
      price: "100",
      photo:
        "https://www.jiomart.com/images/product/600x600/491373488/britannia-nutrichoice-hi-fibre-digestive-biscuits-1-kg-product-images-o491373488-p491373488-0-202209281320.jpg",
      discount: "10% OFF",
    },
  ];
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
  ];
  return (
    <Box gap={4} display="flex" flexDirection="column">
      <Box
        borderRadius="15px"
        overflow="hidden"
        boxShadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
      >
        <Carousel images={images} direction="rtl" />
      </Box>
      <Box
        borderRadius="15px"
        overflow="hidden"
        boxShadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
      >
        {" "}
        <Carousel images={images2} direction="ltr" />
      </Box>
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
          Food Category
        </Typography>
        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {images3.map((image) => (
            <ButtonBases title={image.title} url={image.imgPath} />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#fcfcfc",
          backgroundImage:
            "linear-gradient(161deg, #ffffff 0%, #f7f3f6 46%, #f5d7a1 100%)",
        }}
        flex={1}
        borderRadius="15px"
        padding="20px"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography
          fontSize="18px"
          fontWeight={600}
          color="#11142d"
          display="flex"
          alignItems="center"
          gap={1}
        >
          Trendings
          <LocalFireDepartmentIcon
            sx={{
              color: "#F5B83F",
            }}
          />
        </Typography>
        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {image4.map((image) => (
            <CustomCard
              id={image.id}
              photo={image.photo}
              title={image.title}
              price={image.price}
              discount={image.discount}
            />
          ))}
        </Box>
      </Box>
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
          Top Store
        </Typography>

      </Box>
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
          {image5.map((image) => (
            <CustomCard
              id={image.id}
              photo={image.photo}
              title={image.title}
              price={image.price}
              discount={image.discount}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeList;
