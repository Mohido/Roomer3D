import { useEffect, useState } from "react";
import { Searchbar } from "../searchbar"
import { Card } from "./cardsarea";
import "./index.css";


export interface CardData{
  [key: string] : {     // e.g furniture
    [key: string] : {id: string, thumbnail: string, description:string, fileurl: string }[]
  }
}

//  onSelect a callback with item data ()
// TODO: Switch searching to context.
export const AreaItems = () => {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState({} as CardData);

    useEffect(() => {
      const fetchItems = async () => {
        try{
          const res = await fetch("http://localhost:3000/items");
          const data = await res.json(); 
          setItems(data);
          return data;
        }catch(error){
          console.error(error);
        }
        return;
      }
      fetchItems();
    } , []);


  return (
    <div className="itemsarea">
        <Searchbar onSearch={(value)=> setSearch(value)} />

        {/* Cards Area */}
        <div className="cardsarea">
          {
            Object.keys(items).map((category)=>{
              return Object.keys(items[category]).map((type) => {
                return <Card type={type} category={category} key={category + '-' + type} filter={search} data={items[category][type]}/>
              })
            })
          }
        </div>
    </div>
  )
}
