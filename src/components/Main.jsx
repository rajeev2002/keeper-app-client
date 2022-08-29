import React, { useEffect, useState, useContext } from "react";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import { IdContext } from "./IdContext";
import Spinner from "./Spinner";

function Main() {
  const [notes, setNotes] = useState([]);
  const [id,updateId,isLoggedIn, setIsLoggedIn, isLoading, setIsLoading] = useContext(IdContext);
  
  useEffect( () => {
    const fetchData = async () => {
      if(id){
        await fetchNotes(`https://evening-sea-82640.herokuapp.com/api/notes?id=${id}`);
        return;
      }
      const tempId=localStorage.getItem("KeeperAppId");
      if(!tempId){
        await createUser();
        return;
      }
      updateId(tempId);
      await fetchNotes(`https://evening-sea-82640.herokuapp.com/api/notes?id=${tempId}`);
    }

    fetchData();
  },[]);

  const createUser = async() => {
    try {
      const data = await axios.get("https://evening-sea-82640.herokuapp.com/api/newUser");
      updateId(data.data);
      localStorage.setItem("KeeperAppId",data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchNotes = async(url)=>{
    setIsLoading(true);
    try{
        const response = await axios.get(url);
        setNotes(response.data);
        if(response)
         setIsLoading(false);
      }
      catch(err){
        console.log(err);
      }
  }

  const addNotes = async (note) => {

    const url = "https://evening-sea-82640.herokuapp.com/api/notes";

    const data ={
      id : id,
      title: note.title,
      body: note.note
    };

    try{
      const response = await axios.post(url+"/add",data);
    }
    catch(err){
      console.log(err);
    }

    setNotes((prevValue) => [...prevValue, note]);

  };

  const deleteNote = async (noteId) => {

    const url = "https://evening-sea-82640.herokuapp.com/api/notes";

    const data ={
      userId : id,
      noteId : noteId
    };

    try{
      const response = await axios.post(url+"/delete",data);
      console.log(response);
    }
    catch(err){
      console.log(err);
    }

    setNotes((prevValue) => prevValue.filter((note, index) => note._id !== noteId));
  };

  return (
    <div>
      <CreateArea addNotes={addNotes} />
      {isLoading && <Spinner />}
       {notes.map((note, index) => (
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          note={note.note}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default Main;