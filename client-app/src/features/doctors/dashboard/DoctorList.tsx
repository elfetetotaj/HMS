import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import DoctorListItem from './DoctorListItem';


export default observer( function DoctorList(){
    const {doctorStore} = useStore();
    const{doctorsByDate} = doctorStore;

    return (
           <Segment>
            <Item.Group divided>
                {doctorsByDate.map(doctor =>(
                    <DoctorListItem key={doctor.id} doctor={doctor} />
                ))}

            </Item.Group>
        </Segment>

    )
})