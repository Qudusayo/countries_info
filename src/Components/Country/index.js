import React, { Component } from "react";
import request from "superagent";
import { Link, withRouter } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styles from "./style.module.scss";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
        };
    }
    componentDidMount() {
        console.log(`${this.props.history}`)
        request
            .get(
                `https://restcountries.eu/rest/v2/alpha/nga`
            )
            .then((result) => {
                this.setState({ info: result.body });
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <SkeletonTheme highLightColor="#dededf" color="#dedede">
                <Link to="/">
                    <button className={ this.props.darkMode ? styles.darkBtn : styles.lightMode }>Back</button>
                </Link>
                <div className={[ styles.container, this.props.darkMode ? styles.darkMode : styles.lightMode ].join(" ")}>
                    {this.state.info.flag ? (
                        <div
                            className={styles.img}
                            style={{
                                backgroundImage: `url('${this.state.info.flag}')`,
                            }}
                        ></div>
                    ) : (
                        <Skeleton width={400}  height={300} className={styles.flagSkeleton} />
                    )}
                    <div className={styles.info}>
                        <h2>
                            {this.state.info.name ? (
                                this.state.info.name
                            ) : (
                                <Skeleton />
                            )}
                        </h2>
                        <div className={styles.flex}>
                            <div>
                                <h3>
                                    Native Name:{" "}
                                    <span className={styles.bold}>
                                        {this.state.info.nativeName}
                                    </span>
                                </h3>
                                <h3>
                                    Population:{" "}
                                    <span className={styles.bold}>
                                        {this.state.info.population}
                                    </span>
                                </h3>
                                <h3>
                                    Region:{" "}
                                    <span className={styles.bold}>
                                        {this.state.info.region}
                                    </span>
                                </h3>
                                <h3>
                                    Sub Region:{" "}
                                    <span className={styles.bold}>
                                        {this.state.info.subregion}
                                    </span>
                                </h3>
                                <h3>
                                    Capital:{" "}
                                    <span className={styles.bold}>
                                        {this.state.info.capital}
                                    </span>
                                </h3>
                            </div>
                            <div>
                                <h3>
                                    Top Level Domain:{" "}
                                    <span className={styles.bold}>
                                        {this.state.info.topLevelDomain
                                            ? this.state.info.topLevelDomain.map(
                                                  (domain) => domain
                                              )
                                            : null}
                                    </span>
                                </h3>
                                <h3>
                                    Currencies:{" "}
                                    <span className={styles.bold}>
                                        {this.state.info.currencies
                                            ? this.state.info.currencies.map(
                                                  (currency) => currency.code
                                              )
                                            : null}
                                    </span>
                                </h3>
                                <h3>
                                    Languages:{" "}
                                    <span className={styles.bold}>
                                        {this.state.info.languages
                                            ? this.state.info.languages.map(
                                                  (language) => language.name
                                              )
                                            : null}
                                    </span>
                                </h3>
                            </div>
                        </div>
                        <h2 className={styles.border}>Border Countries : </h2>
                        {this.state.info.borders
                            ? this.state.info.borders.map((border) => (
                                  <span
                                      key={border}
                                      className={styles.borderCountry}
                                  >
                                      {border}
                                  </span>
                              ))
                            : null}
                    </div>
                </div>
            </SkeletonTheme>
        );
    }
}

export default withRouter(Index);
