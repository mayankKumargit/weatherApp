import { useEffect,useState } from 'react';
import './App.css';
import clearSky from "./assets/clearSky.jpg"
import cloudy from "./assets/cloudy.jpg"
import haze2 from "./assets/haze2.jpg"
import lightRain from "./assets/lightRain.jpg"
import moderateRain from "./assets/moderateRain.jpg"
import overcast from "./assets/overcast.jpg"
import scatteredCloud from "./assets/scatteredCloud.jpg"
import thunderstorm from "./assets/thunderstorm.jpg"
import cold from "./assets/cold.jpg"
import mist from "./assets/mist.jpg"
import Description from './components/Description';
import getFormattedWeatherData from './components/weatherService';

function App() {

    const [weather,setWeather]=useState(null)
    const [units,setUnits]=useState("metric")
    const [city,setCity]=useState("Patna")
    const [bg,setBg]=useState(null)
    
    useEffect(()=>{
        const fetchWeatherData=async()=>{
            const data=await getFormattedWeatherData(city,units)
            console.log(data)
            setWeather(data)
            if(data.temp < 12){
                setBg(cold)
            }
            else if(data.description==="few clouds"){
                setBg(cloudy)
            }
            else if(data.description==="clear sky" || data.description.includes("sun")){
                setBg(clearSky)
            }
            else if(data.description==="light intensity shower rain" || data.description==="light rain"){
                setBg(lightRain)
            }
            else if(data.description==="overcast clouds"){
                setBg(overcast)
            }
            else if(data.description==="broken clouds" || data.description==="scattered clouds"){
                setBg(scatteredCloud)
            }
            else if(data.description==="moderate rain"){
                setBg(moderateRain)
            }
            else if(data.description==="thunderstorm" || data.description.includes("thunder")){
                setBg(thunderstorm)
            }
            else if(data.description==="haze"){
                setBg(haze2)
            }
            else if(data.description==="mist"){
                setBg(mist)
            }
        }
        fetchWeatherData()
    },[units,city])

    const handleUnitsClick=(e)=>{
        const button=e.currentTarget
        console.log(button)
        console.log(button.innerText)
        const currentUnit=button.innerText
        const isCelsius=currentUnit==="⁰C"
        button.innerText=isCelsius ? "⁰F" : "⁰C"
        setUnits(isCelsius ? "metric" : "imperial")
    }

    const enterKeyPressed=(e)=>{
        console.log(e.keyCode)
        if(e.keyCode===13){
            console.log(e.currentTarget.value)
            setCity(e.currentTarget.value)
            e.currentTarget.blur()
        } 
        
    }

    return (
        <div className='app' style={{backgroundImage:`url(${bg})`}}>
            <div className='overlay'>
                {
                    weather && (
                        <div className='container'>
                            <div className='section section_inputs'>
                                <input type='text' name='city' placeholder='Enter your city' onKeyDown={(e)=>enterKeyPressed(e)}></input>
                                <button onClick={(e)=>handleUnitsClick(e)}>⁰F</button>
                            </div>
                            <div className='section section_temperature'>
                                <div className='icon'>
                                    <h1>{weather.name}, {weather.country}</h1>
                                    <img src={weather.iconURL} alt='weatherIcon'/>
                                    <h1>{weather.description}</h1>
                                </div>
                                <div className='temperature'>
                                    <h1>{`${weather.temp.toFixed()} ⁰${units==="metric"?'C':'F'}`}</h1>
                                </div>
                            </div>
                            <Description weather={weather} units={units}></Description>
                        </div>
                    )
                }
                
            </div>
        </div>
    );
}

export default App;
