import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  query getLogoByUser($user: String) {
    getLogoByUser(user: $user) {
        _id
        text
        lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS} variables={{ user: localStorage.getItem("User") }}>
                {({ loading, error, data }) => {
                    let auth = localStorage.getItem("User");
                    if (loading) return 'Loading...';
                    if (!auth) return (<><div className="mx-auto container row">
                        <div className="col-md">
                            <div id="home_banner_container">
                                GoLogoLo
                            </div>
                            <br />
                            <button className={"btn btn-secondary btn-block"} onClick={() => window.location.href = "http://localhost:3000/auth/google"}>
                                Click here to log in using your Google Account
                            </button>
                        </div>
                        </div></>);
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="mx-auto container row">
                            <div className="col-md-4" style={{ marginTop: "20px" }}>
                                <h3>Recent Work</h3>
                                {data.getLogoByUser.sort((a, b) => b.lastUpdate > a.lastUpdate).map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link to={`/view/${logo._id}`}>{logo.text}</Link>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-8">
                                <div id="home_banner_container">
                                    GoLogoLo
                                </div>
                                <br></br>
                                <div>
                                    <Link id="add_logo_button" to="/create" className={"btn btn-secondary btn-block"}>Add Logo</Link>
                                    <button onClick={() => { localStorage.clear(); window.location.href = "http://localhost:3000/auth/google/logout"; }} id="logout_button" className={"btn btn-primary btn-block"}>Log out</button>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
