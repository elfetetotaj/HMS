import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import CityListItem from './CityListItem';

export default observer(function CityList() {

    const {cityStore} = useStore();
    const {citiesByName} = cityStore

    return (
        <>
            {citiesByName.map(city => (
                <CityListItem key={city.id} city={city} />
            ))}
        </>
    )
})