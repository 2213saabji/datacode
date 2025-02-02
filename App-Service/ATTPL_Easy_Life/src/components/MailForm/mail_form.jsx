import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { selectTheme } from '../../redux/selectors';
import { selectUser } from '../../redux/selectors/UMS/authSelectors';

import {
    View,
    Text,
    StyleSheet,
    Linking
} from 'react-native';
import {
    Snackbar,
    TextInput,
    Button,
} from 'react-native-paper';

import { useCustomAlert } from '../../utilities/Alert/useCustomAlert';

export default function MailForm({ complainMailDetails }) {
    const { colors, fonts } = useSelector(selectTheme);

    const { showAlert } = useCustomAlert();
    const user = useSelector(selectUser);

    const PartySchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        yearManufactured: Yup.mixed().required('Manufactured Year is required'),
    });

    // Form Values
    const defaultValues = useMemo(
        () => ({
            to: complainMailDetails?.mailTo || '',
            cc: 'attpl_Traker@gmail.com',
            subject: 'Request to resolve complaints from Local Community Concerns',
            body: `Dear Sir/Ma'am,

I hope this message finds you well. My name is ${user?.UserProfile?.firstName}, and I am a resident of Your Constituency/Community. As an engaged and concerned voter, I would like to register a complaint with you to discuss several pressing issues affecting our community.

Specifically, I am interested in addressing the following matters:

[Issue 1: Brief description]
[Issue 2: Brief description]
[Issue 3: Brief description]

I believe that your insights and leadership are crucial in finding effective solutions to these concerns. I am available for a meeting at your earliest convenience and can adjust my schedule to accommodate yours. Please let me know a suitable date and time for our meeting.

Thank you for your attention to this request. I look forward to the opportunity to speak with you and contribute to the betterment of our community.

Best regards,

 ${user?.UserProfile?.firstName} ${user?.UserProfile?.lastName}
 ${user?.phone || 'No Mobile Number Found'} 
 ${user?.email || 'No Email Found'} 
`,
        }),
        [complainMailDetails],
    );

    // Form Method
    const methods = useForm({
        resolver: yupResolver(PartySchema),
        defaultValues,
    });

    const {
        reset,
        control,
        watch,
        formState: { isSubmitting },
    } = methods;

    const value = watch();

    useEffect(() => {
        if (complainMailDetails) {
            reset(defaultValues);
        }
    }, [complainMailDetails, defaultValues, reset]);

    const helperText = 'error';

    const onSubmit = () => {
        const mailtoUrl = `mailto:${value.to}?cc=${encodeURIComponent(value.cc)}&subject=${encodeURIComponent(value.subject)}&body=${encodeURIComponent(value.body)}`;
        Linking.openURL(mailtoUrl).catch(err => showAlert('Error', 'Unable to open mail app'));
    };

    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                backgroundColor: colors.surface,
                borderRadius: 14,
            }}>

            <View>
                <Text style={[styles.title, { color: colors.text }]}>To</Text>
                <Controller
                    name="to"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                placeholder="Recipients"
                                mode="outlined"
                                textColor={colors.text}
                                activeOutlineColor={colors.text}
                                placeholderTextColor={colors.placeholder}
                                value={value}
                                onChangeText={onChange}
                                error={!!error}
                                disabled
                                helperText={error ? error?.message : helperText}
                                style={[
                                    styles.textInput,
                                    { color: colors.text, borderColor: colors.text },
                                ]}
                            />
                            <Text style={styles.helperText}>{error?.message}</Text>
                        </>
                    )}
                />
            </View>

            <View>
                <Text style={[styles.title, { color: colors.text }]}>Cc</Text>
                <Controller
                    name="cc"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                mode="outlined"
                                textColor={colors.text}
                                activeOutlineColor={colors.text}
                                placeholderTextColor={colors.placeholder}
                                value={value}
                                onChangeText={onChange}
                                error={!!error}
                                disabled
                                helperText={error ? error?.message : helperText}
                                style={[
                                    styles.textInput,
                                    { color: colors.text, borderColor: colors.text },
                                ]}
                            />
                            <Text style={styles.helperText}>{error?.message}</Text>
                        </>
                    )}
                />
            </View>

            <View>
                <Text style={[styles.title, { color: colors.text }]}>Subject</Text>
                <Controller
                    name="subject"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                mode="outlined"
                                textColor={colors.text}
                                activeOutlineColor={colors.text}
                                placeholderTextColor={colors.placeholder}
                                value={value}
                                onChangeText={onChange}
                                error={!!error}
                                helperText={error ? error?.message : helperText}
                                style={[
                                    styles.textInput,
                                    { color: colors.text, borderColor: colors.text },
                                ]}
                            />
                            <Text style={styles.helperText}>{error?.message}</Text>
                        </>
                    )}
                />
            </View>


            <View>
                <Text style={[styles.title, { color: colors.text }]}>Message</Text>
                <Controller
                    name="body"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                placeholderTextColor={colors.placeholder}
                                textColor={colors.text}
                                activeOutlineColor={colors.text}
                                mode="outlined"
                                error={!!error}
                                value={value}
                                onChangeText={onChange}
                                multiline={true}
                                numberOfLines={4}
                                style={[
                                    styles.textInput,
                                    { color: colors.text, borderColor: colors.text, height: 360 }, // Set height if necessary
                                ]}
                            />
                            <Text style={styles.helperText}>{error?.message}</Text>
                        </>
                    )}
                />
            </View>


            <Button
                buttonColor={colors.backdrop}
                style={{ marginTop: 20 }}
                mode="contained"
                onPress={onSubmit}
                disabled={isSubmitting}>
                Compose Email
            </Button>

            <Snackbar visible={!!isSubmitting} onDismiss={() => setSubmitting(false)}>
                Submitting...
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    textInput: {
        height: 50,
        marginBottom: 6,
        backgroundColor: 'transparent',
        position: 'relative',
        border: '1px solid white',
    },
    button: {
        marginBottom: 16,
    },
    helperText: {
        color: '#FF6B6B',
        fontSize: 12,
        marginTop: 0,
    },
    salaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    salaryOption: {
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#6b6b6baf',
        borderRadius: 6,
    },
    salaryText: {
        marginTop: 4,
        fontSize: 14,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    tabLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imageButton: {
        marginTop: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
});