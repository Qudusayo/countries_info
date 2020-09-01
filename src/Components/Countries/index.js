import Card from "../Card";
import Navbar from "../Navbar"
import  Spinner from "../Spinner"
import styles from './style.module.scss'


import React, { Component, Fragment } from "react";
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

    componentWillMount() {
        this.loadCountries();
    }

    loadCountries = () => {
        this.setState({ isLoading: true }, () => {
            request
                .get("https://restcountries.eu/rest/v2/all")
                .then((results) => {
                    let resulted = results.body.slice(
                        this.state.initial,
                        this.state.final
                    );
                    // Creates a massaged array of user data
                    const nextCountries = resulted.map((country) => ({
                        name: country.name,
                        flag: country.flag,
                        population: country.population,
                        region: country.region,
                        capital: country.capital,
                    }));

                    // Merges the next countries into our existing countries
                    this.setState({
                        hasMore: this.state.countries.length < 250,
                        isLoading: false,
                        countries: [...this.state.countries, ...nextCountries],
                        initial: this.state.initial + 20,
                        final: this.state.final + 20
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
        const { error, hasMore, isLoading, countries } = this.state;

        return (
            <>
                <Navbar />
                <div className={styles.container}>
                    {countries.map((country, index) => (
                        <Card
                            key={index}
                            name={country.name}
                            flag={country.flag}
                            population={country.population}
                            region={country.region}
                            capital={country.capital}
                        />
                    ))}
                </div>
                {error && <div style={{ color: "#900" }}>{error}</div>}
                {countries.length < 250 ? <Spinner /> : null}
                {!hasMore && <div>You did it! You reached the end!</div>}
            </>
        );
    }
}


export default Index;
