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
import { City } from '../../../app/models/city';


export default observer(function CityForm() {
    const history = useHistory();
    const {cityStore} = useStore();
    const{createCity, updateCity, loading, loadCity, loadingInitial} = cityStore;
    const {id} = useParams<{id: string}>();

    const [city, setCity] = useState<City>({
        Id: '',
        cityName: '',
        zipCode: '',
        
    });

    const validationSchema = Yup.object({
        cityName: Yup.string().required('CityName is required!'),
        zipCode: Yup.string().required('Zip Code is required!')

    })

    useEffect(() => {
        if(id) loadCity(id).then(city => setCity(city!))
    },[id, loadCity]);


    function handleFormSubmit(city:City) {
       if(city.Id.length === 0){
           let newCity = {
               ...city,
               id: uuid()
           };
           createCity(newCity).then(() => history.push(`/cities/${newCity.Id}`))
       }else{
           updateCity(city).then(() => history.push(`/cities/${city.Id}`))
       }
    }


    if(loadingInitial) return <LoadingComponent content='Loading City ...' />

    return (
        <Segment clearing>
            <Header content='City Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
             enableReinitialize
             initialValues={city} 
             onSubmit={values => handleFormSubmit(values)}>
            {({handleSubmit, isValid,isSubmitting,dirty})=>(
                     <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                     <MyTextInput name='emri' placeholder='CityName'/>

                     <MyTextInput placeholder='ZipCode'  name='Zip Code' />

                     <Button 
                     disabled={isSubmitting || !dirty || !isValid}
                     loading={loading} 
                     floated='right' 
                     positive type='submit' 
                     content='Submit' />
                     <Button as={Link} to='/cities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}

            </Formik>


        </Segment>
    )
}) 