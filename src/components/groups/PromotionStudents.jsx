import * as React from 'react';
import { db } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Button, Form, ListGroup } from 'react-bootstrap';

const PromotionStudents = ({ promotion, group, students, promoId, setRefresh }) => {
    //console.log(students);
    const inputRef = React.useRef([]);

    const addStudents = async(e) => {
        e.preventDefault();
        const groupStudents = students.filter(student => 
                        promotion.groups[group-1].students.includes(student._id))
                                      .map(student => student._id)
        
        students.forEach(student => {
            if(inputRef.current[student._id].checked)
            groupStudents.push(student._id);
            //console.log(group.students);
            inputRef.current[student._id].checked = false;
        })
        console.log(groupStudents)
        const promo = {...promotion};
        promo.groups[group-1].students = groupStudents;

        const docRef = doc(db, 'promotions', promoId);
        console.log(promo.groups)
        updateDoc(docRef, {groups: promo.groups})
            .then(data =>{
                console.log(data);
                setRefresh(state => !state);
            })
            .catch(err =>{
                console.log(err);
            })
    
        }

    return ( 
        <>
            <h4 className='groups-section-header'> Promotion students </h4>
            <Form onSubmit={addStudents} style={{/*height: "100%"*/}}>
                <ListGroup as="ul" className="groups-section-list-group">
                {students.map(student => (

                    <ListGroup.Item as="li" key={student._id}>
                    <Form.Check
                        data-testid='form-check'
                        ref={el => inputRef.current[student._id] = el}
                        type="checkbox"
                        id={student._id}
                        label={`${student.lastName} ${student.firstName}`}
                        disabled={promotion.groups.filter(group => 
                                        group.students.includes(student._id.toString()))
                                                  .length !== 0 ? true : false}
                     />
                    </ListGroup.Item>

                ))}
                </ListGroup>
                <Button type="submit" className='groups-section-button'>
                    Add to Group { group }
                </Button>
            </Form>
        </>
     );
}
 
export default PromotionStudents;