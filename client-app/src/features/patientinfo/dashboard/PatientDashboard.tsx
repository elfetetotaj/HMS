import { Grid, List } from 'semantic-ui-react';
import { Patient } from '../../../app/models/Patient';
import PatientList from './PatientList';
import PatientDetails from '../details/PatientDetails';
import PatientForm from '../form/PatientForm';

interface Props {
    patientinfo : Patient[];
}

export default function PatientDashboard({patientinfo}:Props){
    return (
        <Grid>
            <Grid.Column width ='10'>
           <PatientList patientinfo={patientinfo}/>
            </Grid.Column>
            <Grid.Column width="6">
                {patientinfo[0] &&
                <PatientDetails patient={patientinfo[0]} />}
                <PatientForm />
            </Grid.Column>
        </Grid>
    )
}