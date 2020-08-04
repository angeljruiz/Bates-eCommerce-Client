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

export default function Widget({ name, list, action, buttonAction }) {
  const classes = useStyles();

  if (!list || list.length === 0) return <></>;

  return (
    <>
      <Paper className={classes.root}>
        <Title>{name}s</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              {Object.keys(list[0]).map((k, i) => (
                <TableCell key={i}>{k}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((l, j) => {
              return (
                <TableRow onClick={() => action(j)} hover key={j}>
                  {Object.keys(l).map((k, i) => (
                    <TableCell key={i}>{l[k]}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Button onClick={buttonAction} color="primary">
          Add a {name}
        </Button>
      </Paper>
    </>
  );
}
