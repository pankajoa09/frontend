import React from 'react'
import { LineChart, Grid, BarChart } from 'react-native-svg-charts'

class LineGraphExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const fill = 'rgb(134, 65, 244)'
        const {
            entries
        } = this.props
        return (
            <BarChart
                style={{ height: 200 }}
                data={ entries.map(x=>x.Amount) }
                svg={{ fill }}
                contentInset={{ top: 30, bottom: 30 }}
            >
                <Grid/>
            </BarChart>

        )
    }

}



module.exports = LineGraphExample;