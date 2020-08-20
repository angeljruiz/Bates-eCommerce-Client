import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  List,
  makeStyles,
  ListItem,
  ListItemText,
  Hidden,
  Drawer,
  useTheme,
  ListItemAvatar,
  Avatar,
  Divider,
  Container,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { mdiRadioboxBlank } from "@mdi/js";
import Icon from "@mdi/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnchorLink from "react-anchor-link-smooth-scroll";

import { showSidebar } from "../../actions/sidebarActions";
import { showCart } from "../../actions/cartActions";
import dStyle from "../../style/style";
import { logout as log } from "../../actions/accountActions";

function ListItemButton(props) {
  return <ListItem button component="button" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: dStyle.drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${dStyle.drawerWidth}px)`,
      marginLeft: dStyle.drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: dStyle.drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  links: {
    color: "inherit",
    textDecoration: "none",
  },
}));

function Sidebar() {
  const sections = useSelector((state) => state.global.sections, shallowEqual);
  const account = useSelector((state) => state.account);
  const show = useSelector((state) => state.sidebar.show);
  const cart = useSelector((state) => state.cart.show);
  const location = useLocation();
  const theme = useTheme();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(showSidebar(!show));
  };

  const followLink = (link) => {
    dispatch(showSidebar(false));
    history.push(link);
  };

  const logout = () => {
    localStorage.setItem("token", null);
    dispatch(log());
  };

  if (cart && show) {
    dispatch(showCart(false));
  }

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <List component="nav">
        <ListItemButton
          selected={location.pathname === "/"}
          onClick={() => followLink("/")}
        >
          <ListItemAvatar>
            <Avatar>
              <HomeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Home" />
        </ListItemButton>
        {/* <ListItemButton onClick={() => followLink("/storeadmin")}>
          <ListItemAvatar>
            <Avatar>
              <LockIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Admin" />
        </ListItemButton> */}
        <ListItemButton
          selected={location.pathname === "/storeadmin"}
          onClick={() => followLink("/storeadmin")}
        >
          <ListItemAvatar>
            <Avatar>
              <FontAwesomeIcon icon="sign-in-alt" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        {!account.email && (
          <ListItemButton
            selected={location.pathname === "/login"}
            onClick={() => followLink("/login")}
          >
            <ListItemAvatar>
              <Avatar>
                <FontAwesomeIcon icon="sign-in-alt" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Login" />
          </ListItemButton>
        )}
        {account.email && (
          <ListItemButton onClick={logout}>
            <ListItemAvatar>
              <Avatar>
                <FontAwesomeIcon icon="sign-out-alt" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Logout" />
          </ListItemButton>
        )}
        <Divider />
        {sections.map((section) => (
          <ListItemButton
            key={section.id}
            onClick={() => followLink(`/#${section.name}`)}
          >
            <ListItemAvatar>
              <Avatar>
                <Icon path={mdiRadioboxBlank} size={1} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={section.name} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={show}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default Sidebar;
