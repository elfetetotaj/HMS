import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { City } from "../models/city";

export default class CityStore {
    cityRegistry = new Map<string, City>();
    selectedCity: City | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get citiesByDate() {
        return Array.from(this.cityRegistry.values())
    }

    get citiesByName() {
        return Array.from(this.cityRegistry.values()).sort((a, b) => a.cityName > b.cityName ? 1:-1);
    }
    loadCities = async () => {
        this.loadingInitial = true;
        try {
            const cities = await agent.Cities.list();
            cities.forEach(city => {
                this.setCity(city);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadCity = async (id: string) => {
        let city = this.getCity(id);
        if (city) {
            this.selectedCity = city;
            return city;
        } else {
            this.loadingInitial = true;
            try {
                city = await agent.Cities.details(id);
                this.setCity(city);
                runInAction(() => {
                    this.selectedCity = city;
                })
                this.setLoadingInitial(false);
                return city;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setCity = (city: City) => {
        this.cityRegistry.set(city.id, city);
    }

    private getCity = (id: string) => {
        return this.cityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createCity = async (city: City) => {
        this.loading = true;
        try {
            await agent.Cities.create(city);
            runInAction(() => {
                this.cityRegistry.set(city.id, city);
                this.selectedCity = city;
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

    updateCity = async (city: City) => {
        try {
            await agent.Cities.update(city);
            runInAction(() => {
                if (city.id) {
                    let updatedCity = { ...this.getCity(city.id), ...city }
                    this.cityRegistry.set(city.id, updatedCity as City);
                    this.selectedCity = updatedCity as City;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteCity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Cities.delete(id);
            runInAction(() => {
                this.cityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    clearSelectedCity = () => {
        this.selectedCity = undefined;
    }
}