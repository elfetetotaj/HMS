import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function NurseList() {
    const {nurseStore} = useStore();
    const {deleteNurse, nursesByDate, loading} = nurseStore

    const [target, setTarget] = useState('');

    function handleNurseDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteNurse(id);
    }


    return ( //video 5.7
        <Segment>
            <Item.Group divided>
                {nursesByDate.map(nurse  => (
                    <Item key={nurse.id}>
                        <Item.Content> 
                            <Item.Header as='a'>{nurse.emri}</Item.Header>
                            <Item.Description>
                                <div>{nurse.datelindja}, {nurse.gjinia}</div>
                                <div>{nurse.qyteti}</div>
                                <div>{nurse.email}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/nurses/${nurse.id}`} floated='right' content='View' color='blue' />
                                <Button 
                                    name={nurse.id}
                                    loading={loading && target === nurse.id} 
                                    onClick={(e) => handleNurseDelete(e, nurse.id)} 
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
});