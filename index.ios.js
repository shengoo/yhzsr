/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    TouchableHighlight,
    Text,
    NavigatorIOS
} from 'react-native';

import IndexScreen from './app/screens/IndexScreen';
import SearchResult from './app/components/SearchResult';

export default class yhzs extends Component {
    constructor(props) {
        super(props);
    }


    initialRoute = {
        component: IndexScreen,
        title: '首页',
    };

    render() {
        return (
            <NavigatorIOS
                initialRoute={this.initialRoute}
                style={{flex: 1}}
            />
        );
    }
}

const styles = StyleSheet.create({
    navigator: {
        paddingTop: 64
    }
});

AppRegistry.registerComponent('yhzs', () => yhzs);
