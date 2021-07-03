import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Surgery } from '../../../app/models/surgery';
import { useStore } from '../../../app/stores/store';

interface Props {
    surgery: Surgery
}

export default function SurgeryListItem({ surgery }: Props) {
    const { surgeryStore } = useStore();
    const { deleteSurgery, loading } = surgeryStore;
    return (
        <Segment.Group>

            <Segment>
                <p> {surgery.SurgeryName}</p>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/surgeries/${surgery.Id}`}>
                                {surgery.SurgeryName} Operacion i zemres
                            </Item.Header>
                            <Item.Description>Pershkrim i operacionit</Item.Description>
                            {surgery.Description} Operacioni kaloi me sukses
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="dollar" />{surgery.Pagesa} 100.00
                    <br />
                    <Icon name='map marker' />{surgery.Terapia} Paracetamol 2 x 1 ne dite
                </span>
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`#`}
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={() => deleteSurgery(surgery.Id)}
                    type='submit'
                    disabled={loading}
                />
                <Button
                    as={Link}
                    to={`/surgeries/${surgery.Id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}