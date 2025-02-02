import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../redux/selectors';

import ShimmerPlaceHolder from '../../hooks/useShimmer';

const LoadingListView = ({ hasButton }) => {

    const { colors, fonts } = useSelector(selectTheme);

    return (

        <View
            style={[
                styles.jobItem,
                { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>

                <ShimmerPlaceHolder
                    style={{
                        backgroundColor: colors.placeholder,
                        height: 22,
                        width: '60%',
                        marginBottom: 12,
                    }}
                />
            </View>
            {
                hasButton && <ShimmerPlaceHolder
                    style={{
                        backgroundColor: colors.placeholder,
                        height: 10,
                        width: '40%',
                        marginBottom: 10,
                    }}
                />
            }
            <ShimmerPlaceHolder
                style={{
                    backgroundColor: colors.placeholder,
                    height: 8,
                    width: '80%',
                    marginBottom: 10,
                }}
            />
            <ShimmerPlaceHolder
                style={{
                    backgroundColor: colors.placeholder,
                    height: 8,
                    width: '50%',
                    marginBottom: 10,
                }}
            />
            <ShimmerPlaceHolder
                style={{
                    backgroundColor: colors.placeholder,
                    height: 8,
                    width: '80%',
                    marginBottom: 10,
                }}
            />
            {hasButton && <ShimmerPlaceHolder
                style={{
                    backgroundColor: colors.placeholder,
                    height: 30,
                    width: '60%',
                    marginVertical: 10
                }}
            />}
        </View>
    );
};

export default LoadingListView;
const styles = StyleSheet.create({
    jobItem: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        elevation: 3,
    }
});
