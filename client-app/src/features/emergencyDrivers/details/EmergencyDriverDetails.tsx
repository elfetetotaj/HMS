import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import EmergencyDriverDetailedHeader from './EmergencyDriverDetailedHeader';
import EmergencyDriverDetailedInfo from './EmergencyDriverDetailedInfo';
import EmergencyDriverDetailedSidebar from './EmergencyDriverDetailedSidebar';



export default observer(function EmergencyDriverDetails() {
  const { emergencyDriverStore } = useStore();
  const { selectedEmergencyDriver: emergencyDriver, loadEmergencyDriver, loadingInitial, clearSelectedEmergencyDriver } = emergencyDriverStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadEmergencyDriver(id);
    return () => clearSelectedEmergencyDriver();
  }, [id, loadEmergencyDriver, clearSelectedEmergencyDriver]);

  if (loadingInitial || !emergencyDriver) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <EmergencyDriverDetailedHeader emergencyDriver={emergencyDriver} />
        <EmergencyDriverDetailedInfo emergencyDriver={emergencyDriver} />
        {/* <DepartmentDetailedChat departmentId={department.id}/> */}
      </Grid.Column>
      <Grid.Column width={6} >
        {/* <EmergencyDriverDetailedSidebar /> */}
      </Grid.Column>
    </Grid>
  )
})