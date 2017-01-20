'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, Text, Switch, AsyncStorage, Alert, TouchableHighlight,PickerIOS} from 'react-native';

import * as SearchActions from '../actions/SearchActions';
import SearchResult from './SearchResult';

var PickerItemIOS = PickerIOS.Item;
var CAR_MAKES_AND_MODELS = {
    amc: {
        name: 'AMC',
        models: ['AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer'],
    },
    alfa: {
        name: 'Alfa-Romeo',
        models: ['159', '4C', 'Alfasud', 'Brera', 'GTV6', 'Giulia', 'MiTo', 'Spider'],
    },
    aston: {
        name: 'Aston Martin',
        models: ['DB5', 'DB9', 'DBS', 'Rapide', 'Vanquish', 'Vantage'],
    },
    audi: {
        name: 'Audi',
        models: ['90', '4000', '5000', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q5', 'Q7'],
    },
    austin: {
        name: 'Austin',
        models: ['America', 'Maestro', 'Maxi', 'Mini', 'Montego', 'Princess'],
    },
    borgward: {
        name: 'Borgward',
        models: ['Hansa', 'Isabella', 'P100'],
    },
    buick: {
        name: 'Buick',
        models: ['Electra', 'LaCrosse', 'LeSabre', 'Park Avenue', 'Regal',
            'Roadmaster', 'Skylark'],
    },
    cadillac: {
        name: 'Cadillac',
        models: ['Catera', 'Cimarron', 'Eldorado', 'Fleetwood', 'Sedan de Ville'],
    },
    chevrolet: {
        name: 'Chevrolet',
        models: ['Astro', 'Aveo', 'Bel Air', 'Captiva', 'Cavalier', 'Chevelle',
            'Corvair', 'Corvette', 'Cruze', 'Nova', 'SS', 'Vega', 'Volt'],
    },
};

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {text: '', saveHistory: true,
            carMake: 'cadillac',
            modelIndex: 3,};
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

    render() {

        return (
            <View style={[styles.container, this.props.style || {}]}>
                <Text style={styles.headerText}>查询</Text>
                <View style={styles.form}>
                    <PickerIOS
                        selectedValue={this.state.carMake}
                        onValueChange={(carMake) => this.setState({carMake, modelIndex: 0})}>
                        {Object.keys(CAR_MAKES_AND_MODELS).map((carMake) => (
                            <PickerItemIOS
                                key={carMake}
                                value={carMake}
                                label={CAR_MAKES_AND_MODELS[carMake].name}
                            />
                        ))}
                    </PickerIOS>
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
        marginTop: 64
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10
    },
    form: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingLeft: 20,
        paddingRight: 20
    },
    input: {
        fontSize: 18,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
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
        backgroundColor: '#52D568',
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
