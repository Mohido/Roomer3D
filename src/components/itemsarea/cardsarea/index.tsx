import { useEffect, useState } from "react";

export interface AreaCardsProp {
  filter: string, 
  onSelect : (item : string)=>void
};

export interface CardProp {
  id: string, thumbnail: string, description:string, fileurl: string,
  filter: string, 
  onSelect : (item : string)=>void
};


export interface CardData{
  [key: string] : {     // e.g furniture
    [key: string] : {id: string, thumbnail: string, description:string, fileurl: string }[]
  }
}

export const Card = (props : CardProp) => {
  return <>
    <h1>{props.id}</h1>
    <br></br>
  </>;
}

//  onSelect a callback with item data ()
export const AreaCards = (props : AreaCardsProp) => {
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
    <>
      {/* items.furniture.tables = [] */}
      {
        Object.keys(items).map((category)=>{
          return Object.keys(items[category]).map((type) => {
            console.log(items[category][type]);
            return items[category][type].map((data) => {
              return <Card key={data.id}  {...props} {...data}/>
            })
          })
        })
      }
    </>
  )
}
