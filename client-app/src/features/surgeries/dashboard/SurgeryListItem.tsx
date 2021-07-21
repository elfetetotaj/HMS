import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Surgery } from '../../../app/models/surgery';
import { useStore } from '../../../app/stores/store';

interface Props {
    surgery: Surgery;
}

export default function SurgeryListItem({ surgery }: Props) {
    const { surgeryStore } = useStore();
    const { deleteSurgery, loading } = surgeryStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src={`/assets/surgeryImages/surgeryImg.png`} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/surgeries/${surgery.id}`}>
                                {surgery.surgeryName}
                            </Item.Header>
                            {/* <Item.Description>{surgery.description}</Item.Description> */}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='info' />Pershkrimi: {surgery.description}
                </span>
            </Segment>
            <Segment>
                <span>
                    <Icon name='currency' /> Pagesa: {surgery.pagesa}
                </span>
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`#`}
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={() => {if(window.confirm('Are you sure?')){deleteSurgery(surgery.id)};}} 
                    type='submit'
                    disabled={loading}
                />
                <Button
                    as={Link}
                    to={`/surgeries/${surgery.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}



