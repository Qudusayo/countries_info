import Card from "../Card";
import Spinner from "../Spinner";
import Searchs from "../Searchs";

import styles from "./style.module.scss";

import React, { Component } from "react";
import { Link } from "react-router-dom"
import request from "superagent";
import debounce from "lodash.debounce";

class Index extends Component {
    constructor(props) {
        super(props);

        // Sets up our initial state
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            countries: [],
            initial: 0,
            final: 20,
            total: 0,
            loop: 20,
            url: "https://restcountries.com/v3.1/all",
            filter: ""
            // total: 250,
        };

        // Binds our scroll event handler
        window.onscroll = debounce(() => {
            const {
                loadCountries,
                state: { error, isLoading, hasMore },
            } = this;

            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            if (error || isLoading || !hasMore) return;

            // Checks that the page has scrolled to the bottom
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                loadCountries();
            }
        }, 500);
    }

    componentDidMount() {
        this.loadCountries();
    }

    changeRegion = (region) => {
        this.setState({
            error: false,
            hasMore: true,
            isLoading: false,
            countries: [],
            initial: 0,
            final: 12,
            loop: 12,
            url: `https://restcountries.com/v3.1/region/${region}`,
        });
        this.loadCountries();
        this.setState({filter: ""})
    };

    filterCountry = (beginsWith) => {
        if (beginsWith) {
            const filter = beginsWith[0].toUpperCase() + beginsWith.slice(1).toLowerCase();
            this.setState({ filter })
            request.get(this.state.url).then((result) => {
                const positive = result.body.filter((country) =>
                    country.name.official.startsWith(this.state.filter)
                );

                this.setState({
                    error: false,
                    hasMore: false,
                    isLoading: false,
                    countries: positive,
                });
            });
        } else {
            this.setState({
                error: false,
                hasMore: true,
                isLoading: false,
                countries: [],
                initial: 0,
                final: 20,
                total: 0,
                loop: 20,
                url: "https://restcountries.eu/rest/v2/all",
            });
            this.loadCountries();
        }
    };

    loadCountries = () => {
        this.setState({ isLoading: true }, () => {
            request
                .get(this.state.url)
                .then((results) => {
                    this.setState({ total: results.body.length });
                    let resulted = results.body.slice(
                        this.state.initial,
                        this.state.final
                    );
                    // Creates a massaged array of user data
                    const nextCountries = resulted.map((country) => ({
                        name: country.name,
                        flag: country.flags.png,
                        population: country.population,
                        region: country.region,
                        capital: country.capital,
                        alpha3Code: country.cca3

                    }));

                    // Merges the next countries into our existing countries
                    this.setState({
                        isLoading: false,
                        countries: [...this.state.countries, ...nextCountries],
                        initial: this.state.initial + this.state.loop,
                        final: this.state.final + this.state.loop,
                    });
                    this.setState({
                        hasMore:
                            this.state.countries.length < results.body.length,
                    });
                })
                .catch((err) => {
                    this.setState({
                        error: err.message,
                        isLoading: false,
                    });
                });
        });
    };

    render() {
        const { error, hasMore, countries } = this.state;

        return (
            <>
                <Searchs
                    changeRegion={this.changeRegion}
                    filterCountry={this.filterCountry}
                    darkMode={this.props.darkMode}
                />
                <div className={[ styles.container, this.props.darkMode ? styles.darkMode : styles.lightMode ].join(" ")}>
                    {countries.map((country, index) => (
                        <Link key={index} to={`/country/${country.alpha3Code}`}>
                            <Card 
                                name={country.name}
                                flag={country.flag}
                                population={country.population}
                                region={country.region}
                                capital={country.capital}
                                darkMode={this.props.darkMode}
                            />
                        </Link>
                    ))}
                </div>
                {error && <div style={{ color: "#900" }}>{error}</div>}
                {hasMore ? <Spinner /> : null}
            </>
        );
    }
}

export default Index;
