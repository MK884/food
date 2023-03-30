import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Signin from './Signin';
import Signup from './Signup';
import { Stack } from '@mui/system';
import { Logo } from 'assets'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs(...other) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%', height: 'auto' }}>
      <AppBar position="static" sx={{
        display: 'flex',
        justifyContent:'space-between',
        flexDirection: { sm: 'column', lg: 'row'},
        bgcolor:'#A555EC',
        alignItems: 'center',
      }} >
       <Stack display='flex' alignItems='center' flexDirection='row' marginLeft={4} gap={2} >
        <Stack>
          <img src={Logo} alt="logo" />
        </Stack>
        <Typography variant='h4' fontSize={30} fontWeight={700}>Food Delivery</Typography>
      </Stack>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            aria-label="full width tabs example"
          >
            <Tab label="Sign-in" {...a11yProps(0)} />
            <Tab label="Sign-up" {...a11yProps(1)} />
          </Tabs>
        </Box>

      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        
      >
        <TabPanel  value={value} index={0} dir={theme.direction}>
          <Signin/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Signup/>
        </TabPanel>
        
      </SwipeableViews>
    </Box>
  );
}
