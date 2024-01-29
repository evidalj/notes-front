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
  const [id, setId] = useState<number>(0);
  const [notes, setNotes] = useState<Array<NoteInterface>>([]);
  const [isEditNote, setEditnote] = useState<boolean>(false);
  const [modal, setModal] = useState({
    title: "Modal",
    isOpen: false,
    actions: true,
  });
  const noteService = NoteService.getInstance();
  const onAddNote = () => {
    setEditnote(false);
    setModal({ ...modal, isOpen: true, title: "Add new Note" });
  };
  const onSave = async () => {
    const note: NoteInterface = {
      id: id,
      title: title,
      description: description,
    };
    const response = isEditNote
      ? await noteService.updateNote(note)
      : await noteService.addNote(note);
    if (response.status === "success") {
      await getNotes();
    }
    cleanForm();
    setModal({ ...modal, isOpen: false });
  };
  const onDeleteNote = async (note: NoteInterface) => {
    const response = await noteService.deleteNote(note);
    console.log(response);
    if (response.status === "success") {
      await getNotes();
    }
  };
  const onEditNote = (note: NoteInterface) => {
    setEditnote(true);
    setModal({ ...modal, isOpen: true, title: "Edit note" });
    setId(note.id || 0);
    setTitle(note.title);
    setDescription(note.description);
    console.log(note);
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
  };
  const cleanForm = () => {
    setTitle("");
    setDescription("");
    setId(0);
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
                <Note note={note} onEdit={onEditNote} onDelete={onDeleteNote} />
              </Grid>
            ))
          : ""}
      </Grid>
      <Tooltip title="Add new note">
        <Fab
          onClick={onAddNote}
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          color="primary"
        >
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
