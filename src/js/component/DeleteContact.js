import React from "react";


export const DeleteContact = (props) => {
    return (
        <div className="modal p-3" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-light">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Delete this contact?</h1>
                        <button onClick={props.closeDeleteContact} type="button" className="btn-close" ></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this contact? It might be important.
                    </div>
                    <div className="modal-footer">
                        <button onClick={props.closeDeleteContact} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button onClick={props.deleteContact} type="button" className="btn btn-danger">Yes, Delete.</button>
                    </div>
                </div>
            </div>
        </div>
    )
}