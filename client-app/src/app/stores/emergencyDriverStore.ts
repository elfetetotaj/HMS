import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { EmergencyDriver } from "../models/emergencyDriver";

export default class EmergencyDriverStore{
    emergencyDriverRegistry = new Map<string, EmergencyDriver>();
    selectedEmergencyDriver: EmergencyDriver | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial =false;


    constructor () {
        makeAutoObservable(this)

    }

    get emergencyDriversByDate(){
        return Array.from(this.emergencyDriverRegistry.values()).sort((a, b) => 
             a.Dateofbirth!.getTime() - b.Dateofbirth!.getTime());   
    }



    loadEmergencyDrivers = async () => { 
        this.loadingInitial= true;
        try{
                const emergencyDrivers = await agent.EmergencyDrivers.list();
                emergencyDrivers.forEach(emergencyDriver =>{
                    this.setEmergencyDriver(emergencyDriver);
                })
                  this.setLoadingInitial(false);
                }catch (error) {
                  console.log(error);
                  this.setLoadingInitial(false);   
        }
    }
    
    loadEmergencyDriver = async (id:string) => {
        let emergencyDriver = this.getEmergencyDriver(id);
        if(emergencyDriver) {
            this.selectedEmergencyDriver = emergencyDriver;
            return emergencyDriver;
        }else {
            this.loadingInitial = true;
            try{
                emergencyDriver = await agent.EmergencyDrivers.details(id);
                this.setEmergencyDriver(emergencyDriver);
                runInAction(() => {
                    this.selectedEmergencyDriver= emergencyDriver;
                })
                this.setLoadingInitial(false);
                return emergencyDriver;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setEmergencyDriver = (emergencyDriver: EmergencyDriver) => {
        emergencyDriver.Dateofbirth= new Date(emergencyDriver.Dateofbirth!);
        this.emergencyDriverRegistry.set(emergencyDriver.Id, emergencyDriver);
    }

    private getEmergencyDriver = (id:string) =>{
        return this.emergencyDriverRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
   
    createEmergencyDriver = async (emergencyDriver: EmergencyDriver) => {
        this.loading = true;
        try{
            await agent.EmergencyDrivers.create(emergencyDriver);
            runInAction(() => {
                this.emergencyDriverRegistry.set(emergencyDriver.Id, emergencyDriver);
                this.selectedEmergencyDriver = emergencyDriver;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    }

    updateEmergencyDriver = async (emergencyDriver : EmergencyDriver) => {
        this.loading = true;

        try{
            await agent.EmergencyDrivers.update(emergencyDriver);
            runInAction(() => {
                this.emergencyDriverRegistry.set(emergencyDriver.Id, emergencyDriver);
                this.selectedEmergencyDriver = emergencyDriver;
                this.editMode = false;
                this.loading = false;
            })

        }catch(error) {
            console.log(error);
            runInAction(() =>{
                this.loading = false;
            })
        }
    }

    deleteEmergencyDriver = async (id: string) =>{
        this.loading = true;
        try{
              await agent.EmergencyDrivers.delete(id);
              runInAction(() =>{
                this.emergencyDriverRegistry.delete(id);
                this.loading = false;
              })
        }catch(error) {
            console.log(error);  
            runInAction(()=>{
                this.loading = false;

            })
        }
    }
   
}