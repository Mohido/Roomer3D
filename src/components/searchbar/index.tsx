import "./index.css";

export const Searchbar = (props: {onSearch: (value : string) => void}) => {
  return (
    <div className="searcharea">
      <input className="searchbar" type="text" onChange={(e) => props.onSearch(e.target.value)} />
    </div>
  )
}
