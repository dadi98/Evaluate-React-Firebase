import * as React from 'react';
//import axios from 'axios';
import { db } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';

const AddPromotion = ({show, onHide}) => {

    const [promotion, setPromotion] = React.useState({year: '', degree: '', major: '', numberOfGroups: 0, groups: []});
    
    //console.log(10);
    const addPromotion = async(e) => {
        e.preventDefault();
        
        for (let i=0; i<promotion.numberOfGroups; i++){
            promotion.groups.push({groupNumber: i+1, students: []})
        }

        const colRef = collection(db, 'promotions');
        //console.log(promotion);
        addDoc(colRef, promotion)
            .then(data =>{
                console.log(data);
            })
            .catch(err =>{
                console.log(err.message);
            })    

         /*try {
        
        await axios.post('http://localhost:3000/promotions', promotion);
        
        } catch (err) {
            if(err instanceof Error){
                console.log(err.message);
                //console.log(err.message);
            }
        }*/
    }
    //console.log(11);
    return (
        <div>
        <Modal size={'lg'} show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
            <Form onSubmit={e => {addPromotion(e); onHide();}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Promotion
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Academic year :</Form.Label>
                            <Form.Control type="text" placeholder="Academic year..." value={promotion.year}
                                        onChange={(e) => setPromotion(state => ({...state, year: e.target.value}))}/>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Degree :</Form.Label>
                            <Form.Select  onChange={(e) => setPromotion(state => ({...state, degree: e.target.value}))} aria-label="promotion select">
                                <option >choose..</option> 
                                <option value="License" >License</option>
                                <option value="Master" >Master</option>       
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Major :</Form.Label>
                            <Form.Select  onChange={(e) => setPromotion(state => ({...state, major: e.target.value}))} aria-label="semester select">
                                <option >choose..</option>
                                <option value="L1" >L1</option>
                                <option value="L2" >L2</option>
                                <option value="L3" >L3</option>
                                <option value="M1" >M1</option>
                                <option value="M2" >M2</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3" >
                            <Form.Label> Number of groups :</Form.Label>
                            <Form.Control type="text" 
                                          onChange={(e) => setPromotion(state => ({...state, numberOfGroups: e.target.value}))}/>
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

export default AddPromotion;