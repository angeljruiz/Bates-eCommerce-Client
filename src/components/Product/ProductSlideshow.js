import React from "react";
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
import { useSelector, shallowEqual } from "react-redux";

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

const ProductSlideshow = ({ id }) => {
  const { name } =
    useSelector(
      (state) => state.products.find((p) => p.sku === id),
      shallowEqual
    ) || {};
  const classes = useStyles();

  const handleUpload = (event) => {
    console.log(URL.createObjectURL(event.currentTarget.files[0]));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div id="details" className={classes.details}>
          <div>
            <Typography gutterBottom variant="h4">
              {name}
            </Typography>
          </div>
          <Avatar className={classes.avatar} />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          component="label"
        >
          Upload picture
          <input
            type="file"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

export default ProductSlideshow;
