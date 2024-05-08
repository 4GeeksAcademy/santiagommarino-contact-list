import React, { useState } from "react";
import { Link } from "react-router-dom";


export const CreateAgenda = (props) => {

    const [inputBody, setInputBody] = useState(props.values ||
    {
        name: "",
        email: "",
        phone: "",
        address: ""
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setInputBody(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="modal p-3" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-light">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{props.title}</h1>
                        <button onClick={props.closeModal} type="button" className="btn-close" ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(e) => props.handleSubmit(e, inputBody)}>
                            <div className="mb-2">
                                <label className="form-label">Full Name</label>
                                <input name="name" value={inputBody.name} onChange={handleChange} type="text" className="form-control"></input>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Email</label>
                                <input name="email" value={inputBody.email} onChange={handleChange} type="email" className="form-control"></input>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Phone</label>
                                <input name="phone" value={inputBody.phone} onChange={handleChange} type="tel" className="form-control"></input>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Address</label>
                                <input name="address" value={inputBody.address} onChange={handleChange} type="text" className="form-control"></input>
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}