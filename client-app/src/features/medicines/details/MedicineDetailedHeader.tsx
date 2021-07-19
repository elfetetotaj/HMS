import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Medicine } from '../../../app/models/medicine';
import { useStore } from '../../../app/stores/store';

const medicineImageStyle = {
    filter: 'brightness(30%)'
};

const medicineImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '2%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    medicine: Medicine
}

export default observer (function MedicineDetailedHeader({medicine}: Props) {
    const {medicineStore: {loading}} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/departmentImages/${medicine.medicineName}.jpg`} fluid style={medicineImageStyle}/>
                <Segment style={medicineImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={medicine.medicineName}
                                    style={{color: 'white'}}
                                />
                                <p style={{marginRight: 10}}>
                                    {medicine.medicineDescription}
                                </p>
                                <p style={{marginRight: 10}}>
                                    {medicine.medicineDepartment}
                                </p>
                                <p style={{marginRight: 10}}>
                                    {medicine.medicinePrice}€
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button as={Link} to='/medicines' color='orange' floated='right'>
                    Cancel
                </Button>
                <Button as={Link} to={`/managemedicine/${medicine.id}`} color='orange' floated='right'>
                    Manage Medicine
                </Button>
            </Segment>
            {/* <Segment clearing attached='bottom'>
                {department.isHost ? (
                    <Button as={Link} to={`/managedepartment/${department.id}`} color='orange' floated='right'>
                        Manage Event
                    </Button>
                ) : department.isDoctor ? (
                    <Button loading={loading} onClick={updateAttendance}>Cancel attendance</Button>
                ) : (
                    <Button loading={loading} onClick={updateAttendance} color='teal'>Join Activity</Button>
                )}
            </Segment> */}
        </Segment.Group>
    )
})