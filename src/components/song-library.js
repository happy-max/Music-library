import React from 'react'
import {changeActiveItem, playAudio} from '../utils'

const SongLibrary = ({item, setSong, setData, data, audioRef, play}) => {
    const {name, cover, artist, active } = item

    const onChangeActive = () => {
        setSong(item)
        changeActiveItem(item, data, setData)
        playAudio(play, audioRef)
    }

    return (
        <div
            className={`library-song ${active ? 'selected' : ''}`}
            onClick={onChangeActive}
        >
            <img src={cover} alt=""/>
            <div className="song-description">
                <h3>{name}</h3>
                <h4>{artist}</h4>
            </div>
        </div>
    )
}

export default SongLibrary
