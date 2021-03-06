import React from 'react'
import SongLibrary from './song-library'

const Library = ({data, library, setSong, setData, audioRef, play}) => {
    const context = data.map((item) => {
            const {name} = item
        return(
            <SongLibrary setData={setData} setSong={setSong} key={name}
                         item={item} data={data} audioRef={audioRef} play={play}/>
        )
    })
        return (
            <div className={`library ${library ? 'active-library' : ''}`}>
                <h2>Library</h2>
                <div className="library-songs">
                    {context}
                </div>
            </div>
        )
    }

    export default Library