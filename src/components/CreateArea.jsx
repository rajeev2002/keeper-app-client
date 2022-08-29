import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    note: ""
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setNote((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleClick = (event) => {
    props.addNotes(note);
    setNote(() => {
      return { title: "", note: "" };
    });
    event.preventDefault();
  };

  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          value={note.title}
          placeholder="Title"
        />
        <textarea
          onChange={handleChange}
          name="note"
          value={note.note}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={handleClick}><AddIcon /></button>
      </form>
    </div>
  );
}

export default CreateArea;
