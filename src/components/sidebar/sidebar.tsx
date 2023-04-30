import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
// import {ReactElement} from 'react';
// import {ReactJSXElement} from '@emotion/react/type'
import { Grid} from '@mui/material';
import { Link} from 'react-router-dom';
const drawerWidth = 220;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function Sidebar({children}: {children: JSX.Element}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const isActive = useMatch({path: resolvedPath.pathname})
//   console.log('isActive: ', isActive)

  // const openMenu = Boolean(anchorEl);
  
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
  
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton onClick={handleDrawerClose} sx={{color: 'white', ...(!open && {display: 'none'})}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Button onClick={() => {dispatch(logout())}} variant='contained' sx={{fontWeight:600}}>Logout</Button> */}
          {/* <Button onClick={() => {}} variant='contained' sx={{fontWeight:600}}>Logout</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          position: 'fixed',
          zIndex: 2
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {/* <DrawerHeader sx={{display: 'flex', alignItems: 'center', justifyContent:'left'}}>
          <Avatar alt="Agnes Walker" src="https://material-ui.com/static/images/avatar/4.jpg" sx={{marginRight: '1vh'}} />
          <Typography variant='subtitle1' sx={{color: 'black'}} noWrap> {email} </Typography>
          <Button
            id="basic-button"
            aria-controls={openMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClick}>
              <ArrowDownwardIcon fontSize='small' sx={{paddingX: '0px', margin: '0px'}}/>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </DrawerHeader> */}
        {/* <Divider /> */}
        <Link to='/'>
        <List>
          {['Contacts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <p className='link'><ListItemText primary={text} color='black' /></p>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Link>
        <Divider />
        <Link to='/new-contact' color='black' className='link'>
        <List>
          {['Create Contact'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Link>
      </Drawer>
      <Main open={open} sx={{height: '100vh', marginLeft: '0px'}}>
        <DrawerHeader />
        <Grid sx={{height: '100%'}}>
        {children}
        </Grid>
      </Main>
    </Box>
  );
}