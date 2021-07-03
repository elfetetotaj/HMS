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
import { Test } from '../../../app/models/test';
import MyTextArea from '../../../app/common/form/MyTextArea';


export default observer(function TestForm() {
    const history = useHistory();
    const {testStore} = useStore();
    const{createTest, updateTest, loading, loadTest, loadingInitial} = testStore;
    const {id} = useParams<{id: string}>();

    const [test, setTest] = useState<Test>({
     id: '',
    emri: '',
    cmimi: 0,
    pershkrimi: ''
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required(),
        cmimi: Yup.string().required(),
        pershkrimi: Yup.string().required(),

        
  

    })

    useEffect(() => {
        if(id) loadTest(id).then(test => setTest(test!))
    },[id, loadTest]);


    function handleFormSubmit(test:Test) {
       if(test.id.length === 0){
           let newTest = {
               ...test,
               id: uuid()
           };
           createTest(newTest).then(() => history.push(`/tests`))
       }else{
           updateTest(test).then(() => history.push(`/tests`))
       }
       
    }


    if(loadingInitial) return <LoadingComponent content='Loading Test ...' />

    return (
        <Segment clearing>
            <Header content='Test Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
             enableReinitialize
             initialValues={test} onSubmit={values => handleFormSubmit(values)}>
            {({handleSubmit, isValid,isSubmitting,dirty})=>(
                     <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>                 
                        <MyTextInput name='emri' placeholder='Emri'/>                        
                        <MyTextArea rows={3} name='pershkrimi' placeholder='Pershkrimi' />
                        <MyTextInput placeholder='Cmimi'  name='cmimi'/>
                     <Button 
                     disabled={isSubmitting || !dirty || !isValid}
                     loading={loading} floated='right' positive type='submit' content='Submit' />
                     <Button as={Link} to='/tests' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
                
            </Formik>
           
            
        </Segment>
    )
})