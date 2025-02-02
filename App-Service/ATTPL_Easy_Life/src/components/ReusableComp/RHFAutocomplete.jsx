import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/selectors';

export default function RHFAutocomplete({ name, label, placeholder, options, setValue, ...other }) {
    const theme = useSelector(selectTheme);
    const { colors, fonts } = theme;
    const [query, setQuery] = useState('');
    const [showList, setShowList] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const filteredOptions = options.filter(option => option.toLowerCase().includes(query.toLowerCase()));
    const flatListRef = useRef();

    const handleSelectOption = (option) => {
        setQuery(option);
        setValue(option);
        setShowList(false);
    };

    const handleFocus = () => {
        setShowList(true);
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleClickOutside = () => {
        setShowList(false);
        Keyboard.dismiss();
    };

    useEffect(() => {
        const hideSubscription = Keyboard.addListener('keyboardDidHide', handleClickOutside);
        return () => {
            hideSubscription.remove();
        };
    }, []);

    return (
        <TouchableWithoutFeedback onPress={handleClickOutside}>
            <View style={{ position: "relative" }}>
                <TextInput
                    mode="outlined"
                    label={label}
                    placeholder={placeholder}
                    keyboardType="default"
                    value={query}
                    textColor={colors.text}
                    onChangeText={(text) => {
                        setQuery(text);
                        setShowList(true);
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={[
                        loginStyles.input,
                        {
                            backgroundColor: colors.surface,
                            color: colors.text,
                            marginVertical: 5,
                            borderColor: isFocused ? colors.primary : colors.backdrop,
                        },
                    ]}
                    outlineStyle={{ borderRadius: 5 }}
                    outlineColor={colors.backdrop}
                    activeOutlineColor={colors.primary}
                    placeholderTextColor={colors.placeholder}
                />
                {showList && (
                    <FlatList
                        ref={flatListRef}
                        data={filteredOptions}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectOption(item)}>
                                <Text style={{ padding: 10, color: colors.text, ...fonts.bodySmall }}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        style={{ borderWidth: 1, borderColor: '#ccc', maxHeight: 200, minHeight: 200, position: "absolute", top: -200, width: "100%", backgroundColor: colors.surface }}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        margin: 10,
        position: 'absolute',
    },
    loginForm: {
        paddingVertical: 120,
        paddingHorizontal: 24,
    },
    welcomeText: {
        textAlign: 'left',
        marginVertical: 10,
    },
    instructionText: {
        textAlign: 'left',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 35,
        borderRadius: 8,
    },
    input: {
        fontSize: 14,
        borderRadius: 5,
        fontFamily: 'PublicSans-Regular',
        borderWidth: 1,
        padding: 10,
    },
    nextButton: {
        width: '100%',
        height: 48,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'PublicSans-Regular',
        lineHeight: 26,
    },
    affix: {
        fontFamily: 'PublicSans-Regular',
    },
});
