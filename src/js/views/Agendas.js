import React from "react";
import { Context } from "../store/appContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Agendas = () => {
    const { store, actions } = useContext(Context)
    const [input, setInput] = useState("")
    const navigate = useNavigate()

    const handleEnter = (evt) => {
        if (evt.key === "Enter") {
            actions.createSlugAgenda(input)
            
            setInput("")
        }
    }

    const handleSelectSlug = async (username) => {
        const slugJson = await actions.getSlugAgenda(username);
        navigate(`/contact/${slugJson.slug}`)
    }


    return (
        <div className="agendas-container">
            <h1>Select your agenda or create one below</h1>
            <ul className="agendas-list">
                {store.agendas?.map((el) => (
                    <li onClick={() => handleSelectSlug(el.slug)} key={el.id}>{el.slug}</li>
                ))}
            </ul>
            <div className="input-group">
                <input type="text" onKeyDown={handleEnter} onChange={e => setInput(e.target.value)} value={input}></input>
                <button onClick={() => { actions.createSlugAgenda(input); setInput(""); }}>Create Agenda</button>
            </div>
        </div>
    );
};

export default Agendas