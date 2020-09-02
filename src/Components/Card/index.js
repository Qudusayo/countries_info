import React from "react";
import Skeleton from "react-loading-skeleton";
import  { withRouter } from "react-router-dom"

import styles from "./style.module.scss";

function index(props) {
    return (
        <div className={[styles.container, props.darkMode ? styles.darkMode : styles.lightMode ].join(" ")}>
            <div
                className={styles.img}
                style={{ backgroundImage: `url('${props.flag}')` }}
            >
                {props.flag ? null : <Skeleton />}
            </div>
            <div className={styles.content}>
                <h3>{props.name ? props.name : <Skeleton />}</h3>
                <p>
                    <span className={styles.bold}>Population: </span>
                    {props.population ? props.population : <Skeleton />}
                </p>
                <p>
                    <span className={styles.bold}>Region: </span>
                    {props.region ? props.region : <Skeleton />}
                </p>
                <p>
                    <span className={styles.bold}>Capital: </span>
                    {props.capital ? props.capital : <Skeleton />}
                </p>
            </div>
        </div>
    );
}

export default withRouter(index);
