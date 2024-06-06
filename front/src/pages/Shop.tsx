import React, {useEffect, useState} from "react";
import { Rate } from 'antd'
import { Select } from 'antd';

import { useParams } from "react-router-dom";
import { Shops } from "../model/Shops";
import axios from "axios";

const Shop = ()=>{
  const { id } = useParams<string>();
  const [shop, setShop] = useState<Shops>()
  useEffect(()=>{
    axios.get(`/shops/get-shop/${id}`)
    .then(response => {
       setShop(response.data)
    })
    .catch(error => {
       
        console.error('There was an error!', error);
    });
  }, [])

    return(
        <div>
           
            <p>{shop?.name}</p>
            <p>{shop?.city}, {shop?.address}</p>
            <p>{shop?.email}</p>
            <p>{shop?.phone}</p>
            <p>{shop?.timeWork}</p>

            <img src={`/image/shops/${shop?.image}`} alt={shop?.name}/>
        </div>
    )
}
export default Shop;