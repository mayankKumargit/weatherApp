import React from 'react'
import {FaArrowDown,FaArrowUp,FaWind} from "react-icons/fa"
import {BiHappy} from "react-icons/bi"
import {MdOutlineWaterDrop, MdCompress} from "react-icons/md"
import "./Description.css"

function Description({weather,units}) {
    const tempUnit=units==='metric' ? '⁰ C' : '⁰ F'
    const windUnit=units==='metric' ? 'm/s' : 'km/h'
    const cards=[
        {
            id:1,
            icons:<FaArrowDown></FaArrowDown>,
            title:"min",
            data:weather.temp_min.toFixed(),
            unit:tempUnit
        },
        {
            id:2,
            icons:<FaArrowUp></FaArrowUp>,
            title:"max",
            data:weather.temp_max.toFixed(),
            unit:tempUnit
        },
        {
            id:3,
            icons:<BiHappy/>,
            title:"feel like",
            data:weather.feels_like.toFixed(),
            unit:tempUnit
        },
        {
            id:4,
            icons:<MdCompress/>,
            title:"pressure",
            data:weather.pressure,
            unit:"hpa"
        },
        {
            id:5,
            icons:<MdOutlineWaterDrop></MdOutlineWaterDrop>,
            title:"humidity",
            data:weather.humidity,
            unit:"%"
        },
        {
            id:6,
            icons:<FaWind/>,
            title:"wind speed",
            data:weather.speed.toFixed(),
            unit:windUnit
        }
    ]
    return (
        <div className='section section_description'>
            {
                cards.map((card)=>{
                    return(
                        <div className='card' key={card.id}>
                            <div className='description_card-icon'>
                                {card.icons}
                                <small>{card.title}</small>
                            </div>
                            <h1>{`${card.data} ${card.unit}`}</h1>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default Description
