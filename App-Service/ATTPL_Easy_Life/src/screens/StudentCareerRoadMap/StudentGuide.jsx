import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    SafeAreaView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Chip } from 'react-native-elements';
import { selectTheme } from '../../redux/selectors';
import SingleDropdownComponent from '../../components/ReusableComp/SingleDropDown';
import { fetchFarmerSeasonType, fetchFarmerSoilType, fetchFarmerCropType, fetchFarmerConditionInfo } from '../../redux/slices/CRM/FarmerCareerRoad/FarmerCareerRoadSlice';
import { fetchStudentCourseCategory, fetchStudentSubCourseCategory, fetchStudentCourseInfo, fetchCollegeByState } from '../../redux/slices/CRM/StudentCareerRoad/IntitutionAppointmentSlice';

import { indianStates } from '../../_mock/indian_states';

export default function StudentGuideView() {
    const dispatch = useDispatch();
    const { colors, fonts } = useSelector(selectTheme);

    const { height: screenHeight } = Dimensions.get('window');

    const [course, setCourse] = useState([]);

    const [subCourse, setSubCourse] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState('');

    const [selectedSubCourse, setSelectedSubCourse] = useState('');

    const [subCourseId, setSubCourseId] = useState(null);

    const [selectedState, setSelectedState] = useState('');

    const [cousreInfo, setCourseInfo] = useState({});

    const [collegeInfo, setCollegeInfo] = useState({});

    const getData = async () => {
        try {
            const result = await dispatch(fetchStudentCourseCategory());

            if (fetchStudentCourseCategory.fulfilled.match(result)) {
                if (result.payload) {
                    const updatedData = result.payload.map(job => ({
                        value: job.jobTypeName,
                        label: job.jobTypeName,
                    }));

                    setCourse(updatedData);

                } else {
                    setCourse([]);

                }
            } else {
                console.log(
                    result.payload || 'Failed to fetch Student Course List .',
                );
            }
        } catch (error) {
            console.log(error.message || 'An unexpected error occurred');
        }
    };

    const getSubCourseData = async () => {

        try {
            const result = await dispatch(fetchStudentSubCourseCategory(selectedCourse));

            if (fetchStudentSubCourseCategory.fulfilled.match(result)) {
                if (result.payload) {
                    const updatedData = result.payload.map(job => ({
                        value: job.jobName,
                        label: job.jobName,
                    }));

                    setSubCourse(updatedData);

                } else {
                    setSubCourse([]);
                }
            } else {
                console.log(
                    result.payload || 'Failed to fetch Sub Course List.',
                );
            }
        } catch (error) {
            console.log(error.message || 'An unexpected error occurred');
        }
    };

    const getInfo = async () => {
        try {



            const result = await dispatch(fetchStudentCourseInfo(selectedSubCourse));

            if (fetchStudentCourseInfo.fulfilled.match(result)) {
                if (result.payload) {

                    setCourseInfo(result?.payload);
                    setSubCourseId(result?.payload?.jobId);

                } else {
                    setCourseInfo({});
                }
            } else {
                console.log(
                    result.payload || 'Failed to fetch farming condition data.',
                );
            }
        } catch (error) {
            console.log(error.message || 'An unexpected error occurred');
        }

    }

    const getCollege = async () => {
        try {
            const data = {
                selectedState,
                subCourseId
            }

            const result = await dispatch(fetchCollegeByState(data));

            if (fetchCollegeByState.fulfilled.match(result)) {
                if (result.payload) {
                    setCollegeInfo(result.payload);
                } else {
                    setCollegeInfo({});
                }
            } else {
                setCollegeInfo({
                    message: 'noData'
                })
                console.log(
                    result.payload || 'Failed to fetch farming condition data.',
                );
            }
        } catch (error) {
            console.log('An unexpected error occurred');
        }

    }



    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setSelectedSubCourse('');
        setCourseInfo({});
        setCollegeInfo({});
        setSelectedState('');
        getSubCourseData()

    }, [selectedCourse])

    useEffect(() => {
        if (selectedCourse && selectedSubCourse) {
            getInfo();
            setCollegeInfo({});
            setSelectedState('');
        }
    }, [selectedSubCourse]);

    useEffect(() => {
        if (selectedState && subCourseId) {
            getCollege();
        }
    }, [selectedState]);



    const renderForm = (
        <View
            style={{
                flex: 1,
                padding: 20,
                backgroundColor: colors.surface,
                borderRadius: 14,
            }}>
            <View>
                <Text style={[styles.formTitle, { color: colors.text }]}>Field of Study / Discipline</Text>

                <SingleDropdownComponent
                    options={course}
                    value={selectedCourse}
                    setValue={setSelectedCourse}
                    containerColor="transparent"
                    inputBorderRadius={6}
                    inputBorderWidth={1}
                />
            </View>

            {subCourse.length > 0 && <View>
                <Text style={[styles.formTitle, { color: colors.text }]}>Sub Discipline</Text>

                <SingleDropdownComponent
                    options={subCourse}
                    value={selectedSubCourse}
                    setValue={setSelectedSubCourse}
                    containerColor="transparent"
                    inputBorderRadius={6}
                    inputBorderWidth={1}
                />
            </View>}
        </View>
    )

    const renderForm2 = (
        <View
            style={{
                flex: 1,
                padding: 20,
                backgroundColor: colors.surface,
                borderRadius: 14,
            }}>
            <Text style={[styles.title, { color: colors.text }]}>
                Search Colleges By State
            </Text>
            <View>
                <Text style={[styles.formTitle, { color: colors.text }]}>Select State</Text>

                <SingleDropdownComponent
                    options={indianStates}
                    value={selectedState}
                    setValue={setSelectedState}
                    containerColor="transparent"
                    inputBorderRadius={6}
                    inputBorderWidth={1}
                />
            </View>

        </View>
    )

    const renderContent1 = (
        <Card
            containerStyle={[
                styles.card,
                { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}>
            <Text style={[styles.title, { color: colors.text }]}>
                {cousreInfo?.jobName?.toUpperCase()}
            </Text>

            <View style={styles.section}>
                <Text style={[styles.subtitle, { color: colors.text }]}>
                    Course
                </Text>
                <View>
                    {cousreInfo?.Courses?.map((req, index) => (
                        <View key={index} style={styles.listItemContainer}>
                            <Text style={[styles.bullet, { color: colors.text }]}>•</Text>
                            <Text style={[styles.listItem, { color: colors.text }]}>{req.courseName}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.subtitle, { color: colors.text }]}>
                    Subjects
                </Text>
                <View>
                    {cousreInfo?.JobSubjects?.map((req, index) => (
                        <View key={index} style={styles.listItemContainer}>
                            <Text style={[styles.bullet, { color: colors.text }]}>•</Text>
                            <Text style={[styles.listItem, { color: colors.text }]}>{req.Subject?.subjectName}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.subtitle, { color: colors.text }]}>
                    Entrance Exam
                </Text>
                <View>
                    {cousreInfo?.JobExams?.map((req, index) => (
                        <View key={index} style={styles.listItemContainer}>
                            <Text style={[styles.bullet, { color: colors.text }]}>•</Text>
                            <Text style={[styles.listItem, { color: colors.text }]}>{req.EntranceExam?.examName}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Card>
    );

    const renderContent2 = (
        <Card
            containerStyle={[
                styles.card,
                { backgroundColor: colors.surface, shadowColor: colors.shadow, minHeight: 180 },
            ]}>
            <Text style={[styles.title, { color: colors.text }]}>
                COLLEGE AVAILABLE
            </Text>

            {collegeInfo?.message ?
                <View style={styles.section}>
                    <Text style={[styles.listItem, { color: colors.text, textAlign: 'center', marginTop: 20 }]}>No College Available in {selectedState}</Text>
                </View>
                :
                <View style={styles.section}>
                    <View>
                        {collegeInfo?.colleges?.map((req, index) => (
                            <View key={index} style={styles.listItemContainer}>
                                <Text style={[styles.bullet, { color: colors.text }]}>•</Text>
                                <Text style={[styles.listItem, { color: colors.text }]}>{req.collegeName}</Text>
                            </View>
                        ))}
                    </View>
                </View>}
        </Card>
    );




    return (
        <>
            <SafeAreaView
                style={[styles.safeArea, { backgroundColor: colors.background }]}>
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollViewContent,
                        { minHeight: screenHeight },
                    ]}>
                    <View style={styles.grid}>
                        <View style={styles.column}>
                            <Text style={[styles.title, { color: colors.text, marginBottom: 20, textAlign: 'center' }]}>STUDENT CAREER GUIDE</Text>
                            {renderForm}
                            {cousreInfo?.jobName && renderContent1}
                            {cousreInfo?.jobName && renderForm2}
                            {collegeInfo?.colleges?.length > 0 || collegeInfo?.message ? renderContent2 : null}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        padding: 2,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    formTitle: {
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
    card: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 12,
    },
    cardImage: {
        height: 220, // Adjust the height as per your design
        width: '100%',
        borderRadius: 14,
        marginTop: 14,
        objectFit: 'fill',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    section: {
        marginTop: 16,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 4,
    },
    bullet: {
        fontSize: 20,
        marginRight: 5,
    },
    listItem: {
        fontSize: 16,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 4,
    },
    overviewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    overviewText: {
        marginLeft: 8,
    },
    overviewLabel: {
        fontSize: 14,
        color: '#888',
    },
    overviewValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    companyLocation: {
        fontSize: 16,
        marginBottom: 14,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    column: {
        flex: 1,
        minWidth: '48%',
        marginHorizontal: '1%',
    },
});
