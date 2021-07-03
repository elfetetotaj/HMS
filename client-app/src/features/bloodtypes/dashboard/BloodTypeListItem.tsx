import format from 'date-fns/format';
import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { BloodType } from '../../../app/models/bloodTypes';
import { useStore } from '../../../app/stores/store';

interface Props {
    bloodType: BloodType
}

export default function BloodTypeListItem({bloodType}: Props) {
    const history = useHistory();
    const {bloodTypeStore} = useStore();
    const{ loading, loadBloodTypes, loadingInitial} = bloodTypeStore;
    const {id} = useParams<{id: string}>();

    return (
       <Segment.Group>
           
           <Segment>
           
               <Item.Group background-color='red'>
                   <Item>
            
                   <Item.Image src={`/assets/${bloodType.type}.jpg`} />
                       <Item>   <h1>{bloodType.type}</h1></Item>
       
           
        
                   
                   </Item>
               </Item.Group>
           </Segment>
         
       </Segment.Group>
    )
}

