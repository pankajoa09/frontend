import React from 'react';
import {
    Text,
    View,
    Dimensions
} from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import randomColor from 'randomcolor';

class PieChartView extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedSlice: {
                label: '',
                value: 0
            },
            labelWidth: 0,
        }
    }

    sanitizeDict(dict){
        return dict.filter(x=>x.value!==0).map(x=>({key:x.key,value:Math.abs(x.value)}));

    }




    render() {
        const {
            dict
        } = this.props;

        const saniDict = this.sanitizeDict(dict);
        const { labelWidth, selectedSlice } = this.state;
        const { label, value } = selectedSlice;
        console.log("IN PIECHARTVIEW");
        //const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter'];
        //const values = [15, 25, 35, 45, 55];
        //const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff'];

        const total = saniDict.map(_=>_.value).reduce((a,b)=>a+b,0);
        const colors = ['#600080', '#9900cc', '#c61aff'];
        const keys = saniDict.map(x=>x.key);
        const values = saniDict.map(x=>x.value);
        const percentages = saniDict.map(x=>(x.value/total));
        //const values = [10,20,30];

        console.log(keys);
        console.log(values);


        //const colors = keys.map(x=>randomColor());
        const data = keys.map((key, index) => {
            return {
                key,
                value: values[index],
                svg: { fill: colors[index] },
                arc: { outerRadius: (70 + percentages[index]) + '%', padAngle: label === key ? 0.1 : 0 },
                onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
            }
        });
        const deviceWidth = Dimensions.get('window').width;

        return (
            <View style={{ justifyContent: 'center', flex: 0 }}>
                <PieChart
                    style={{ height: 200 }}
                    outerRadius={'80%'}
                    innerRadius={'30%'}
                    data={data}
                />
                <Text
                    onLayout={({ nativeEvent: { layout: { width } } }) => {
                        this.setState({ labelWidth: width });
                    }}
                    style={{
                        position: 'relative',
                        left: deviceWidth / 2 - labelWidth / 2,
                        textAlign: 'center'
                    }}>
                    {`${label} \n ${value}`}
                </Text>
            </View>
        )
    }
}



module.exports = PieChartView;