import React from 'react';
import { Animated, Text, View, Button } from 'react-native';
import {TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import styles from "../style";
import * as Animatable from 'react-native-animatable';

class Example2 extends React.Component {
    handleTextRef = ref => this.text = ref;

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={_=>console.log("fuck ass")} title={"fuck me"}/>
            <TouchableWithoutFeedback onPress={() => this.text.transitionTo({ opacity: 0.2 })}>
                <Animatable.Text  ref={this.handleTextRef}>Fade me!</Animatable.Text>
            </TouchableWithoutFeedback>
            </View>
        );
    }
}

module.exports = Example2;