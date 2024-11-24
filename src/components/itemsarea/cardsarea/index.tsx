import { useContext } from "react";
import "./index.css";
import {  FaRegArrowAltCircleDown, FaRegStar} from 'react-icons/fa';
import { SceneContext } from "../../../App";


interface ItemData {id: string, thumbnail: string, description:string, fileurl: string};

export const Item = (props: ItemData) => {
  const item = props;
  const {updateObject_cb} = useContext(SceneContext);

  return <div className="card-item" onClick={()=> updateObject_cb(item.fileurl + '-' + Math.random())}>
  {/* Item Data */}
  <FaRegStar style={{alignSelf:"start",maxWidth: "16px", maxHeight: "16px", margin:"12px"}} />
  <div>
    <h4>{item.id}</h4>
    <p>{item.description}</p>
  </div>
  <img className="card-item-thumbnail" width={64} height={64} src={item.thumbnail} alt={item.id} />
</div>
}


export interface CardProp {
  data: ItemData[]
  type: string, category: string,
  filter: string, 
};


export const Card = (props : CardProp) => {
  const search = props.filter.toLowerCase();
  const visibles = props.data.filter((item) => 
    item.id.toLowerCase().includes(search) || item.description.toLowerCase().includes(search)
  )

  if(visibles.length === 0)
    return <></>
  
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
        visibles.map((item) => <Item {...item} key={item.id} />)
      }
      </div>
      

      <hr />
    </div>
  
}

