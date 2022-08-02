import * as React from 'react';
//import axios from 'axios';
import { db } from '../../firebase/firebase';
import { updateDoc, doc } from 'firebase/firestore';

import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';

const EditStudent = ({show, onHide, data, id}) => {
  
    let student = data.filter((item => item._id === id))[0];
  
    //console.log(data!.filter((item => item._id === hash))[0]);
      
    const [studentId, setStudentId] = React.useState(student.studentId);
    const [firstName, setFirstName] = React.useState(student.firstName);
    const [lastName, setLastName] = React.useState(student.lastName);
    const [sex, setSex] = React.useState(student.sex);
    const [degree, setDegree] = React.useState(student.degree);
    const [major, setMajor] = React.useState(student.major);

    const editStudent = async(e) => {
      e.preventDefault();
      const docRef = doc(db, 'students', id);
      updateDoc(docRef, {studentId ,firstName ,lastName ,sex ,degree ,major})
        .then(data =>{
          console.log(data);
        })
        .catch(err =>{
          console.log(err);
        }) 
    }
  
    return (
      <div>
        <Modal size={'lg'} show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
          <Form onSubmit={e => {editStudent(e); onHide();}}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit student
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
              <Container>
              <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>Student ID</Form.Label>
                      <Form.Control type="text" placeholder="Student ID" value={studentId}
                                    onChange={e => setStudentId(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>First name</Form.Label>
                      <Form.Control type="text" placeholder="First name" value={firstName}
                                    onChange={e => setFirstName(e.target.value)}/>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>Last name</Form.Label>
                      <Form.Control type="text" placeholder="Last name" value={lastName} 
                                    onChange={e => setLastName(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>Sex</Form.Label>
                      <Form.Select onChange={(e) => setSex(e.target.value)} value={sex} aria-label="sex select">
                            
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
                      <Form.Select onChange={e => setDegree(e.target.value)} value={degree} aria-label="degree select">
                          <option value="Licence" >Licence</option>
                          <option value="Master" >Master</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" >
                      <Form.Label>Major</Form.Label>
                      <Form.Select onChange={(e) => setMajor(e.target.value)} value={major} aria-label="major select">
                            
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
              <Button type="submit" >edit</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    )
  }

export default EditStudent;