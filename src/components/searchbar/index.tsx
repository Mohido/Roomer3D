import { memo } from "react";
import "./index.css";
import { FaSearch } from 'react-icons/fa';

export const Searchbar = memo((props: {onSearch: (value : string) => void}) => {
  return (
    <div className="searcharea">
      <FaSearch style={{marginTop: "4px", marginRight: "15px", color:"rgb(190, 190, 190)"}} size={32}/>
      <div className="searchbar">
        <input type="text" onChange={(e) => props.onSearch(e.target.value)} />
      </div>
    </div>
  )
})
