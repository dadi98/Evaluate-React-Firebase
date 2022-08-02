import * as React from 'react';

import { db } from '../../firebase/firebase';
import { collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore';

import PromotionStudents from './PromotionStudents';
import GroupsList from './GroupsList';
import GroupStudents from "./GroupStudents";

import { useParams } from 'react-router-dom'
import { Row, Col, Container} from 'react-bootstrap';



export default function GroupComponent () {
  console.log(JSON.parse({"major":"L3"}))
  const [promotion, setPromotion] = React.useState({});
  const [students, setStudents] = React.useState([]);
  const [group, setGroup] = React.useState();
  const [refresh, setRefresh] = React.useState(false);
  const [error, setError] = React.useState('');
  const { promoId } = useParams();
  console.log(JSON.stringify(promotion));
  
  React.useEffect(() => {
      
      const docRef = doc(db, 'promotions', promoId)
      const colRef = collection(db, 'students');
      
      getDoc(docRef)
        .then(doc => {
          setPromotion({_id: doc.id, ...doc.data()});
            return  getDocs(
                       query(colRef, where("major", "==", doc.data().major))
                    )
        })
        .then(snapshot => {
          // console.log(snapshot.docs)
          let students = []
          snapshot.docs.forEach(doc => {
            students.push({ ...doc.data(), _id: doc.id })
          }) 
          setStudents(students);
        })
        .catch(err =>{
          setError(err.message);
          console.log(error);
        })
    }, [refresh]);

  return (
    <>
        <div className='container m-1 groups-container'>
          <div className='row'>
              <div className='mb-4 bg-light '>
                <h5 className='p-3' >
                  Promotion {promotion.major}
                </h5>
              </div>
              <div className='col-lg-4 groups-section' style={{/*height: "38rem"*/}}>
                  <GroupsList promotion={promotion} setGroup={setGroup}/>
              </div>
            {group &&
              <>
              <div className='col-lg-4 groups-section' style={{/*height: "38rem"*/}}>
                  <PromotionStudents promotion={promotion}  group={group}  students={students}
                                     promoId={promoId}  setRefresh={setRefresh} />
              </div>
              <div className='col-lg-4 group-students groups-section' style={{/*height: "38rem"*/}}>
                  <GroupStudents promotion={promotion}  group={group}  students={students} 
                                 promoId={promoId}  setRefresh={setRefresh} />
              </div>
            </>}
          </div>
        </div>
    </>
  );
}