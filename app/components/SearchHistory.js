/**
 * Created by sheng on 2016/12/12.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    AsyncStorage,
    RecyclerViewBackedScrollView
} from 'react-native';
import SearchStore from '../stores/SearchStore';
import SearchHistoryItem from './SearchHistoryItem';
import * as StyleConstants from '../StyleConstants';

export default class SearchHistory extends Component {
    constructor(props) {
        super(props);


        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            history: SearchStore.getAll(),
            dataSource: this.ds.cloneWithRows(SearchStore.getAll()),
        };

        this.getHistory = this.getHistory.bind(this);
        this.renderRow = this.renderRow.bind(this);

    }

    componentWillMount() {
        SearchStore.on('change', this.getHistory);
    }

    componentWillUnmount() {
        SearchStore.removeListener('change', this.getHistory);
    }

    getHistory() {
        this.setState({
            dataSource: this.ds.cloneWithRows(SearchStore.getAll()),
        });
    }


    render() {
        return (
            <View style={[styles.historyContainer, this.props.style || {}]}>
                <Text style={styles.headerText}>历史记录</Text>
                <ListView
                    style={styles.historyList}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this._renderSeparator}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        )
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}

            />
        );
    }

    renderRow(rowData, sectionID, rowID) {
        //(rowData) => <TouchableOpacity><Text>{rowData}</Text></TouchableOpacity>
        return (
            <SearchHistoryItem   {...this.props} data={rowData}/>
        )
    }

}

const styles = StyleSheet.create({
    historyContainer: {
        flex: 1,
        // backgroundColor: 'yellow',
        // padding: 10,
    },
    historyList: {
        // paddingTop:-10,
        // marginTop:-19,
        // backgroundColor: "blue"
        // borderTopWidth:1,
        // borderBottomWidth:1,
        // borderColor: StyleConstants.DEVIDER_COLOR,
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
});