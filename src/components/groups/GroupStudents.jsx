import * as React from 'react';
import { db } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

const GroupStudents = ({ promotion, group, students, promoId, setRefresh }) => {

    const groupStudents = students.filter(student => 
                                   promotion.groups[group-1].students.includes(student._id))
                                   

    const removeFromGroup = async( e, studentId ) =>  {
        e.preventDefault();
        
        const promo = {...promotion};
        promo.groups[group-1].students = groupStudents.filter(student => student._id !== studentId)
                                                      .map(student => student._id)
        console.log(promo.groups[group-1].students);

        const docRef = doc(db, 'promotions', promoId);
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
            <h4 className='groups-section-header'> Group { group } </h4>
            <ListGroup as="ul" className="groups-section-list-group">
                {groupStudents.map(student => (
                    <ListGroup.Item as="li" key={student._id} style={{display:'flex'}}>
                        {student.lastName} {student.firstName} {`        `}
                        
                        <FontAwesomeIcon onClick={(e) => removeFromGroup(e, student._id)} 
                                        icon={faTrashCan} 
                                        className='trash-icon' />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
     );
}
 
export default React.memo(GroupStudents);