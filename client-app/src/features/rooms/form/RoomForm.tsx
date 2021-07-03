import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { Room } from '../../../app/models/room';


export default observer(function RoomForm(){
    const history = useHistory();
    const { roomStore } = useStore();
    const { createRoom, updateRoom, 
            loading, loadRoom, loadingInitial } = roomStore;
    const {id} = useParams<{ id: string }>();

    const [room, setRoom] = useState<Room>({ 
        id: '',
        type: '',
        total_bed: '',
        total_bed_occupied: '',
        stauts: '',
        floor_no: ''
    });

    const validationSchema = Yup.object({
        type: Yup.string().required(),
        total_bed: Yup.string().required(),
        total_bed_occupied: Yup.string().required(),
        status: Yup.string().required(),
        floor_no: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadRoom(id).then(room => setRoom(room!))
    }, [id, loadRoom]);

      function handleFormSubmit(room: Room){
       if (room.id.length === 0 ) {
           let newRoom ={
               ...room,
               id:uuid()
           };
           createRoom(newRoom).then(() => history.push(`/rooms/${newRoom.id}`))
       }else{
           updateRoom(room).then(() => history.push(`/rooms/${room.id}`))
       }
    }

    if(loadingInitial) return <LoadingComponent content='Loading room...' />

    return(
        <Segment clearing>
            <Header content='Room Details' sub color='teal' />
            <Formik 
            validationSchema ={validationSchema}
            enableReinitialize 
            initialValues={room} 
            onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                    <MyTextInput name='type' placeholder='Type' />
                    <MyTextInput placeholder ='total_bed'   name='total_bed' />
                    <MyTextInput placeholder ='total_bed_occupied'    name='total_bed_occupied'  />
                    <MyTextInput placeholder ='status'   name='status'  />
                    <MyTextInput placeholder ='floor_no'    name='floor_no'  />//
                    <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} 
                        floated = 'right'
                        positive type='submit' 
                        content='Submit' />
                    <Button as={Link} to='/rooms' floated = 'right'  type='button' content='Cancel' />  
                </Form>                 
                )}
            </Formik>
        </Segment>
    )
})