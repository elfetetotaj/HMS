import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import CountryListItem from './CountryListItem';

export default observer(function CountryList() {

    const {countryStore} = useStore();
    const {countiesByName} = countryStore

    return (
        <>
            {countiesByName.map(country => (
                <CountryListItem key={country.id} country={country} />
            ))}
        </>
    )
})