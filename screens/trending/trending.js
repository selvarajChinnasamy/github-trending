import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import TrendingPlaceholder from "../../components/trendingPlaceholder/trendingPlaceholder";
import Header from "../../components/header/header";

import Styles from "./trending.styles";

const API_ENDPOINT = "https://api.github.com/search/repositories?q=trending&per_page=10&sort=stars&order=desc&page=currentPage";

const Trending = () => {

    const [trendingData, setTrendingData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorOnDataLoad, setErrorOnDataLoad] = useState();
    const [currentExpandedItem, setCurrentExpandedItem] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        let cachedItems = await AsyncStorage.getItem('trendingData');
        if (cachedItems) {
            cachedItems = JSON.parse(cachedItems);
            if (cachedItems && cachedItems.validTill && new Date(cachedItems.validTill) > new Date()) {
                await setTrendingData(cachedItems.items);
            } else {
                fetchData();
            }
        } else {
            fetchData();
        }
    }

    const fetchData = async () => {
        try {
            setCurrentExpandedItem('');
            setErrorOnDataLoad('');
            setLoading(true);
            const networkRequest = await fetch(API_ENDPOINT);
            const trendingData = await networkRequest.json();
            if (trendingData && trendingData.items && trendingData.items.length) {
                setTrendingData(trendingData.items);
                cacheData(trendingData.items);
            }
            setLoading(false);
        }
        catch (errors) {
            setLoading(false);
            showErrorMessage(errors);
        }
    }

    const cacheData = async (items) => {
        try {
            const validTill = new Date();
            validTill.setHours(validTill.getHours() + 2);
            const cacheObj = {
                validTill,
                items
            };
            await AsyncStorage.setItem('trendingData', JSON.stringify(cacheObj));
        }
        catch (err) {
            console.log(err);
        }
    }

    const showErrorMessage = (errors) => {
        if (errors && errors[0] && errors[0].message && (typeof errors[0].message == "string")) {
            setErrorOnDataLoad(errors[0].message);
        } else {
            setErrorOnDataLoad("Something went wrong!");
        }
    }

    const pullToRefresh = () => {
        fetchData();
    }

    const renderPlaceholder = () => {
        const rows = new Array(15).fill(1);
        return (
            <View>
                {rows.map((item, index) => <TrendingPlaceholder key={index} />)}
            </View>
        );
    }

    const noItemDisplay = () => {
        return (
            <View style={Styles.emptyListMessage}>
                <Text style={Styles.fontStyle}>No data found!</Text>
            </View>
        );
    }

    const expandItem = (itemId) => {
        if (currentExpandedItem && currentExpandedItem === itemId) {
            setCurrentExpandedItem('');
        } else {
            setCurrentExpandedItem(itemId);
        }
    }

    const renderTrendingRow = ({ item }) => {
        return (
            <TouchableOpacity key={'' + item?.id} onPress={() => expandItem(item?.id)}>
                <View
                    style={{
                        borderBottomColor: '#DCDCDC',
                        borderBottomWidth: 1,
                    }}
                />
                <View style={Styles.trendingCard}>
                    <View style={Styles.trendingCardAvatar}>
                        <Image
                            style={Styles.avatar}
                            source={{ uri: item?.owner?.avatar_url }}
                        />
                    </View>
                    <View style={Styles.trendingCardContent}>
                        <Text style={Styles.trendingCardContentTitle}>{item?.name}</Text>
                        <Text style={Styles.trendingCardContentDesc}>{item?.full_name}</Text>
                        {currentExpandedItem === item?.id &&
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ marginVertical: 7 }}>
                                    <Text style={{ ...Styles.fontStyle, fontSize: 15 }}>{item.description}</Text>
                                </View>
                                <View style={{ marginVertical: 5, flexDirection: 'row' }}>
                                    <View style={Styles.itemCounts}>
                                        <View style={Styles.itemCountsBox} />
                                        <Text style={Styles.itemCountsText}>{item.language}</Text>
                                    </View>
                                    <View style={{ marginLeft: 10, ...Styles.itemCounts }}>
                                        <Image
                                            style={Styles.itemCountsImg}
                                            source={require('../../assets/star-yellow.png')}
                                        />
                                        <Text style={Styles.itemCountsText}>{item.stargazers_count}</Text>
                                    </View>
                                    <View style={{ marginLeft: 10, ...Styles.itemCounts }}>
                                        <Image
                                            style={Styles.itemCountsImg}
                                            source={require('../../assets/fork-black.png')}
                                        />
                                        <Text style={Styles.itemCountsText}>{item.forks_count}</Text>
                                    </View>
                                </View>
                            </View>}
                    </View>
                </View>
                <View
                    style={{
                        borderBottomColor: '#DCDCDC',
                        borderBottomWidth: 1,
                    }}
                />
            </TouchableOpacity>
        );
    }

    const renderTrendingInfo = () => {
        return (
            <FlatList
                onRefresh={() => pullToRefresh()}
                refreshing={loading}
                data={trendingData}
                ListEmptyComponent={noItemDisplay}
                keyExtractor={(item) => '' + item?.id}
                renderItem={renderTrendingRow}
            />
        );
    }

    const renderData = () => {
        if (loading) {
            return renderPlaceholder();
        }
        if (errorOnDataLoad) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Text style={Styles.fontStyle}>{errorOnDataLoad}</Text>
                    <TouchableOpacity onPress={() => fetchData()} style={Styles.button}>
                        <Text style={Styles.buttonText}>Retry</Text>
                    </TouchableOpacity>
                </View>);
        }
        return renderTrendingInfo();
    }

    return (
        <View>
            <Header />
            {renderData()}
        </View>
    );
}

export default Trending;