'use strict';

import {Dimensions} from "react-native";

const React = require('react-native');

const {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({

    bigtitle: {
        fontSize: 18,
        textAlign: 'left',
        margin: 7,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'left',
        margin: 7,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 20,
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#ffffff',
    },
    welcome: {
        fontSize: 16,
        textAlign: 'center',
        margin: 20,
    },
    label: {
        fontSize: 14,
        textAlign: 'left',
        margin: 0,
        color: 'darkslategrey',

    },
    data: {
        fontSize: 18,
        textAlign: 'left',
        margin: 7,
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    blueButton: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    redButton: {
        height: 36,
        backgroundColor: '#db0404',
        borderColor: '#db0404',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },


});