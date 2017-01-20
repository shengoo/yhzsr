'use strict';

import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';


class ViewContainer extends Component {
    constructor() {
        super()
    }

    render(){
        return(
            <View style={[styles.viewContainer, this.props.style || {}]}>
                {this.props.children}
            </View>
        )
    }

}


const styles = StyleSheet.create({
    viewContainer:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor: 'white',
        alignItems:'stretch',
    }
})

module.exports = ViewContainer;
