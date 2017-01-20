import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
} from 'react-native';

import SearchResult from './SearchResult'


export default class SearchHistoryItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                onPress={(event) => {this._navigateToPersonShow(this.props.data)} }
                underlayColor='gray'>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.data}</Text>
                    <Image source={require('../assets/more.png')} style={{width: 30, height: 30}} />
                </View>
            </TouchableHighlight>
        );
    }
    _navigateToPersonShow(data) {
        this.props.navigator.push({
            component:SearchResult,
            ident: "result",
            title:data,
            code:data
        });
    }
}

var styles = StyleSheet.create({
    container: {
        height: 65,
        flexDirection: 'row',
        alignItems:'center',
        padding: 10,
        backgroundColor:'white'
    },

    title: {
        fontSize: 17,
        color: 'black',
        alignSelf: 'center',
        marginLeft: 10,
        flex: 9,
        textAlign: 'left'
    },

    disclosureIndicator: {
        marginRight: 10,
        alignSelf: 'center'
    },

    separator: {
        height: 0.3,
        backgroundColor: '#C8C7CC',
        marginBottom: 0,
    }
});
