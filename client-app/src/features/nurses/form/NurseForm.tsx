import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik,Form, Field} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';

import MyDateInput from '../../../app/common/form/MyDateInput';
import { Nurse } from '../../../app/models/nurse';
import { genderNurseChar } from '../../../app/common/options/genderNurseChar';

import MySelectInput from '../../../app/common/form/MySelectInput';


export default observer(function NurseForm() {
    const history = useHistory();
    const {nurseStore,departmentStore,cityStore} = useStore();
    const{createNurse, updateNurse, loading, loadNurse, loadingInitial} = nurseStore;
 
    const{departmentRegistry, loadDepartments}=departmentStore;
    let departments=[...departmentRegistry.values()];

    const{cityRegistry, loadCities}=cityStore;
    let cities=[...cityRegistry.values()];
    
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
        paga: Yup.string().required(),
        department: Yup.string().required()

    })

    useEffect(() => {
        if(id) loadNurse(id).then(nurse => setNurse(nurse!))
        if(departmentRegistry.size<=1) loadDepartments();
        if(cityRegistry.size<=1) loadCities();
    },[id, loadNurse, departmentRegistry.size,loadDepartments, cityRegistry,loadCities]);


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
{/* 
                     <MyTextInput placeholder='Gjinia'  name='gjinia' /> */}
                        <MySelectInput options={genderNurseChar} placeholder='Gjinia' name='gjinia' />

                     <MyTextInput placeholder='Paga'  name='paga'/>
                     <Field as="select" name="department">
                         {departments.map(dep=>
                            <option key={dep.id} value={dep.departmentName}>{dep.departmentName}</option>
                            )};
                     </Field>
                        

            <Header content='Location Details' sub color='teal' />

                     <MyTextInput placeholder='Adresa'  name='adresa' />
                     <Field as="select" name="qyteti">
                         {cities.map(city=>
                            <option key={city.id} value={city.cityName}>{city.cityName}</option>
                            )};
                     </Field>
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