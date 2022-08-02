import * as React from 'react';
//import axios from 'axios';
import { db } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';


const AddStudent = ({show, onHide}) => {

    const [studentId, setStudentId] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [sex, setSex] = React.useState('');
    const [degree, setDegree] = React.useState('');
    const [major, setMajor] = React.useState('');
    //console.log(10);
    const addStudent = (e) => {
        e.preventDefault();
        const colRef = collection(db, 'students');
        addDoc(colRef, {studentId ,firstName ,lastName ,sex ,degree ,major})
            .then(data =>{
                console.log(data.docs);
            })
            .catch(err =>{
                console.log(err.message);
            })            
    }
    
    //console.log(11);
    return (
        <div>
        <Modal size={'lg'} show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
            <Form onSubmit={e => {addStudent(e); onHide();}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add student
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control type="text" placeholder="Student ID" value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)}/>
                    </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Sex</Form.Label>
                        <Form.Select onChange={(e) => setSex(e.target.value)} aria-label="sex select">
                            <option >choose..</option>
                            <option value="male" >Male</option>
                            <option value="female" >Female</option>
                            
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Degree</Form.Label>
                        <Form.Select onChange={(e) => setDegree(e.target.value)} aria-label="degree select">
                            <option >choose..</option>
                            <option value="Licence" >Licence</option>
                            <option value="Master" >Master</option>
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Major</Form.Label>
                        <Form.Select onChange={e => setMajor(e.target.value)} aria-label="promotion select">
                            <option >choose..</option>
                            <option value="L1" >L1</option>
                            <option value="L2" >L2</option>
                            <option value="L3" >L3</option>
                            <option value="M1" >M1</option>
                            <option value="M2" >M2</option>
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>           
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} >Close</Button>
                <Button type="submit" >Add</Button>
            </Modal.Footer>
            </Form>
        </Modal>
        </div>
    )
}

export default AddStudent;