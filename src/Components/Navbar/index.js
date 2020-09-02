import React from 'react'
import styles from "./style.module.scss"

function index(props) {
    return (
            <nav className={ props.darkMode ? styles.darkMode : styles.lightMode }>
                <h2>Where in the world</h2>
                <button onClick={props.switchTodarkMode}>Dark Mode</button>
            </nav>
    )
}

export default index
