import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMusic} from "@fortawesome/free-solid-svg-icons"

const Nav = ({setLibrary, library}) => {
    return(
        <nav>
        <a href='https://github.com/happy-max' title='GitHub' target='_blank'
           rel="noreferrer">HappyMax</a>
                <button onClick={()=>setLibrary(!library)}>
                    Library
                    <FontAwesomeIcon icon={faMusic} />
                </button>
            </nav>
    )
}
export default Nav