import * as React from 'react';
import { ListGroup } from 'react-bootstrap';

const GroupsList = ({ promotion, setGroup }) => {

    const selectGroup = (number) => {
        setGroup(number);
      }

    return ( 
        <>
            <h4 className='groups-section-header'> Groups </h4>
            <div className="groups-section-list-group">
                <ListGroup as="ul" >
                    {promotion.groups?.map(group => 
                        <ListGroup.Item key={group.groupNumber} as="li" 
                                        action variant='light' 
                                        onClick={() => selectGroup(group.groupNumber)} 
                                        className="d-flex"> 
                        Group {group.groupNumber}
                        {/*<FontAwesomeIcon onClick={() => deleteGroup(group._id)} 
                                            icon={faTrashCan} 
                                        className='trash-icon' />*/}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        </>
     );
}
 
export default GroupsList;