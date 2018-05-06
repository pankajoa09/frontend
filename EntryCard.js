import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Card } from "react-native-elements";


class EntryCard extends Component{
    constructor(props){
        super(props);
        this.state = {Text: props.Text };


    }

    render() {
        let display = this.state.Text;
        console.log("EntryCard");
        console.log(display);
        return (
          <Card>
              <Text>{display}</Text>
          </Card>
        );
    }

}

module.exports = EntryCard;