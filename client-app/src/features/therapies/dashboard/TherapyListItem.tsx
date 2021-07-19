import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Therapy } from '../../../app/models/therapy';
import { useStore } from '../../../app/stores/store';

interface Props {
    therapy: Therapy
}

export default function TherapyList({ therapy }: Props) {
    const { therapyStore } = useStore();
    const { deleteTherapy, loading } = therapyStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/therapyImages/therapy1.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/therapies/${therapy.id}`}>
                                {therapy.therapyName}
                            </Item.Header>
                            <Item.Description>Terapia</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span><Icon name='info' /> Pershkrimi i terapise: {therapy.pershkrimi}  </span>
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`#`}
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={() => {if(window.confirm('Are you sure?')){deleteTherapy(therapy.id)};}} 
                    type='submit'
                    disabled={loading}
                />
                <Button
                    as={Link}
                    to={`/therapies/${therapy.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}