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
                style={{height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',}}
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
        padding: 10,
    },
    historyList: {
        // paddingTop:-10,
        // marginTop:-19,
        // backgroundColor: "blue"
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
});