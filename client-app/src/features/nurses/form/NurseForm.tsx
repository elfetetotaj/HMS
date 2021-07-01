import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik,Form} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';

import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Nurse } from '../../../app/models/nurse';


export default observer(function NurseForm() {
    const history = useHistory();
    const {nurseStore} = useStore();
    const{createNurse, updateNurse, loading, loadNurse, loadingInitial} = nurseStore;
    const {id} = useParams<{id: string}>();

    const [nurse, setNurse] = useState<Nurse>({
        id: '',
        emri: '',
        mbiemri: '',
        username: '',
        datelindja: null,
        adresa: '',
        qyteti: '',
        email: '',
        gjinia: '',
        paga:  0,
        department:''
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required(),
        mbiemri: Yup.string().required(),
        username: Yup.string().required(),
        datelindja: Yup.string().required('Date is required!').nullable(),
        adresa: Yup.string().required(),
        qyteti: Yup.string().required(),
        email: Yup.string().required(),
        gjinia: Yup.string().required(),
        paga: Yup.string().required()

    })

    useEffect(() => {
        if(id) loadNurse(id).then(nurse => setNurse(nurse!))
    },[id, loadNurse]);


    function handleFormSubmit(nurse:Nurse) {
       if(nurse.id.length === 0){
           let newNurse = {
               ...nurse,
               id: uuid()
           };
           createNurse(newNurse).then(() => history.push(`/nurses/${newNurse.id}`))
       }else{
           updateNurse(nurse).then(() => history.push(`/nurses/${nurse.id}`))
       }
    }


    if(loadingInitial) return <LoadingComponent content='Loading nurse ...' />

    return (
        <Segment clearing>
            <Header content='Nurse Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
             enableReinitialize
             initialValues={nurse} onSubmit={values => handleFormSubmit(values)}>
            {({handleSubmit, isValid,isSubmitting,dirty})=>(
                     <Form className='ui form' onSubmit={handleSubmit} autoComplete='on'>
                        

                   
                     <MyTextInput name='emri' placeholder='Emri'/>

                   
                     <MyTextInput placeholder='Mbiemri'  name='mbiemri' />
                  
                     <MyTextInput  placeholder='Email'  name='email' />
                     <MyDateInput 
                     placeholderText='Datelindja'  
                     name='datelindja' 
                   
                     timeCaption='time'
                     dateFormat='MMMM d, yyyy'
                     
                     />
                     <MyTextInput placeholder='Nderrimi'  name='username' />

                     <MyTextInput placeholder='Gjinia'  name='gjinia' />
                     <MyTextInput placeholder='Paga'  name='paga'/>

            <Header content='Location Details' sub color='teal' />

                     <MyTextInput placeholder='Adresa'  name='adresa' />
                     <MyTextInput placeholder='Qyteti'  name='qyteti'/>
                     <Button 
                     disabled={isSubmitting || !dirty || !isValid}
                     loading={loading} floated='right' positive type='submit' content='Submit' />
                     <Button as={Link} to='/nurses' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
                
            </Formik>
           
            
        </Segment>
    )
})