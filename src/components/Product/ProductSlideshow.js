import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    details: {
      display: "flex",
    },
    avatar: {
      marginLeft: "auto",
      height: 110,
      width: 100,
      flexShrink: 0,
      flexGrow: 0,
    },
    uploadButton: {
      marginRight: theme.spacing(2),
    },
  };
});

const ProductSlideshow = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: "Shen Zhi",
    city: "Los Angeles",
    country: "USA",
    timezone: "GTM-7",
    avatar: "/images/avatars/avatar_11.png",
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              John Doe
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.city}, {user.country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              11111
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={user.avatar} />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button className={classes.uploadButton} color="primary" variant="text">
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

ProductSlideshow.propTypes = {
  className: PropTypes.string,
};

export default ProductSlideshow;
