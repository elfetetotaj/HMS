import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Farmacist } from '../../../app/models/farmacist';

const FarmacistImageStyle = {
    filter: 'brightness(30%)'
};

const FarmacistImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    farmacist: Farmacist
}

export default observer (function FarmacistDetailedHeader({farmacist}: Props) {
    return (
        
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
            <Image src={`/assets/farmacistImages/${farmacist.emri}.jpg`} fluid style={FarmacistImageStyle } />
                <Segment style={FarmacistImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                   

                                      
                                    style={{color: 'white'}}
                                >{farmacist.emri} {farmacist.mbiemri}</Header>
                                
                               
                                   <p>
                                    Filloje punen me daten:
                                </p>
                                <p>
                                    {format (farmacist.dateOfJoining!, 'dd MMM yyyy')}
                                </p>
                             
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {/* <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button> */}
                <Button as={Link} to={`/managefarmacist/${farmacist.id}`} color='orange' floated='right'>
                    Edit farmacist
                </Button>
            </Segment>
        </Segment.Group>
    )
})