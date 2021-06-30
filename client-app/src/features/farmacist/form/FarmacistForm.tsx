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
import { Farmacist } from '../../../app/models/farmacist';
import { degreeOptions } from '../../../app/common/options/degreeOptions';


export default observer(function FarmacistForm() {
    const history = useHistory();
    const {farmacistStore} = useStore();
    const{createFarmacist, updateFarmacist, loading, loadFarmacist, loadingInitial} = farmacistStore;
    const {id} = useParams<{id: string}>();

    const [farmacist, setFarmacist] = useState<Farmacist>({
        id: '',
        emri: '',
        mbiemri: '',
        dateOfJoining: null,
        email: '',
        tel: 0,
        degree: ''
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required(),
        mbiemri: Yup.string().required(),
        dateOfJoining: Yup.string().required('Date is required!').nullable(),
        email: Yup.string().required(),
        degree: Yup.string().required(),
        tel: Yup.string().required()
        
  

    })

    useEffect(() => {
        if(id) loadFarmacist(id).then(farmacist => setFarmacist(farmacist!))
    },[id, loadFarmacist]);


    function handleFormSubmit(farmacist:Farmacist) {
       if(farmacist.id.length === 0){
           let newFarmacist = {
               ...farmacist,
               id: uuid()
           };
           createFarmacist(newFarmacist).then(() => history.push(`/farmacists/${newFarmacist.id}`))
       }else{
           updateFarmacist(farmacist).then(() => history.push(`/farmacists/${farmacist.id}`))
       }
    }


    if(loadingInitial) return <LoadingComponent content='Loading Farmacist ...' />

    return (
        <Segment clearing>
            <Header content='Farmacist Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
             enableReinitialize
             initialValues={farmacist} onSubmit={values => handleFormSubmit(values)}>
            {({handleSubmit, isValid,isSubmitting,dirty})=>(
                     <Form className='ui form' onSubmit={handleSubmit} autoComplete='on'>
                        

                   
                     <MyTextInput name='emri' placeholder='Emri'/>

                   
                     <MyTextInput placeholder='Mbiemri'  name='mbiemri' />
                  
                     <MyTextInput  placeholder='Email'  name='email' />
                     <MyDateInput 
                     placeholderText='DateOfJoining'  
                     name='dateOfJoining'                  
                     timeCaption='time'
                     dateFormat='MMMM d, yyyy'
                     
                     />
                     <MySelectInput options={degreeOptions} placeholder='Degree'  name='degree' />
                     <MyTextInput placeholder='Tel'  name='tel'/>
                     <Button 
                     disabled={isSubmitting || !dirty || !isValid}
                     loading={loading} floated='right' positive type='submit' content='Submit' />
                     <Button as={Link} to='/farmacists' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
                
            </Formik>
           
            
        </Segment>
    )
})