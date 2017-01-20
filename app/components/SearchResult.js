'use strict';
import React, {Component} from 'react';
import {
    StyleSheet, View, TextInput, Button, Text, Switch, ListView, ActivityIndicator,
    TouchableHighlight
} from 'react-native';

import ViewContainer from './ViewContainer'
import * as SearchActions from '../actions/SearchActions';

class SearchResult extends Component {
    constructor(props) {console.log(props)
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loading: true,
            dataSource: this.ds.cloneWithRows([]),
        };
        this.baseurl = 'http://tjyh.sheng00.com/api/checkcode/';
    }

    componentDidMount() {
        fetch(this.baseurl + this.props.route.code)
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson)
                this.setState({
                    loading: false,
                    data: responseJson,
                    dataSource: this.ds.cloneWithRows(responseJson),
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    data: [],
                    dataSource: this.ds.cloneWithRows([]),
                })
            });
    }

    onButtonPress() {
        SearchActions.deleteItem(this.props.route.code);
        this.props.navigator.pop();
    }

    render() {
        return (
            this.state.loading ?
                <ActivityIndicator
                    animating={true}
                    style={[styles.centering, {height: 80}]}
                    size="large"
                />
                :
                this.state.data.length ?
                    this.props.route.code.length === 13 && this.state.data.length === 1 ?
                        <ViewContainer style={{paddingTop:64}}>
                            <Text style={styles.successText}>
                                恭喜，该编号已于{this.state.data[0].month.substr(0, 4)}年{this.state.data[0].month.substr(4)}月中签！
                            </Text>
                        </ViewContainer>
                        :
                        <ViewContainer style={{paddingTop:64}}>
                            <Text style={styles.successText}>所有同名中签结果：</Text>
                            <ListView style={{flex:1}}
                                      dataSource={this.state.dataSource}
                                      renderRow={this.renderRow}
                                      renderSeparator={this._renderSeparator}
                                      enableEmptySections={true}
                            />
                            <View style={styles.saveButtonContainer}>
                                <TouchableHighlight underlayColor='#dddddd' style={styles.saveButton}
                                                    onPress={this.onButtonPress.bind(this)}>
                                    <Text style={styles.buttonText}>删除这个历史记录</Text>
                                </TouchableHighlight>
                            </View>
                        </ViewContainer>
                    :
                    <ViewContainer style={{paddingTop:64}}>
                        <Text style={styles.noresult}>很遗憾，没有中签,下次好运！</Text>
                        <View style={styles.saveButtonContainer}>
                            <TouchableHighlight underlayColor='#dddddd' style={styles.saveButton}
                                                onPress={this.onButtonPress.bind(this)}>
                                <Text style={styles.buttonText}>删除这个历史记录</Text>
                            </TouchableHighlight>
                        </View>
                    </ViewContainer>

        )
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                    left:10}}
            />
        );
    }

    renderRow(rowData, sectionID, rowID) {

        return (
            <View style={styles.listrow}>
                <Text style={styles.listitemtext}>{rowData.month.substr(0, 4)}年{rowData.month.substr(4)}月</Text>
                <Text style={styles.listitemtext}>{rowData.name}</Text>
                <Text style={styles.listitemtext}>{rowData.code}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    gray: {
        backgroundColor: '#cccccc',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
    },
    saveButtonContainer: {
        // flex: 3, //1
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    saveButton: {
        height: 49,
        backgroundColor: '#42e47e',
        // marginLeft: 20,
        // marginRight: 20,
        marginBottom: 0,
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'white'
    },
    noresult: {
        flex: 1,
        padding: 20,
    },
    successText: {
        color: 'red',
        padding: 20,
        fontSize: 20
    },
    listrow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50
    },
    listitemtext: {
        flex: 1,
        textAlign: 'center'
    }
});

module.exports = SearchResult;
