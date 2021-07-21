import React from 'react';
import Calendar from 'react-calendar';
import { Grid, Header, Menu, Search } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default function SrgeryFilters() {
    const { surgeryStore } = useStore();
    const { surgeryRegistry } = surgeryStore;
    return (
        <>
            <Grid.Column width={16} floated="right">
                <Search
                // loading={loading}
                // onResultSelect={(e, data) =>
                //     dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
                // }
                // onSearchChange={handleSearchChange}
                // results={results}
                // value={value}
                />
            </Grid.Column>
            <Menu vertical size='large' style={{ width: '100%' }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Surgeries' />
                <Menu.Item content={surgeryRegistry.size} />
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}