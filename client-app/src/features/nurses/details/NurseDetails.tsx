import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default observer (function NurseDetails() {

    const {nurseStore} = useStore();
    const {selectedNurse: nurse, loadNurse, loadingInitial} = nurseStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadNurse(id);
    },[id, loadNurse]);

    if (loadingInitial || !nurse ) return <LoadingComponent />;

    return (
        <Card fluid>
             {/* <Image src={`/assets/departmentImages/${department.departmentName}.jpg`} /> */}
            <Card.Content>
                <Card.Header>{nurse.emri}</Card.Header>
                <Card.Meta>
                    <span>{nurse.qyteti}</span>
                </Card.Meta>
                <Card.Description>
                    <div>{nurse.emri}, {nurse.mbiemri}</div>
                    <div>{nurse.gjinia}, {nurse.paga}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/manage/${nurse.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to={'/nurses'} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
} )