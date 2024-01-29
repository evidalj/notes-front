import React, { useEffect, useState } from "react";
import { Container, Fab, Grid, TextField, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import Modal from "../components/Modal";
import FormAddEdit from "./home-components/FormAddEdit";
import Note from "../components/Note";
import NoteService from "../services/note";
import { NoteInterface } from "../interfaces/notes";
import { Response } from "../interfaces/response";
const HomePage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [notes, setNotes] = useState<Array<NoteInterface>>([]);
  const [modal, setModal] = useState({
    title: "Modal",
    isOpen: false,
    actions: true,
  });
  const noteService = NoteService.getInstance();
  const onAddNote = () => {
    setModal({ ...modal, isOpen: true, title: "Add new Note" });
  };
  const onSave = () => {
    console.log({ title, description });
  };
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const onCloseModal = () => {
    setModal({ ...modal, isOpen: false });
  };
  const getNotes = async () => {
    const notes: Response = (await noteService.getNotes()) as Response;
    setNotes(notes.data);
    console.log(notes);
  };

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField variant="outlined" label="Search Note" fullWidth />
        </Grid>
        {notes.length > 0
          ? notes.map((note: NoteInterface, index: number) => (
              <Grid item xs={12} sm={3} key={index}>
                <Note note={note}/>
              </Grid>
            ))
          : ""}
      </Grid>
      <Tooltip title="Add new note">
        <Fab onClick={onAddNote} sx={{ position: "absolute", bottom: 16, right: 16 }} color="primary">
          <Add />
        </Fab>
      </Tooltip>
      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        content={
          <FormAddEdit
            title={title}
            description={description}
            onChangeTitle={onChangeTitle}
            onChangeDescription={onChangeDescription}
          />
        }
        actions={modal.actions}
        onAccept={onSave}
        onCancel={onCloseModal}
      />
    </Container>
  );
};
export default HomePage;
