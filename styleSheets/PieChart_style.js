'use strict';

import {Dimensions} from "react-native";

const React = require('react-native');

const {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({

    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 10,
        flex: 0,
        paddingTop: 10,
        backgroundColor: '#ffffff',
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: Dimensions.get('window').width / 4,
    }


});