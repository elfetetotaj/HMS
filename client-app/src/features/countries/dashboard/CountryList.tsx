import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import CountryListItem from './CountryListItem';

export default observer(function CountryList() {

    const {countryStore} = useStore();
    const {countriesByName} = countryStore

    return ( //video 5.7
        <>
            {countriesByName.map(country => (
                <CountryListItem key={country.Id} country={country} />
            ))}
        </>
    )
})