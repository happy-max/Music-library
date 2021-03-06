
export const changeActiveItem = (item, arr, setData) => {
    const newSongs = arr.map((song) => {
        if (song.name === item.name) {
            return {
                ...song,
                active: true,
            }
        } else {
            return {
                ...song,
                active: false,
            }
        }
    })
    setData(newSongs)
}

export const playAudio = (isPlaying, audioRef) => {
    if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
            playPromise
                .then((audio) => {
                    audioRef.current.play()
                })
                .catch((error) => console.log(error))
        }
    }
}