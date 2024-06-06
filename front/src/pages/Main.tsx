import React, { useEffect, useState } from "react";
import axios from "axios";
import { Shops } from "../model/Shops";
import { useNavigate } from "react-router-dom";

const Main = ()=>{
    const [search, setSearch] = useState<string>('')
    const [shopCity, setShopCity] =  useState<Shops[]|null>()
    const navigate = useNavigate()
    const [shops, setShops] = useState<Shops[]|null>(null)
    useEffect(()=>{
        axios.get('/shops/get-all')
        .then(response => {
           console.log(response.data)
           setShops(response.data)
           
        })
        .catch(error => {
           
            console.error('There was an error!', error);
        });
    }, [])
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


            {!shops && <p>Ой, пока нет ни одного магазина</p>}
            {shops && 
            <div>
                {shops.map((shop)=>{
                    return(
                        <div key={shop.id} onClick={()=>navigate(`/shop/${shop.id}`)}>
                            <p>{shop.name}</p>
                            <p>{shop.address}</p>
                            <img src={`image/shops/${shop.image}`} alt={shop.name}/>
                        </div>
                    )
                })}

            </div>
            }
        </div>
    )
}
export default Main;