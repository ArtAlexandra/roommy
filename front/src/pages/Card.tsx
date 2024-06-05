import React, {useState} from "react";
import { Rate } from 'antd'
import { Select } from 'antd';

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

type CityName = keyof typeof cityData;

const Card = ()=>{
    const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);
    const [secondCity, setSecondCity] = useState(cityData[provinceData[0] as CityName][0]);
  
    const handleProvinceChange = (value: CityName) => {
        setCities(cityData[value]);
        setSecondCity(cityData[value][0]);
      };
    
      const onSecondCityChange = (value: CityName) => {
        setSecondCity(value);
      };
    return(
        <div>
            <img src="image 26.svg"/>
            <img src="image 27.svg"/>
            <img src="image 28.svg"/>
            <img src="image 29.svg"/>
            <p>Джемпер</p>
            <p>11 990 ₽</p>
            <p>Kivi Clothing</p>
            <Select
       // defaultValue={cities[0]}
        style={{ width: 120 }}
        onChange={handleProvinceChange}
        
        options={provinceData.map(province => ({ label: province, value: province }))}
      />
            <Rate disabled defaultValue={2} />
            <div>
                <p>О товаре</p>
                <p>Состав</p>
                <p>Материал подкладки</p>
                <p>Размер товара на модели</p>
                <p>Длина</p>
               
            </div>
            <div>
                <p>В наличии</p>
                <p>Подиум</p>
                <p>г. Таганрог, ул. Петровская, 50</p>
                <p>г. Ростов-на-Дону, ул. Петровская, 50</p>
            </div>
        </div>
    )
}
export default Card;