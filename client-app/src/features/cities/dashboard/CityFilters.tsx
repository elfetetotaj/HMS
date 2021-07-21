import React from 'react';
import { Grid, Header, Menu, Search } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default function CityFilters() {
    const { cityStore } = useStore();
    const { cityRegistry } = cityStore;
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
                <Header icon='filter' attached color='teal' content='Cities' />
                <Menu.Item content={cityRegistry.size} />
            </Menu>
            <Header />

        </>
    )
}