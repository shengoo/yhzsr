import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    ActivityIndicator,
} from 'react-native';

import SearchResult from './SearchResult';
import * as StyleConstants from '../StyleConstants';


export default class SearchHistoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data:[]
        };
        this.baseurl = 'http://tjyh.sheng00.com/api/checkcode/';
    }

    componentDidMount() {
        if(this.timer){
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(() => {
            fetch(this.baseurl + this.props.data)
                .then((response) => response.json())
                .then(responseJson => {console.log(responseJson)
                    this.setState({
                        loading: false,
                        data: responseJson,
                    })
                })
                .catch((error) => {console.log(error)
                    this.setState({
                        loading: false,
                        data: [],
                    })
                });
        },1000);
    }

    componentWillReceiveProps(nextProps){console.log('componentWillReceiveProps');
        this.setState({
            loading: true,
            data: [],
        })
        if(this.timer){
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(() => {
            fetch(this.baseurl + this.props.data)
                .then((response) => response.json())
                .then(responseJson => {console.log(responseJson)
                    this.setState({
                        loading: false,
                        data: responseJson,
                    })
                })
                .catch((error) => {console.log(error)
                    this.setState({
                        loading: false,
                        data: [],
                    })
                });
        },1000);
    }
    componentWillUpdate(nextProps, nextState){console.log('componentWillUpdate');
        // this.setState({
        //     loading: true,
        //     data: [],
        // })
        // setTimeout(()=>{
        //     this.setState({
        //         loading: false,
        //         data: [],
        //     })
        // },200);
    }
    componentDidUpdate(prevProps, prevState){console.log('componentDidUpdate');
        // this.setState({
        //     loading: true,
        //     data: [],
        // })
        // setTimeout(()=>{
        //     this.setState({
        //         loading: false,
        //         data: [],
        //     })
        // },200);
    }


    _renderResult() {
        console.log(this.state)
        return (
            this.state.loading ?
                <ActivityIndicator
                    animating={true}
                    size="small"
                />
                :
                this.state.data.length ?
                    this.props.data.length === 13 && this.state.data.length === 1 ?
                        <View style={styles.container}>
                            <Image source={require('../assets/happy.png')} style={{width: 30, height: 30}}/>
                            <Text>{this.state.data[0].month.substr(0, 4)}年{this.state.data[0].month.substr(4)}月中签中签</Text>
                        </View>
                        :
                        <View style={styles.container}>
                            <Image source={require('../assets/happy.png')} style={{width: 30, height: 30}}/>
                            <Text>{this.state.data.length}条同名结果</Text>
                        </View>
                    :
                    <View style={styles.container}>
                        <Image source={require('../assets/sad.png')} style={{width: 30, height: 30}}/>
                        <Text>未中。。。</Text>
                    </View>
        )
    }

    render() {

        return (
            <TouchableHighlight
                onPress={(event) => {this._navigateToPersonShow(this.props.data)} }
                underlayColor='gray'
                style={{backgroundColor:'white'}}>
                <View style={styles.container}>
                    <Text>杭州：</Text>
                    <Text style={styles.title}>{this.props.data}</Text>

                    {this._renderResult()}
                    <Image source={require('../assets/more.png')} style={{width: 30, height: 30}}/>
                </View>
            </TouchableHighlight>
        );
    }

    _navigateToPersonShow(data) {
        this.props.navigator.push({
            component: SearchResult,
            ident: "result",
            title: data,
            code: data
        });
    }
}

var styles = StyleSheet.create({
    container: {
        height: StyleConstants.CELL_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: StyleConstants.SIDE_SPACE,
        paddingRight: StyleConstants.SIDE_SPACE,
        // backgroundColor:'white',

        borderBottomWidth: 1,
        borderColor: StyleConstants.DEVIDER_COLOR,
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
