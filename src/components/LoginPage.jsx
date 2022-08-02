import * as React from 'react';
//import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db } from '../firebase/firebase';
//import { initializeApp } from 'firebase/app'
import { collection, getDoc, getDocs, query, snapshotEqual, where } from 'firebase/firestore';


import {Container, Row, Col, Button, Form, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function LoginPage({setUserInfo}) {
    
    
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    //console.log(getAuth(app))
    const Navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true);
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                const user = userCredential.user;
                const q = query(collection(db, 'users'), where("uid", "==", user.uid))
                //console.log(q);
                return getDocs(q)  
            })
            .then((snapshot) =>{
                setLoading(false);
                const user = {...snapshot.docs[0].data(), id: snapshot.docs[0].id};
                //return getDoc(user.student)
                //console.log(user);
                localStorage.setItem('user', JSON.stringify(user));
                setUserInfo(user);
            })
            
            .catch((err) => {
                console.log(err.code);
                setLoading(false);
                if (err.code=='auth/user-not-found') {
                    setError('wrong email or password!');
                } else if (err.code=='auth/network-request-failed'){
                    setError('check your internet connexion!');
                } else {
                    setError(err.code);
                }
            });
        /*try {
            const { data } = await axios.post('http://localhost:3000/users/login', {username, password})
            //console.log(data)
            if(data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                setUserInfo(data.user);
                Navigate('/');

            } 
        } catch (err) {
            console.log(err.response.status);
            if (err.response.status='401') {
                setError('Wrong Username or Password!');
            }
        }*/

    }
    
    return (
    <>
        <Container className="h-100 d-flex justify-content-center
                             align-items-center" >
            <Row  className="w-50 h-50 ">
                <Col md={9} className='mx-auto login-col rounded-3 '>
                    
                    <Form onSubmit={handleLogin} className='d-flex flex-column h-100'>
                        <h4 className='align-self-center p-4'>Login To Continue</h4>
                        <Form.Group  className="mb-3" >
                            <Form.Label className='cred-label'>Email : </Form.Label>
                            <Form.Control type="text" placeholder="enter email..." value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onClick={(e) => setError('')}/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password : </Form.Label>
                            <Form.Control type="password" placeholder="enter password..." value={password} 
                                        onChange={e => setPassword(e.target.value)}
                                        onClick={(e) => setError('')}/>
                        </Form.Group>
                        {error &&
                        <Alert variant="danger">
                            <Alert.Heading as="h4" className=''>{error}</Alert.Heading>
                        </Alert>
                        }
                    
                        <Button  type="submit" className='d-block mt-auto mb-3 login' > 
                           { loading ? <Spinner animation="border" variant="light" /> : "LOG IN" }  
                        </Button>
                        
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
    );
}

 