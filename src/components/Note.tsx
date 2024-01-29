import React from "react";
import { Button, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { NoteInterface } from "../interfaces/notes";
interface Props {
  note: NoteInterface
}
const Note = (props: Props) => {
  const {note} = props;
  return (
    <Card>
      <CardHeader title={note.title} />
      <CardContent>{note.description}</CardContent>
      <CardActions>
        <Button>Editar</Button>
      </CardActions>
    </Card>
  );
};
export default Note;
