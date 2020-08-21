import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import {
  Grid,
  Paper,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  makeStyles,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "scroll",
    padding: theme.spacing(2),
  },
}));

function Orders() {
  const orders = useSelector((state) => state.global.dash.orders, shallowEqual);
  const classes = useStyles();
  const history = useHistory();

  function adjustData(data) {
    if (typeof data === "boolean") return String(data);
    return data;
  }

  function adjustTitle(title) {
    var result = title.replace(/([A-Z])/g, " $1").replace("_", " ");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  if (orders.length === 0) return <></>;

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Orders
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {Object.keys(orders[0])
                    .filter(
                      (k) => !["finalized", "line1", "cid", "city"].includes(k)
                    )
                    .map((k, i, self) => (
                      <TableCell
                        align={i === self.length - 1 ? "right" : "inherit"}
                        key={i}
                      >
                        {adjustTitle(k)}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((l, j) => {
                  return (
                    <TableRow
                      hover
                      key={j}
                      onClick={() => history.push(`/orders/${l.cid}`)}
                    >
                      {Object.keys(l)
                        .filter(
                          (k) =>
                            !["finalized", "line1", "cid", "city"].includes(k)
                        )
                        .map((k, i, self) => (
                          <TableCell
                            align={i === self.length - 1 ? "right" : "inherit"}
                            key={i}
                          >
                            {adjustData(l[k])}
                          </TableCell>
                        ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* <Button o color="primary">
              JI
            </Button> */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Orders;
