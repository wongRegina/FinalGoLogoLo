import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Rnd } from "react-rnd";
import { NoFragmentCyclesRule } from 'graphql';
import { CollapsibleComponent, CollapsibleHead, CollapsibleContent } from "react-collapsible-component";

class Text extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "GoLogoLo",
            fontSize: "30",
            textColor: "#FF5733",
            x: 25,
            y: 25,
            lastClicked: null
        }
    }

    render() {
        const styles = {
            container: {
                color: this.state.textColor,
                fontSize: this.state.fontSize
            }
        }
        return (
            <Rnd
                position={{ x: this.state.x, y: this.state.y }}
                bounds="parent"
                style={{
                    color: this.state.textColor,
                    fontSize: parseInt(this.state.fontSize)
                }}
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
            >
                {this.state.text}
            </Rnd>
        )
    }


    handleTextChange = (event) => {
        this.setState({ text: event.target.value });
    }

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ textColor: event.target.value });
    }

    handleFontSizeChange = (event) => {
        console.log("handleTextFontChangeComplete to " + event.target.value);
        this.setState({ fontSize: event.target.value });
    }

    getEdit() {
        return <>
            <CollapsibleHead>{this.state.text}</CollapsibleHead>
            <CollapsibleContent>
                <label htmlFor="text">Text:</label>
                <input type="text" className="form-control" name="text"
                    onChange={this.handleTextChange} ref={node => {
                        this.state.text = node;
                    }} placeholder="Text" defaultValue={this.state.text} />

                <label htmlFor="color">Color:</label>
                <input type="color" className="form-control"
                    onChange={this.handleTextColorChange} name="color" ref={node => {
                        this.state.color = node;
                    }} placeholder="Color" defaultValue={this.state.color} />

                <label htmlFor="fontSize">Font Size:</label>
                <input type="number" min="2" max="144" className="form-control"
                    onChange={this.handleFontSizeChange} name="fontSize" ref={node => {
                        this.state.fontSize = node;
                    }} placeholder="Font Size" defaultValue={this.state.fontSize} />
            </CollapsibleContent>
        </>
    }

    getDraggable() {
        return <Rnd
            position={{ x: this.state.x, y: this.state.y }}
            bounds="parent"
            style={{
                color: this.state.textColor,
                fontSize: parseInt(this.state.fontSize)
            }}
            onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
        >
            {this.state.text}
        </Rnd>
    }

    getView() {
        return <Rnd
            position={{ x: this.state.x, y: this.state.y }}
            bounds="parent"
            style={{
                color: this.state.textColor,
                fontSize: parseInt(this.state.fontSize)
            }}
        >
            {this.state.text}
        </Rnd>
    }

    getTextData() {
        return "Text: " + this.state.text +
            "\n Font Size: " + this.state.text +
            "\n Text Color: " + this.state.textColor +
            "\n Location: (" + this.state.x + "," + this.state.y + ")";
    }

    getText() {
        return this.state.text;
    }
}

export default Text