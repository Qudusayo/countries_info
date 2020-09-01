import React from "react";
import styles from './style.module.scss'

function index() {
    return (
        <>
            <div className={styles.skChase}>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
                <div className={styles.skChaseDot}></div>
            </div>
        </>
    );
}

export default index;
