export const Searchbar = (props: {onSearch: (value : string) => void}) => {
  return (
    <input type="text" onChange={(e) => props.onSearch(e.target.value)} />
  )
}
