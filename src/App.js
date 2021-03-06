import React, {useState, useRef} from 'react'
import Nav from './components/nav'
import chillHop from './data'
import Song from './components/song'
import Player from './components/player'
import Library from './components/library'
import {changeActiveItem, playAudio} from './utils'
import './styles/App.scss'

const App = () => {
    const audioRef = useRef(null)
    const [data, setData] = useState(chillHop)
    const [song, setSong] = useState(data[0])
    const [play, setPlay] = useState(false)
    const [library, setLibrary] = useState(true)
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
        volume: 0,
    })
   const timeUpdateHandler = (e) => {
        const {duration, currentTime, volume} = e.target
       const currentRound = Math.round(currentTime)
       const durationRound = Math.round(duration)
       const percentage = Math.round(currentRound / durationRound * 100)
       setSongInfo({
           ...songInfo,
           currentTime: currentRound,
           duration: durationRound,
           animationPercentage: percentage,
           volume: volume
       })

   }
    const songEndHandler = async () => {
        let currentIndex = data.findIndex((item) => item.name === song.name)
        await setSong(data[(currentIndex + 1) % data.length])
        changeActiveItem(data[(currentIndex + 1) % data.length], data, setData)
        playAudio(play, audioRef)
    }

    return (
        <div className={`App ${library ? 'library-active' : ''} `}>
            <Nav setLibrary={setLibrary} library={library}/>
            <Song song={song} play={play}/>

            <Player setPlay={setPlay} play={play} song={song} setSong={setSong}
                    data={data} setData={setData} songInfo={songInfo}
                    audioRef={audioRef} />

            <Library data={data} library={library} setSong={setSong}
                     setData={setData} audioRef={audioRef} play={play}/>
            <audio
                ref={audioRef}
                src={song.audio}
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                onEnded={songEndHandler}
            >
            </audio>
        </div>
    )
}

export default App
