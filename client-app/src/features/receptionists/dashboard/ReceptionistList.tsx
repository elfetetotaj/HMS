import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import React from 'react';
import ReceptionistListItem from './ReceptionistListItem';

export default observer(function ReceptionistList() {

    const { receptionistStore } = useStore();
    const { receptionistsByDate } = receptionistStore;
    // const { groupedReceptionists } = receptionistStore;

    return (
        <>
            {/* {groupedReceptionists.map(([group, receptionists]) => (
            <Fragment key={group}>
                <Header sub color='teal'>
                    {group}
                </Header>
                {receptionists.map(receptionist => (
                    <ReceptionistListItem key={receptionist.id} receptionist={receptionist} />
                ))}
            </Fragment>
        ))} */}

            {receptionistsByDate.map(receptionist => (
                <ReceptionistListItem key={receptionist.id} receptionist={receptionist} />
            ))}
        </>
    )
})