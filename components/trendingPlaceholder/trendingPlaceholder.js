import React from "react";
import { View } from "react-native";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

const TrendingPlaceholder = () => {
    return (
        <View>
            <View
                style={{
                    borderBottomColor: '#DCDCDC',
                    borderBottomWidth: 1,
                }}
            />
            <Placeholder
                Animation={Fade}
                style={{
                    marginVertical: 20,
                    marginHorizontal: 15
                }}
                Left={props => (
                    <PlaceholderMedia
                        style={[
                            props.style,
                            {
                                borderRadius: 50
                            }
                        ]}
                    />
                )}>
                <PlaceholderLine style={{ borderRadius: 50 }} height={10} width={40} />
                <PlaceholderLine style={{ borderRadius: 50 }} height={10} width={90} />
            </Placeholder>
            <View
                style={{
                    borderBottomColor: '#DCDCDC',
                    borderBottomWidth: 1,
                }}
            />
        </View>
    );
}

export default TrendingPlaceholder;