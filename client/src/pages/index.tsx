// importing google font for NextJS
import { getJSONData } from '@/tools/Toolkit';
import { Griffy } from 'next/font/google';
const griffy = Griffy({weight: "400", subsets: ['latin']});

import { Orders } from "@/tools/orders.model";
import { useState} from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import Content from "@/components/Content";

export default function Home() {
  // retrieve server sided script
  const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";
  let orders:Orders[] = [];

  // --------------event handlers/functions

  const onResponse = (data:Orders) => {
    console.log(data);
    
    
    for(let i = 0; i < data.orders.length; i++){
      orders.push(data);
    }
    console.log(orders[0].orders[0].toppings[0]);
    setData(orders);
    
    setShowOverlay(showOverlay);
  };

  const onError= (message:string) => {
    console.log(`*** Error retriving the pizzia order data :( | ${message})`)
  };

  const getOrders = (e:any) =>{
    setShowOverlay(!showOverlay);
    // fetch the data from the api
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  };

  const [data, setData] = useState<Orders[]>(orders);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  // ---------------------------- rendering to DOM
  return (
    <main className="grid grid-rows-1 grid-cols-1 gap-0 text-content">

        <LoadingOverlay enabled={showOverlay}
                              spinnerColor="#FFFFFF" 
                              showSpinner={true}
                              bgColor="#b82308"  
                            />


      <div className="flex flex-nowrap items-center justify-center 
          bg-accent bg-[url('./../lib/images/background.jpg')] bg-no-repeat bg-center bg-cover
          border-solid border-b-4 border-accent min-h-[220px] p-5 text-white">

        <header className="grow text-center md:text-left">
          <div className={`${griffy.className} text-6xl`}>Antonio's Online Pizzaria</div>
          <div className="text-sm">If it's not Antonio's, it's rubbish!</div>
        </header>

        <div className="shrink-0 hidden md:block">
          <i className="fab fa-facebook-square fa-2x ml-1"></i>
          <i className="fab fa-twitter-square fa-2x ml-1"></i>
          <i className="fab fa-instagram fa-2x ml-1"></i>
        </div>
      </div>

      <aside className="flex flex-nowrap items-center justify-between p-5 flex-col md:flex-row">
        <div className="mb-5 md:hidden text-center">
          <>1234 Cheesy Drive | Tastyville, NS | 902-123-4567</>
        </div>
        <div>
          <div className="text-accent text-3xl font-bold mb-2.5">Welcome loyal pizza dispatcher....</div>Click the &quot;Get Orders&quot; button below to view all current orders that need to be delivered.
          <div>
              <button 
                className="bg-accent border-none rounded-md p-2.5 text-white hover:bg-greyContent mt-5" onClick={getOrders}>Get Orders</button>
          </div>
        </div>
        <div className="shrink-0 text-lg text-right text-greyContent hidden md:block">
          <div>Antonio's Pizzaria</div>
          <div>1234 Cheesy Drive</div>
          <div>Tastyville, NS</div>
          <div>902-123-4567</div>
        </div>
      </aside>

      <div className="bg-greyAccent p-10">

        <div id="output" className="divide-dashed divide-y-2 divide-accent">
          {(data.length === 0 ) ?
            <div>No orders retrived...</div> 
            :
        data.map((orderData: Orders, i: number) => <Content key={i} id={orderData.orders[i].id} name={orderData.orders[i].name} address={orderData.orders[i].address} city={orderData.orders[i].city} size={orderData.orders[i].size} toppings={orderData.orders[i].toppings} notes={orderData.orders[i].notes} />)}
        </div>
      </div>
    </main>
  );
}