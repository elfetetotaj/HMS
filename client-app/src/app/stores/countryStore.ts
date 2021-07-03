import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Country } from "../models/country";

export default class CountryStore {
    countryRegistry = new Map<string, Country>();
    selectedCountry: Country | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get countriesByName() {
        return Array.from(this.countryRegistry.values())
    }

    loadCountries = async () => {
        this.loadingInitial = true;
        try {
            const countries = await agent.Countries.list();
                countries.forEach(country => {
                    this.setCountry(country);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private setCountry = (country: Country) => {
        this.countryRegistry.set(country.Id, country);
    }

    loadCountry = async (id: string) => {
        let country = this.getCountry(id);
        if (country) {
            this.selectedCountry = country;
            return country;
        } else {
            this.loadingInitial = true;
            try {
                country = await agent.Countries.details(id);
                this.setCountry(country);
                runInAction(() => {
                    this.selectedCountry = country;
                })
                this.setLoadingInitial(false);
                return country;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getCountry = (id: string) => {
        return this.countryRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createCountry = async (country: Country) => {
        this.loading = true;
        try {
            await agent.Countries.create(country);
            runInAction(() => {
                this.countryRegistry.set(country.Id, country);
                this.selectedCountry = country;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateCountry = async (country: Country) => {
        this.loading = true;
        try {
            await agent.Countries.update(country);
            runInAction(() => {
                this.countryRegistry.set(country.Id, country);
                this.selectedCountry = country;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteCountry = async (id: string) => {
        this.loading = true;
        try {
            await agent.Countries.delete(id);
            runInAction(() => {
                this.countryRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    }