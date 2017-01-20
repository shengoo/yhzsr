/**
 * Created by sheng on 2016/12/12.
 */

'use strict';

import React, {Component,PropTypes} from 'react';
import {View,Text} from 'react-native';

import SearchForm from '../components/SearchForm';
import SearchHistory from '../components/SearchHistory';
import ViewContainer from '../components/ViewContainer';

import * as StyleConstants from '../StyleConstants';

class IndexScreen extends Component{
    constructor(props){
        super(props);
    }
    static propTypes = {
        // title: PropTypes.string.isRequired,
        navigator: PropTypes.object.isRequired,
    }

    render(){
        return(
            <ViewContainer style={{backgroundColor:StyleConstants.BG_COLOR}}>
                <SearchForm {...this.props} />
                <SearchHistory {...this.props}/>
            </ViewContainer>
        )
    }

}


module.exports = IndexScreen;