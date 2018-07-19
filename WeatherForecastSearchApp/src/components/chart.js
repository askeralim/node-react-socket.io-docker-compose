import React, {Component} from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

export default (props) =>{
    return (
      <div>
        <Sparklines height={60} width={80} data={props.data}>
            <SparklinesLine color={props.color}></SparklinesLine>
        </Sparklines>
        <div>{props.unit}</div>
      </div>
    )
}
