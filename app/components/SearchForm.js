'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Text, Switch, AsyncStorage, Alert, TouchableHighlight,ActionSheetIOS, TouchableOpacity,Image} from 'react-native';

import * as SearchActions from '../actions/SearchActions';
import SearchResult from './SearchResult';
import * as StyleConstants from '../StyleConstants';
var BUTTONS = [
    '广州',
    '深圳',
    '杭州',
    '天津',
    '取消',
];
var CANCEL_INDEX = 4;

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {text: '', saveHistory: true,
            city:'广州'
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    search() {
        const q = this.state.text;
        if (!q) {
            Alert.alert('输入姓名或摇号申请编码进行查询');
            return;
        }
        if (this.state.saveHistory) {
            SearchActions.createItem(q);
        }
        this.props.navigator.push({
            component: SearchResult,
            ident: "result",
            name: 'result',
            code: this.state.text,
            title: this.state.text
        });
        this.setState({text: ''});
    }

    handleKeyDown(e) {
        if (e.nativeEvent.key == "Enter") {
            this.search();
        }
    }

    showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
            },
            (buttonIndex) => {
                if(buttonIndex!== CANCEL_INDEX)
                    this.setState({ city: BUTTONS[buttonIndex] });
            });
    };

    render() {

        return (
            <View style={[styles.container, this.props.style || {}]}>
                <Text style={styles.headerText}>查询</Text>
                <View style={styles.form}>
                    <View style={styles.cityContainer}>
                        <Text style={styles.cityLabel}>
                            选择城市：
                        </Text>
                        <TouchableOpacity onPress={this.showActionSheet} style={styles.city}>
                            <Text style={styles.cityText}>
                                {this.state.city}
                            </Text>
                            <Image source={require('../assets/more.png')} style={{width: 30, height: 30}} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        returnKeyType={'search'}
                        maxLength={13}
                        placeholder={'输入姓名或摇号申请编码进行查询'}
                        onSubmitEditing={this.onButtonPress}
                        blurOnSubmit={false}
                        onKeyPress={this.handleKeyDown}
                        controlled={true}
                    />
                    <View style={styles.switchContainer}>
                        <Text style={{flex:1}}>
                            保存查询信息
                        </Text>
                        <Switch
                            onValueChange={(value) => this.setState({saveHistory: value})}
                            value={this.state.saveHistory}/>
                    </View>
                    <View style={styles.saveButtonContainer}>
                        <TouchableHighlight
                            underlayColor='green'
                            style={styles.saveButton}
                            onPress={this.search.bind(this)}>
                            <Text style={styles.buttonText}>查询</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        // backgroundColor: '#EFEFF2',
        // backgroundColor: '#fff',
        marginTop: 64,
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10
    },
    form: {
        borderTopWidth:1,borderBottomWidth:1,
        borderColor: StyleConstants.DEVIDER_COLOR,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingLeft: 20,
        paddingRight: 20
    },
    cityContainer:{
        height:StyleConstants.CELL_HEIGHT,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        borderBottomWidth:1,
        borderColor: StyleConstants.DEVIDER_COLOR,
    },
    city:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    cityLabel: {
        fontWeight: '500',
    },
    cityText:{
        fontWeight: '500',
    },
    input: {
        fontSize: 18,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: StyleConstants.DEVIDER_COLOR,
        borderRadius: 5,
        color: '#48bbec',
        alignSelf: 'stretch',
        height: 50
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8
    },
    saveButtonContainer: {
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    saveButton: {
        height: 49,
        backgroundColor: '#10E100',
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'stretch',
        borderRadius: 5,
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'white'
    },
});

module.exports = SearchForm;
