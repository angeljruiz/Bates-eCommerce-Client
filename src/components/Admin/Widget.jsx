import React from "react";
import {
  Paper,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    overflow: "scroll",
  },

  paper: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  modal: {
    overflow: "scroll",
    padding: theme.spacing(2, 2),
  },

  modalContainer: {
    outline: 0,
  },

  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(1),
  },

  fabButton: {
    fontWeight: "bolder",
  },

  toolbar: theme.mixins.toolbar,
}));

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

function adjustTitle(title) {
  var result = title.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function adjustData(data) {
  if (typeof data === "boolean") return String(data);
  return data;
}

export default function Widget({
  name,
  list,
  action,
  buttonAction,
  buttonText,
}) {
  const classes = useStyles();

  if (!list || list.length === 0) return <></>;

  return (
    <>
      <Paper className={classes.root}>
        <Title>{name}</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              {Object.keys(list[0]).map((k, i, self) => (
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
            {list.map((l, j) => {
              return (
                <TableRow
                  onClick={() => (action ? action(j) : "")}
                  hover
                  key={j}
                >
                  {Object.keys(l).map((k, i, self) => (
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

        <Button onClick={buttonAction} color="primary">
          {buttonText}
        </Button>
      </Paper>
    </>
  );
}
