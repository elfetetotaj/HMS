import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer (function ReceptionistList() {
    const {receptionistStore} = useStore();
    const {deleteReceptionist, receptionistsByDate, loading } = receptionistStore;

    const [target, setTarget] = useState('');

    function handleReceptionistDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteReceptionist(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {receptionistsByDate.map(receptionist => (
                    <Item key={receptionist.id}>
                        <Item.Content>
                            <Item.Header as='a'>{receptionist.username}</Item.Header>
                            <Item.Meta>{receptionist.dob}</Item.Meta>
                            <Item.Description>
                                <div>{receptionist.name}, {receptionist.lastName}</div>
                                <div>{receptionist.city}, {receptionist.country} , {receptionist.department}</div>
                                <div>{receptionist.email}, {receptionist.gender}, {receptionist.street_address}</div>
                            </Item.Description>
                            <Item.Extra>
                            <Button onClick={() => receptionistStore.selectReceptionist(receptionist.id)} floated='right' content='View' color='blue' />
                                <Button 
                                    name={receptionist.id}
                                    loading={loading && target === receptionist.id} 
                                    onClick={(e) => handleReceptionistDelete(e, receptionist.id)} 
                                    floated='right' 
                                    content='Delete'
                                     color='red' 
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
} )