import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import PatientListItem from './PatientListItem';


export default observer( function PatientList(){
    const {patientStore} = useStore();
    const{patientsByDate} = patientStore;

    return (
           <Segment>
            <Item.Group divided>
                {patientsByDate.map(patient =>(
                    <PatientListItem key={patient.id} patient={patient} />
                ))}

            </Item.Group>
        </Segment>

    )
})