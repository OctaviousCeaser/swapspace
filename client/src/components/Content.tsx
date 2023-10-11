import { Note, Topping } from "@/tools/orders.model";

export default function Content ({ id, name, address, city, size, toppings,notes}: {id:string, name:string, address:string, city:string, size:string, toppings:Topping[],notes:Note[],})  {


    return (
        <div className="pt-4 border-b border-dotted border-black"> 
        <div className="font-bold text-2xl text-accent" >Order: #{id}</div>
        <div className="pt-4 font-bold">
          <i className="fas fa-info-circle"></i> Customer Information
          </div>
          <div> <p>{name}</p> <p>{address}</p> <p>{city}</p></div>
        <div className="pt-4 font-bold">
            <i className="fas fa-pizza-slice"></i> Pizza Size</div>
            <div>{size}</div>
        <div className="pt-4 font-bold">
          <i className="fas fa-list-ul">
            </i> Order Details</div>
            <div><ul>
          {toppings.map((topping, index) => (
            <li key={index}>{topping.topping}</li>
          ))}
        </ul></div>
        <div className="pt-4 font-bold">
          <i className="fas fa-sticky-note">
            </i> Order Notes</div>
            <div className="pb-4"><ul>
          {notes.map((note, index) => (
            <li key={index}>{note.note}</li>
          ))}
        </ul></div>
    </div>);
}