import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Medicine } from '../../../app/models/medicine';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MySelectInput from '../../../app/common/form/MySelectInput';

export default observer(function MedicineForm() {
    const history = useHistory();
    const { medicineStore, departmentStore } = useStore();
    const { createMedicine, updateMedicine, loadMedicine, loadingInitial} = medicineStore;
    const { id } = useParams<{ id: string }>();

    const { departmentsByName, loadDepartments } = departmentStore;
    // let departments=[...departmentRegistry.values()];

    const options = new Array();

    const departments = departmentStore.departmentsByName;
    {
        departments.map(dep => (
            options.push({ "key": dep.departmentName, "value": dep.departmentName, "text": dep.departmentName })
        ))
    }

    const [medicine, setMedicine] = useState<Medicine>({ //
        id: '',
        medicineName: '',
        medicineDescription: '',
        medicineDepartment: '',
        medicinePrice: ''
    });

    const validationSchema = Yup.object({
        medicineName: Yup.string().required('The medicine name and date is required'),
        medicineDescription: Yup.string().required('The medicine description is required'),
        medicineDepartment: Yup.string().required('The medicine department is required'),
        medicinePrice: Yup.string().required('The medicine price is required'),
    })

    useEffect(() => {
        if (id) loadMedicine(id).then(medicine => setMedicine(medicine!))
        loadDepartments();
    }, [id, loadMedicine, loadDepartments]);

    function handleFormSubmit(medicine: Medicine) {
        if (!medicine.id) {
            let newMedicine = {
                ...medicine,
                id: uuid()
            };
            createMedicine(newMedicine).then(() => history.push(`/medicines/${newMedicine.id}`))
        } else {
            updateMedicine(medicine).then(() => history.push(`/medicines/${medicine.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading appointments...' />

    return (
        <Segment clearing>
            <Header content='Appointment Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={medicine} 
            onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='medicineName' placeholder='Name' />
                        <MyTextArea rows={3} name='medicineDescription' placeholder='Description' />
                        {/* <MyTextInput name='medicineDepartment' placeholder='Department' /> */}
                        {/* <Field as="select" name="medicineDepartment">
                        <option value="" disabled selected hidden style={{color: "gray"}}>Department</option>
                         {departments.map(dep=>
                            <option key={dep.departmentName} value={dep.departmentName}>{dep.departmentName}</option>
                            )};
                        </Field> */}
                        <MySelectInput name='medicineDepartment' placeholder='Department' options={options} ></MySelectInput>
                        <MyTextInput name='medicinePrice' placeholder='Price' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} 
                            floated='right' 
                            positive type='submit' 
                            content='Submit' />
                        <Button as={Link} to='/medicines' floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})