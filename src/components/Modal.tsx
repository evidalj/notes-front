import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface Props {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  actions?: boolean;
  onAccept?(): void;
  onCancel?(): void;
}

const Modal = (props: Props) => {
  return (
    <Dialog open={props.isOpen}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.content}</DialogContent>

      {props.actions && (
        <DialogActions>
          <Button variant="outlined" color="error" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={props.onAccept}>
            Accept
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
export default Modal;
