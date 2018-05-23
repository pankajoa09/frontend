'use strict';

import {Dimensions} from "react-native";

const React = require('react-native');

const {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({

    detail_bigtitle: {
        fontSize: 18,
        textAlign: 'left',
        margin: 7,
    },
    detail_subtitle: {
        fontSize: 14,
        textAlign: 'left',
        margin: 7,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    detail_container: {
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
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    bigtitle: {

        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'System',
        margin: 1,
        paddingTop: 2.5,
        paddingLeft: 20,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '100',
        fontFamily: 'System',
        margin: 1,
        paddingTop: 2.5,
        paddingLeft: 20,
    },

    cornertitle: {
        textAlign: 'right',
        fontSize: 18,
        fontWeight: '100',
        fontFamily: 'System',
        color: 'grey',
        margin: 1,
        paddingTop: 2.5,
        paddingRight: 10,
        marginRight:10,

    },
    container: {
        backgroundColor: 'white',
        flex: 1,

    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backTextWhite: {
        color: 'white',
        fontSize: 12,
        fontWeight: '200',
        fontFamily: 'System',
    },
    rowFront: {
        //flex:1,
        //alignItems: 'flex-start',
        backgroundColor: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'rgb(128, 0, 0)',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: '‎rgb(128, 0, 0)',

        right: 0
    },
    backRightBtnRight: {
        backgroundColor: '‎rgb(128, 0, 0)',
        right: 0
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: Dimensions.get('window').width / 4,
    }

});