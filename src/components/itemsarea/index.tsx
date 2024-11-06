import { useState } from "react";
import { Searchbar } from "../searchbar"
import { AreaCards } from "./cardsarea";

//  onSelect a callback with item data ()
export const AreaItems = (props : {onSelect : (item : string)=>void}) => {
    const [search, setSearch] = useState('');

  return (
    <>
        <Searchbar onSearch={(value)=> setSearch(value)} />
        <AreaCards {...props} filter={search}/>
    </>
  )
}
