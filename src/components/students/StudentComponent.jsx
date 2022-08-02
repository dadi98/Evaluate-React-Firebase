import * as React from 'react';
//import axios from 'axios';
import { db } from '../../firebase/firebase';
import {
  collection ,getDocs
} from 'firebase/firestore'

import { Row, Col, Container, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';

import AddStudent from './AddStudent';
import DeleteStudent from './DeleteStudent';
import EditStudent from './EditStudent';
//import DeleteAll from './DeleteAll';

export default function StudentComponent () {

  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState();

  const [addModal, setAddModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  
  const [editModal, setEditModal] = React.useState(false);
  const [id, setId] = React.useState();
  
  const [refresh, setRefresh] = React.useState(false);

  const [q, setQ] = React.useState('');
  const [searchParam] = React.useState(["studentId", "firstName", "lastName", "major"]);
  


  // console.log(rows);
  React.useEffect(() => {
    const colRef = collection(db, 'students');
    getDocs(colRef)
      .then(snapshot => {
        // console.log(snapshot.docs)
        let students = []
        snapshot.docs.forEach(doc => {
          students.push({ ...doc.data(), _id: doc.id })
        })
        //console.log(students)
        setRows(students);
      })
      .catch(err =>{
        setError(err.message);
        console.log(error);
      })
    }, [refresh, addModal, deleteModal, editModal, error]);

  const Search = (items) => {
    return items.filter(item => 
                        searchParam.some(param => 
                                         item[param].toString().toLowerCase().indexOf(q.toLowerCase()) > -1))
  }

  return (
    <>
      <div className=''>
        <Container fluid className='inputs-container bg-white ' >
          <Row className="inputs-row">
            <Col md={2} className=''>
              <Button variant=""
                      onClick={() => setAddModal(true)} 
                      className='inputs-button button-primary'>Add student</Button>
            </Col>
            <Col md={2} className=''>
              <Button variant=""
                       onClick={() => setRefresh(!refresh)}
                       className='inputs-button button-secondary' >Refresh</Button>
            </Col>
            {/*<Col md={3} >
              <Button variant="primary"
                      onClick={() => setDeleteAllModal(true)} 
                      className='inputs-button'>Delete All</Button>
            </Col>*/}
            <Col md={5} className='ms-auto'>
              <Form.Control type="search" placeholder="Search..."
                            value={q} className='inputs-button'
                             onChange={(e) => setQ(e.target.value)}/>
            </Col>
          </Row>
        </Container>
        <div className='tables' >
        {rows.length !== 0 && Search(rows).length !== 0 ?
        
        (
          <table className="table table-striped table-hover student-table" >
          
          <thead>
            <tr>
              <th>actions</th>
              <th>Student ID</th>
              <th>first Name</th>
              <th>Last Name</th>
              <th>Sex</th>
              <th>Degree</th>
              <th>Major</th>
            </tr>
          </thead>
          <tbody>
            {Search(rows).map(item => (
              <tr key={item._id} >
                <td>
                    <DropdownButton size="sm" id="dropdown-basic-button" title="">
                      <Dropdown.Item  onClick={() => {setId(item._id); setEditModal(true);}} >  Edit</Dropdown.Item>
                      <Dropdown.Item  onClick={() => {setId(item._id); setDeleteModal(true);}} >  Delete</Dropdown.Item>
                    </DropdownButton>
                </td>
                <td>{item.studentId}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.sex}</td>
                <td>{item.degree}</td>
                <td>{item.major}</td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (<h2 className='d-flex justify-content-center p-4' >No Students To Show !</h2>)}
        </div>
      <div>
        
        

        {addModal && <AddStudent show={addModal} onHide={() => setAddModal(false)}/>}
        {deleteModal && <DeleteStudent show={deleteModal} onHide={() => setDeleteModal(false)} id={id}/>}
        {/*deleteAllModal && <DeleteAll show={deleteAllModal} onHide={() => setDeleteAllModal(false)}/>*/}
        {editModal && <EditStudent show={editModal} onHide={() => setEditModal(false)} data={rows} id={id}/>}
      </div>
      </div>
    </>
  );
}



