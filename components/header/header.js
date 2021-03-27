import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Styles from "./header.styles";

const Header = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <View style={{ width: 40 }}></View>
            <Text style={Styles.title}>Trending</Text>
            <TouchableOpacity>
                <Image
                    style={Styles.more}
                    source={require('../../assets/more-black.png')}
                />
            </TouchableOpacity>
        </View>
    );
}

export default Header;