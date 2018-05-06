import React, { Component } from 'react'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

class Navigation extends Component {
    render() {
        return (
            <BottomNavigation
                labelColor="white"
                rippleColor="white"
                style={{
                    height: 56,
                    elevation: 8,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0
                }}
                onTabChange={newTabIndex => alert(`New Tab at position ${newTabIndex}`)}


            >
                <Tab
                    barBackgroundColor="dimgrey"
                    label="Home"
                    icon={<Icon size={24} color="white" name="home" />}

                />
                <Tab
                    barBackgroundColor="dimgrey"
                    label="Books"
                    icon={<Icon size={24} color="white" name="library-books" />}

                />
                <Tab
                    barBackgroundColor="dimgrey"
                    label="Add Entry"
                    icon={<Icon size={24} color="white" name="add-circle-outline" />}
                />
                <Tab
                    barBackgroundColor="dimgrey"
                    label="Books"
                    icon={<Icon size={24} color="white" name="book" />}
                />
                <Tab
                    barBackgroundColor="dimgrey"
                    label="Account Settings"
                    icon={<Icon size={24} color="white" name="settings" />}
                />
            </BottomNavigation>
        )
    }
}

module.exports = Navigation