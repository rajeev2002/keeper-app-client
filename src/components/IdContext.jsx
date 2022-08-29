import React,{useState,createContext} from "react";

export const IdContext = createContext();

export const IdProvider = (props) => {

    const [id,setId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const updateId = (newId) => {
        setId(newId);
    };

    return(
        <IdContext.Provider value={[id, updateId, isLoggedIn, setIsLoggedIn, isLoading, setIsLoading]}>
            {props.children}
        </IdContext.Provider>
    );
}
