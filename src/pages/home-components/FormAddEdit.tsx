import React from "react";
import { Grid, TextField } from "@mui/material";
interface Props {
  title: string | null;
  description: string | null;
  onChangeTitle(evt: React.ChangeEvent<HTMLInputElement>): void;
  onChangeDescription(evt: React.ChangeEvent<HTMLInputElement>): void;
}
const FormAddEdit = (props: Props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField value={props.title} onChange={props.onChangeTitle} fullWidth label="Note title" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={props.description}
          onChange={props.onChangeDescription}
          fullWidth
          multiline
          label="Description"
          maxRows={5}
        />
      </Grid>
    </Grid>
  );
};
export default FormAddEdit;
