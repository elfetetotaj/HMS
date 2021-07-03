import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Room } from "../models/room";

export default class RoomStore{
    roomRegistry = new Map<string, Room>();
    selectedRoom: Room | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial =false;


    constructor () {
        makeAutoObservable(this)

    }

    /*get doctorsByDate(){
        return Array.from(this.doctorRegistry.values()).sort((a, b) => 
             a.dateofbirth!.getTime() - b.dateofbirth!.getTime());   
    }*/

    get roomsByDate() {
        return Array.from(this.roomRegistry.values())
    }



    loadRooms = async () => { 
        this.loadingInitial= true;
        try{
                const rooms = await agent.Rooms.list();
                rooms.forEach(room =>{
                    this.setRoom(room);
                })
                  this.setLoadingInitial(false);
                }catch (error) {
                  console.log(error);
                  this.setLoadingInitial(false);   
        }
    }
    
    loadRoom = async (id:string) => {
        let room = this.getRoom(id);
        if(room) {
            this.selectedRoom = room;
            return room;
        }else {
            this.loadingInitial = true;
            try{
                room = await agent.Rooms.details(id);
                this.setRoom(room);
                runInAction(() => {
                    this.selectedRoom= room;
                })
                this.setLoadingInitial(false);
                return room;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

   private setRoom = (room: Room) => {
       this.roomRegistry.set(room.id, room);
   }

    private getRoom = (id:string) =>{
        return this.roomRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
   
    createRoom = async (room: Room) => {
        this.loading = true;
        try{
            await agent.Rooms.create(room);
            runInAction(() => {
                this.roomRegistry.set(room.id, room);
                this.selectedRoom = room;
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

    updateRoom = async (room : Room) => {
        this.loading = true;

        try{
            await agent.Rooms.update(room);
            runInAction(() => {
                this.roomRegistry.set(room.id, room);
                this.selectedRoom = room;
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

    deleteRoom = async (id: string) =>{
        this.loading = true;
        try{
              await agent.Rooms.delete(id);
              runInAction(() =>{
                this.roomRegistry.delete(id);
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