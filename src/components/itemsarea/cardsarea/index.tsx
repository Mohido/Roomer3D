import { memo, useContext } from "react";
import "./index.css";
import {  FaRegArrowAltCircleDown, FaRegStar} from 'react-icons/fa';
import { AddedObjectContext } from "../../../App";


interface ItemData {id: string, thumbnail: string, description:string, fileurl: string};

export const Item = memo((props: ItemData) => {
  const item = props;
  const {addObject} = useContext(AddedObjectContext);

  return <div className="card-item" onClick={()=> addObject(item.fileurl + '-' + Math.random())}>
  {/* Item Data */}
  <FaRegStar style={{alignSelf:"start",maxWidth: "16px", maxHeight: "16px", margin:"12px"}} />
  <div>
    <h4>{item.id}</h4>
    <p>{item.description}</p>
  </div>

  {/* Right Image */}
  {/* <div className="card-item-thumbnail"> */}
    <img className="card-item-thumbnail" width={64} height={64} src={item.thumbnail} alt={item.id} />
  {/* </div> */}
</div>
})


export interface CardProp {
  data: ItemData[]
  type: string, category: string,
  filter: string, 
};


export const Card = memo((props : CardProp) => {
  return <div className="card">

    {/* Header */}
    <div className="card-header">
      <div>
        <h2>{props.category}</h2>
        <h1>{props.type}</h1>
      </div>
      <FaRegArrowAltCircleDown style={{color: "var(--gray2)" ,maxWidth: "16px", margin: "10px"}}/>
    </div>

    <hr />

    {/* Items List */}
    <div className="card-body">
      {
        props.data.map((item) => {
          if(!(item.id.includes(props.filter) || item.description.includes(props.filter)))
            return <div key={item.id}></div>
          else
            return <Item {...item} key={item.id} />
        })
      }
    </div>

    <hr />
  </div>;
})

