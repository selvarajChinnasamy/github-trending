import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffff"
    },
    emptyListMessage: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    fontStyle: {
        fontSize: 17,
        color: '#555555'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    trendingCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    trendingCardAvatar: {
        flex: 1.5,
        justifyContent: 'center'
    },
    trendingCardContent: {
        flex: 7,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    trendingCardContentTitle: {
        fontSize: 13,
        color: '#555555',
        marginVertical: 2
    },
    trendingCardContentDesc: {
        fontSize: 15,
        color: '#555555',
        marginVertical: 2,
        fontWeight: '500'
    },
    itemCounts: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemCountsImg: {
        height: 20,
        width: 20
    },
    itemCountsBox: {
        height: 12,
        width: 12,
        backgroundColor: 'red',
        borderRadius: 50
    },
    itemCountsText: {
        marginLeft: 5,
        color: '#555555'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4285f3',
        marginVertical: 10,
        borderRadius: 10
    },
    buttonText: {
        marginHorizontal: 20,
        marginVertical: 8,
        fontSize: 17,
        color: '#ffff'
    }
});

export default Styles;