import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1400,
    position: "fixed",
    bottom: 0,
    left: 0,
    top: "auto",
  },

  buttons: {
    color: "white",
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar} component="footer">
      <Toolbar>
        <Typography>
          <strong>&copy; 2017 RB Implementations LLC</strong>
        </Typography>
        <div className="flex" />
        <IconButton size="small" aria-label="menu">
          <a
            href="https://www.linkedin.com/in/angel-ruiz-bates-1b68a2142/"
            className={classes.buttons}
          >
            <FontAwesomeIcon
              icon={["fab", "linkedin"]}
              size="lg"
              className="mr-2"
            />
          </a>
        </IconButton>
        <IconButton size="small" aria-label="menu">
          <a href="https://github.com/angeljruiz" className={classes.buttons}>
            <FontAwesomeIcon icon={["fab", "github"]} size="lg" />
          </a>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
