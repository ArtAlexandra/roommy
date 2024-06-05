import React, { useState } from "react";
import axios from "axios";

interface Shop{
    id:number;
    name:string;
    password:string;
    address:string
    owner:string;
    phone:string;
    email:string;
    image:string;
    city:string;
    timeWork:string;
    createdAt:string;
    updatedAt:string;
}
const Main = ()=>{
    const [search, setSearch] = useState<string>('')
    const [shopCity, setShopCity] =  useState<Shop[]|null>()
    const SearchShop =(e:string)=>{
        setSearch(e)
        if(e.length >=3){
            axios.get(`/shops/get-shops/${e}`)
            .then(response => {
               setShopCity(response.data)
            })
            .catch(error => {
               
                console.error('There was an error!', error);
            });
        }
    }
    return(
        <div>
            <p>Каталог</p>
            <input type="text" placeholder="Город" value={search} onChange={(e)=>SearchShop(e.target.value)}/>
            {shopCity?.map((item)=>{
                return(
                    <p key={item.id}>{item.name} {item.address}</p>
                )
            })}
        </div>
    )
}
export default Main;