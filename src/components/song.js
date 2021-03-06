import React from 'react'

const Song = ({song: {name, artist, cover}, play}) => {

    return (
        <div className='song-container'>
            <img className={`${play ? 'rotateSong' : ''}`} src={cover} alt='song'/>
            <h2>{name}</h2>
            <h3>{artist}</h3>
        </div>
    )
}

export default Song
