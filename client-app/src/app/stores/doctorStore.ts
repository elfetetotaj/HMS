import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Doctor } from "../models/doctor";

export default class DoctorStore{
    doctorRegistry = new Map<string, Doctor>();
    selectedDoctor: Doctor | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial =false;


    constructor () {
        makeAutoObservable(this)

    }

    get doctorsByDate(){
        return Array.from(this.doctorRegistry.values()).sort((a, b) => 
             a.dateofbirth!.getTime() - b.dateofbirth!.getTime());   
    }



    loadDoctors = async () => { 
        this.loadingInitial= true;
        try{
                const doctors = await agent.Doctors.list();
                doctors.forEach(doctor =>{
                    this.setDoctor(doctor);
                })
                  this.setLoadingInitial(false);
                }catch (error) {
                  console.log(error);
                  this.setLoadingInitial(false);   
        }
    }
    
    loadDoctor = async (id:string) => {
        let doctor = this.getDoctor(id);
        if(doctor) {
            this.selectedDoctor = doctor;
            return doctor;
        }else {
            this.loadingInitial = true;
            try{
                doctor = await agent.Doctors.details(id);
                this.setDoctor(doctor);
                runInAction(() => {
                    this.selectedDoctor= doctor;
                })
                this.setLoadingInitial(false);
                return doctor;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setDoctor = (doctor: Doctor) => {
        doctor.dateofbirth= new Date(doctor.dateofbirth!);
        this.doctorRegistry.set(doctor.id, doctor);
    }

    private getDoctor = (id:string) =>{
        return this.doctorRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
   
    createDoctor = async (doctor: Doctor) => {
        this.loading = true;
        try{
            await agent.Doctors.create(doctor);
            runInAction(() => {
                this.doctorRegistry.set(doctor.id, doctor);
                this.selectedDoctor = doctor;
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

    updateDoctor = async (doctor : Doctor) => {
        this.loading = true;

        try{
            await agent.Doctors.update(doctor);
            runInAction(() => {
                this.doctorRegistry.set(doctor.id, doctor);
                this.selectedDoctor = doctor;
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

    deleteDoctor = async (id: string) =>{
        this.loading = true;
        try{
              await agent.Doctors.delete(id);
              runInAction(() =>{
                this.doctorRegistry.delete(id);
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