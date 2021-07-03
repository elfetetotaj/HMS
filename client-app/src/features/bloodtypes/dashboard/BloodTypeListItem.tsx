import React from 'react';
import {  Item, Segment } from 'semantic-ui-react';
import { BloodType } from '../../../app/models/bloodTypes';


interface Props {
    bloodType: BloodType
}

export default function BloodTypeListItem({bloodType}: Props) {
   
  return (
       <Segment.Group>
           
           <Segment>
           
               <Item.Group background-color='red'>
                   <Item>
            
                   <Item.Image src={`/assets/blood/${bloodType.type}.jpg`} />
                       <Item>   <h1>{bloodType.type}</h1></Item>        
                   </Item>
               </Item.Group>
           </Segment>
         
       </Segment.Group>
    )
}

