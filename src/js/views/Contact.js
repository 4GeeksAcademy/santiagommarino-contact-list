import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Context } from "../store/appContext";
import {DeleteAgenda} from "../component/DeleteAgenda";
import {DeleteContact} from "../component/DeleteContact";
import {CreateAgenda} from "../component/CreateAgenda";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";


const Contact = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const { username } = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [idDeleteContact, setIdDeleteContact] = useState(null)
    const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(false)
    const [editingValues, setEditingValues] = useState(undefined)

    useEffect(() => {
        actions.getSlugAgenda(username)
        actions.getContacts(username)
    }, [])

    const handleDeleteAgenda = async (slug) => {
        await actions.deleteSlugAgenda(slug)
        navigate("/")
    }

    const handleSubmit = async (e, data) => {
        e.preventDefault()
        if (!isCurrentlyEditing) {
            await actions.createContact(username, data)
        } else {
            await actions.updateContact(username, data.id, data)
        }
        setIsOpenCreate(false)
        setIsCurrentlyEditing(false)
    };

    const handleCreateContact = () => {
        setEditingValues(undefined)
        setIsOpenCreate(true)
    }

    const handleDeleteContact = (username, id) => {
        console.log(id)
        actions.deleteContact(username, id)
        setIdDeleteContact(null)
    }

    const handleUpdateContact = (_username, el) => {
        setEditingValues({
            name: el.name,
            email: el.email,
            phone: el.phone,
            address: el.address,
            id: el.id
        })
        setIsCurrentlyEditing(true)
    }

    return (
        <div className="container mb-5 col-md-6 mb-5 pb-5">
            {isOpen && <div>
                <DeleteAgenda name={username} close={() => setIsOpen(false)} delete={() => handleDeleteAgenda(username)} />
            </div>}
            <div className="mb-2 d-flex align-items-center justify-content-between">
                <h3 className="ms-1 mb-0">{username}'s Contacts</h3>
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <button onClick={() => handleCreateContact()} className="btn btn-primary">Create Contact</button>
                    <button onClick={() => setIsOpen(true)} className="btn btn-danger">Delete Agenda</button>
                </div>
            </div>
            <ul className="list-group mb-5 pb-5">
                {store.contacts?.map(el => (
                    <li className="container list-group-item d-flex gap-3 align-items-center" key={el.id}>
                        <img className="rounded-circle w-25 img-fluid" src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"></img>
                        <div className="d-flex flex-column flex-fill mb-3">
                            <p className="m-0 pb-1 fs-4 fw-bold">{el.name}</p>
                            <p className="m-0 fs-5"><IoLocationSharp /> {el.address}</p>
                            <p className="m-0 "><FaPhone /> {el.phone}</p>
                            <p className="m-0 "> <IoMdMail /> {el.email}</p>
                        </div>
                        <div className="float-end justify-self-end d-flex flex-column gap-2">
                            <button onClick={() => { handleUpdateContact(username, el) }} className="btn contact-buttons pb-2"><BsFillPencilFill /></button>
                            <button onClick={() => { setIdDeleteContact(el.id) }} className="btn contact-buttons pb-2"><BsFillTrash3Fill /></button>
                        </div>
                    </li>
                ))}
            </ul>
            {idDeleteContact && <div>
                <DeleteContact closeDeleteContact={() => setIdDeleteContact(null)} deleteContact={() => handleDeleteContact(username, idDeleteContact)} />
            </div>}
            {isOpenCreate && <div>
                <CreateAgenda title={!isCurrentlyEditing ? "Create New Contact" : "Edit Contact"} values={editingValues} handleSubmit={handleSubmit} slug={username} closeModal={() => setIsOpenCreate(false)} close={() => setIsOpenCreate(false)} />
            </div>}
            {isCurrentlyEditing && <div>
                <CreateAgenda title={!isCurrentlyEditing ? "Create New Contact" : "Edit Contact"} values={editingValues} handleSubmit={handleSubmit} slug={username} closeModal={() => setIsCurrentlyEditing(false)} close={() => setIsCurrentlyEditing(false)} />
            </div>}
        </div>
    )
}

export default Contact