import React, {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faAngleLeft, faPause, faPlay, faAngleRight, faVolumeDown
} from "@fortawesome/free-solid-svg-icons"
import {changeActiveItem, playAudio} from '../utils'

const Player = ({
                    play, setPlay, song, setSong, data, setData,
                    songInfo, audioRef
                }) => {

    const [vol, setVol] = useState(false)

    const {currentTime, duration, animationPercentage} = songInfo
    const onHandlerCurrentSong = (value) => {
        let currentIndex = data.findIndex((item) => item.name === song.name)
        if (value === 'back') {
            const currentItem = data[(currentIndex - 1) === -1
                ? data.length - 1 : (currentIndex - 1)
                ]
            setSong(currentItem)
            changeActiveItem(currentItem, data, setData)
            playAudio(play, audioRef)
        } else if (value === 'forward') {
            setSong(data[(currentIndex + 1) % data.length])
            changeActiveItem(data[(currentIndex + 1) % data.length], data, setData)
            playAudio(play, audioRef)
        }
    }
    const getTime = (time) => {
        return (Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2))
    }
    const onPlay = () => {
        if (play) {
            audioRef.current.pause()
            setPlay(!play)
        } else {
            audioRef.current.play()
            setPlay(!play)
        }
    }
    const trackAnim = {
        transform: `translateX(${animationPercentage}%)`,
    }
    const dragHandler = e => {
        audioRef.current.currentTime = e.target.value
    }
    const onToggleVolume = e => {
        audioRef.current.volume = e.target.value
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(currentTime)}</p>
                <div style={{
                    background: `linear-gradient(to right, ${song.color[0]},${song.color[1]})`,
                }}
                     className="track"
                >
                    <input type="range"
                           max={duration || 0}
                           min={0}
                           value={currentTime}
                           onChange={dragHandler}
                    />
                    <div style={trackAnim} className="animate-track"> </div>
                </div>
                <p>{duration ? getTime(duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                    onClick={() => onHandlerCurrentSong('back')}
                />
                <FontAwesomeIcon
                    className="play"
                    size="2x"
                    icon={play ? faPause : faPlay}
                    onClick={onPlay}
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                    onClick={() => onHandlerCurrentSong('forward')}
                />
                <FontAwesomeIcon
                    icon={faVolumeDown}
                    onClick={()=>setVol(!vol)}
                />
                {vol && (
                    <input
                        onChange={onToggleVolume}
                        value={songInfo.volume}
                        max="1"
                        min="0"
                        step="0.01"
                        type="range"
                    />
                )}
            </div>
        </div>
    )
}
export default Player