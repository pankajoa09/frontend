
import React, { Component } from 'react';


import pie_chart from "../styleSheets/PieChart_style";
import currentServerAddress from '../currentServerAddress'
import helperFunctions from './HelperFunctions'
const address= currentServerAddress.address();



import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import PieChartView from './PieChartView';


class PieChartMultipleView extends Component{

    constructor(props) {
        super(props);
        this.state = {
            listType: ''
        };
    }





    render() {
        const {
            entries
        }=this.props;


        return(
            <View style={pie_chart.container}>
                <View style={pie_chart.controls}>
                    <View style={pie_chart.switchContainer}>
                        { ['Ledger', 'AccountID', 'Comment'].map( type => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    pie_chart.switch,
                                    {backgroundColor: this.state.listType === type ? '#99d9f4' : 'white'}
                                ]}
                                onPress={ _ => this.setState({listType: type}) }
                            >
                                <Text style={{color:'dimgrey',fontSize:10}}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                {
                    this.state.listType === 'Ledger' &&

                    <PieChartView
                        dict = {helperFunctions.getUniqueAndTally(entries,'Ledger')}

                    />
                }
                {
                    this.state.listType === 'AccountID' &&

                    <PieChartView
                        dict = {helperFunctions.getUniqueAndTally(entries,'AccountID')}

                    />


                }
                {
                    this.state.listType === 'Comment' &&
                    <PieChartView
                        dict = {helperFunctions.getUniqueAndTally(entries,'Comment')}
                    />


                }
            </View>
        );


    }


}

module.exports = PieChartMultipleView;