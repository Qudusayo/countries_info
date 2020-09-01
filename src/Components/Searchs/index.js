import React from 'react'
import styles from './style.module.scss'

function index(props)   {
    const regionChangeHandler = (e) => {
        props.changeRegion(e.target.value)
    }
    const filterCountryHandler = (e) => {
        props.filterCountry(e.target.value)
    }
    return (
        <div className={styles.bar}>
            <input placeholder="Search for country" onChange={filterCountryHandler} />
            <select onChange={regionChangeHandler}>
                <option value="" hidden>Filter By Region</option>
                <option value="africa">Africa</option>
                <option value="americas">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
            </select>
        </div>
    )
}

export default index