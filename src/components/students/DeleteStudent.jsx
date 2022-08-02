import * as React from 'react';
//import axios from 'axios';
import { db } from '../../firebase/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';

import { Modal, Button} from 'react-bootstrap';

const DeleteStudent = ({show, onHide, id}) => {
  
    const deleteStudent = (e) => {
      //const id = window.location.hash.substring(1);
      console.log(id);
      e.preventDefault();
      
      const docRef = doc(db, 'students', id);
      deleteDoc(docRef)
        .then(data =>{
          console.log(data);
        })
        .catch(err =>{
          console.log(err);
        })
    }
    //console.log(20);
    return (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete a student!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this student ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => {deleteStudent(e); onHide();}}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

export default DeleteStudent;