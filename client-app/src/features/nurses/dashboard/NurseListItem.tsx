import format from 'date-fns/format';
import { ru } from 'date-fns/locale';
import { runInAction } from 'mobx';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
// import Swal from 'sweetalert2';
import { Nurse } from '../../../app/models/nurse';
import { useStore } from '../../../app/stores/store';


interface Props {
    nurse: Nurse
}

export default function NurseListItem({nurse}: Props) {
    const {nurseStore} = useStore();
    const{deleteNurse,  loading,} = nurseStore;

    // const swalWithBootstrapButtons = Swal.mixin({
    //     customClass: {
    //       confirmButton: 'btn btn-success',
    //       cancelButton: 'btn btn-danger',
    //     },
    //      buttonsStyling: false
    //   });
   
    
    
      
  

    return (
       <Segment.Group>
           
           <Segment>
             
          
               <Item.Group>
                   <Item>
                   <Item.Image src={`/assets/${nurse.gjinia}.png`} />

                       <Item.Content>
                            <Item.Header as={Link} to={`/nurses/${nurse.id}`}>
                              <h1 >  {nurse.emri}   {nurse.mbiemri}</h1>
                              <h2>  {nurse.department}</h2>
                            </Item.Header>
                        
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>
               <span>
                   <Icon name='calendar'/> {format(nurse.datelindja!, 'dd MMM yyyy')}
                   <br/>
                   <Icon name='map marker' />{nurse.adresa}
               </span>
           </Segment>
           <Segment clearing>
               <Button 
                    as={Link}
                    to={`/nurses/${nurse.id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
     {/* <Button  onClick={()=> swalWithBootstrapButtons.fire ({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        
        
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
            
        
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your nurse is safe :)',
            'error'
          )
        }
      })}  type='submit'   color='red' disabled={loading} content='Delete'/>
    */}
           </Segment>
       </Segment.Group>
    )
}