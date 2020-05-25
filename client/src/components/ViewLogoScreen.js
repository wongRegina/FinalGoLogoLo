import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import domtoimage from 'dom-to-image';
import { Query, Mutation } from 'react-apollo';
import { Rnd } from "react-rnd";

const GET_LOGO = gql`
    query logo($logoId: String, $user: String) {
        logo(id: $logoId, user: $user) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
            height
            width
            textX
            textY
            url
            imageX
            imageY
            imageWidth
            imageHeight
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    componentDidMount() {
        let auth = localStorage.getItem("User");
        if (!auth) {
            window.location.href = "http://localhost:3000/auth/google";
        }
    }

    exportLogo = (event) => {
        domtoimage.toPng(document.getElementById('logo'), { quality: 0.95, bgcolor: "white" })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'logo.png';
                link.href = dataUrl;
                link.click();
            });
    }

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id, user: localStorage.getItem("User") }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if (!data.logo) return `Error! Permission Denied`;

                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/">Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <div className="container row">
                                        <div className="col-md-3">
                                            <dl>
                                                <dt>Text:</dt>
                                                <dd>{data.logo.text}</dd>
                                                <dt>Text Color:</dt>
                                                <dd>{data.logo.color}</dd>
                                                <dt>Font Size:</dt>
                                                <dd>{data.logo.fontSize}</dd>
                                                <dt>Background Color:</dt>
                                                <dd>{data.logo.backgroundColor}</dd>
                                                <dt>Border Color:</dt>
                                                <dd>{data.logo.borderColor}</dd>
                                                <dt>Border Radius:</dt>
                                                <dd>{data.logo.borderRadius}</dd>
                                                <dt>Border Width(Border Thickness):</dt>
                                                <dd>{data.logo.borderWidth}</dd>
                                                <dt>Padding:</dt>
                                                <dd>{data.logo.padding}</dd>
                                                <dt>Margin:</dt>
                                                <dd>{data.logo.margin}</dd>
                                                <dt>Height:</dt>
                                                <dd>{data.logo.height}</dd>
                                                <dt>Width:</dt>
                                                <dd>{data.logo.width}</dd>
                                                <dt>Last Updated:</dt>
                                                <dd>{data.logo.lastUpdate}</dd>
                                            </dl>
                                        </div>
                                        <div className="col-md-8" style={{
                                            width: "max-content",
                                            height: "max-content", overflow: 'auto'
                                        }} id="logo">
                                            <div className="row" style={
                                                {
                                                    color: data.logo.textColor,
                                                    fontSize: parseInt(data.logo.fontSize),
                                                    backgroundColor: data.logo.backgroundColor,
                                                    borderColor: data.logo.borderColor,
                                                    borderStyle: "solid",
                                                    borderRadius: data.logo.borderRadius,
                                                    borderWidth: data.logo.borderWidth,
                                                    padding: data.logo.padding,
                                                    margin: data.logo.margin,
                                                    width: data.logo.width,
                                                    height: data.logo.height,
                                                    overflow: 'auto'
                                                }}>
                                                <Rnd
                                                    position={{ x: data.logo.textX, y: data.logo.textY }}
                                                    bounds="parent"
                                                    style={{
                                                        color: data.logo.color,
                                                        fontSize: parseInt(data.logo.fontSize)
                                                    }}
                                                    onDragStop={(e, d) => { }}
                                                >
                                                    {data.logo.text}
                                                </Rnd>
                                                <Rnd
                                                    position={{ x: data.logo.imageX, y: data.logo.imageY }}
                                                    bounds="parent"
                                                >
                                                    <img src={data.logo.url} width={data.logo.image === "" ? 0 : data.logo.imageWidth} height={data.logo.image === "" ? 0 : data.logo.imageHeight} draggable={false} />
                                                </Rnd>
                                            </div>
                                        </div>
                                    </div>
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>&nbsp;
                                                <button type="button" onClick={this.exportLogo} className="btn btn-danger">Export</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                </div>

                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;