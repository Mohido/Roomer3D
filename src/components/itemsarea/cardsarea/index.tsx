export interface CardProp {
  data: {id: string, thumbnail: string, description:string, fileurl: string}[]
  type: string, category: string,
  filter: string, 
  onSelect : (fileurl : string)=>void
};


export const Card = (props : CardProp) => {
  return <>

    {/* Header */}
    <div>
      <h2>{props.category}</h2>
      <h1>{props.type}</h1>
    </div>

    {/* Items List */}
    <div>
      {
        props.data.map((item) => {
          return (<div onClick={() => props.onSelect(item.id)} key={item.id}>
            {/* Item Data */}
            <div>
              <h4>{item.id}</h4>
              <p>{item.description}</p>
            </div>

            {/* Right Image */}
            <div></div>
          </div>)
        })
      }
    </div>
  </>;
}

