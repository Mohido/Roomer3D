import { useRef, useState } from "react";
import { Searchbar } from "../searchbar"
import { Card } from "./cardsarea";
import "./index.css";
import data from '../../data.json';


export interface CardData{
  [key: string] : {     // e.g furniture
    [key: string] : {id: string, thumbnail: string, description:string, fileurl: string }[]
  }
}

export const AreaItems = () => {
    const [search, setSearch] = useState('');
    const items = useRef<CardData> (data.items);


  return (
    <div className="itemsarea">
        <Searchbar onSearch={(value)=> setSearch(value)} />

        {/* Cards Area */}
        <div className="cardsarea">
          {
            Object.keys(items.current).map((category)=>{
              return Object.keys(items.current[category]).map((type) => {
                return <Card type={type} category={category} key={category + '-' + type} filter={search} data={items.current[category][type]}/>
              })
            })
          }
        </div>
    </div>
  )
}
