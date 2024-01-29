import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { NoteInterface } from "../interfaces/notes";
interface Props {
  note: NoteInterface;
  onEdit(note: NoteInterface): void;
  onDelete(note: NoteInterface): void;
}
const Note = (props: Props) => {
  const { note } = props;
  const onEditNote = () => {
    props.onEdit(note);
  };
  const onDeleteNote = () => {
    props.onDelete(note);
  };
  return (
    <Card>
      <CardHeader title={note.title} />
      <CardContent>{note.description}</CardContent>
      <CardActions>
        <Button color="error" onClick={onDeleteNote}>
          Delete note
        </Button>
        <Button onClick={onEditNote}>Edit note</Button>
      </CardActions>
    </Card>
  );
};
export default Note;
