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



export default function FarmerGuideView() {
    const dispatch = useDispatch();
    const { colors, fonts } = useSelector(selectTheme);

    const { height: screenHeight } = Dimensions.get('window');

    const [seasonType, setSeasonType] = useState([]);
    const [soilType, setSoilType] = useState([]);
    const [cropType, setCropType] = useState([]);

    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedSoil, setSelectedSoil] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('');

    const [conditionData, setConditionData] = useState({});

    const getData = async () => {
        try {
            const seasonResult = await dispatch(fetchFarmerSeasonType());
            const soilResult = await dispatch(fetchFarmerSoilType());

            if (fetchFarmerSeasonType.fulfilled.match(seasonResult) && fetchFarmerSoilType.fulfilled.match(soilResult)) {
                if (seasonResult.payload && soilResult.payload) {
                    const updatedSeasonData = seasonResult.payload.map(job => ({
                        value: job.seasonType,
                        label: job.seasonType,
                    }));

                    const updatedSoilData = soilResult.payload.map(job => ({
                        value: job.soilType,
                        label: job.soilType,
                    }));

                    setSeasonType(updatedSeasonData);
                    setSoilType(updatedSoilData);
                } else {
                    setSeasonType([]);
                    setSoilType([]);
                }
            } else {
                console.log(
                    seasonResult.payload || 'Failed to fetch farming season .',
                );
            }
        } catch (error) {
            console.log(error.message || 'An unexpected error occurred');
        }
    };

    const getCropData = async () => {

        try {
            const data = {
                selectedSoil,
                selectedSeason
            }
            const cropResult = await dispatch(fetchFarmerCropType(data));

            if (fetchFarmerCropType.fulfilled.match(cropResult)) {
                if (cropResult.payload) {
                    const updatedCropData = cropResult.payload.map(crop => ({
                        value: crop,
                        label: crop,
                    }));

                    setCropType(updatedCropData);

                } else {
                    setCropType([]);
                }
            } else {
                console.log(
                    cropResult.payload || 'Failed to fetch Crop data.',
                );
            }
        } catch (error) {
            console.log(error.message || 'An unexpected error occurred');
        }
    };

    const getInfo = async () => {
        try {
            const data = {
                selectedSoil,
                selectedSeason,
                selectedCrop
            }
            const result = await dispatch(fetchFarmerConditionInfo(data));

            if (fetchFarmerConditionInfo.fulfilled.match(result)) {
                if (result.payload) {

                    setConditionData(result.payload);

                } else {
                    setConditionData({});
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

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setSelectedCrop('');
        setConditionData({});
        getCropData()

    }, [selectedSeason, selectedSoil])

    useEffect(() => {
        if (selectedSeason && selectedSoil && selectedCrop) {
            getInfo();
        }
    }, [selectedCrop]);


    const renderForm = (
        <View
            style={{
                flex: 1,
                padding: 20,
                backgroundColor: colors.surface,
                borderRadius: 14,
            }}>
            <View>
                <Text style={[styles.formTitle, { color: colors.text }]}>Cropping Season</Text>

                <SingleDropdownComponent
                    options={seasonType}
                    value={selectedSeason}
                    setValue={setSelectedSeason}
                    containerColor="transparent"
                    inputBorderRadius={6}
                    inputBorderWidth={1}
                />
            </View>

            <View>
                <Text style={[styles.formTitle, { color: colors.text }]}>Soil Type</Text>

                <SingleDropdownComponent
                    options={soilType}
                    value={selectedSoil}
                    setValue={setSelectedSoil}
                    containerColor="transparent"
                    inputBorderRadius={6}
                    inputBorderWidth={1}
                />
            </View>

            {cropType.length > 0 && <View>
                <Text style={[styles.formTitle, { color: colors.text }]}>Crop Type</Text>

                <SingleDropdownComponent
                    options={cropType}
                    value={selectedCrop}
                    setValue={setSelectedCrop}
                    containerColor="transparent"
                    inputBorderRadius={6}
                    inputBorderWidth={1}
                />
            </View>}
        </View>
    )

    const renderContent1 = (
        <Card
            containerStyle={[
                styles.card,
                { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}>
            <Text style={[styles.title, { color: colors.text }]}>
                GENERAL INFORMATION
            </Text>

            <View style={styles.section}>
                <Text style={[styles.subtitle, { color: colors.text }]}>Soil Type:</Text>
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>
                    {conditionData?.soilType}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.subtitle, { color: colors.text }]}>Season Type:</Text>
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>
                    {conditionData?.seasonType}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.subtitle, { color: colors.text }]}>
                    Crop Type:
                </Text>
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>
                    {conditionData?.cropType}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.subtitle, { color: colors.text }]}>
                    Moisture Level:
                </Text>
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>
                    {conditionData?.moistureLevel}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.subtitle, { color: colors.text }]}>
                    Climate:
                </Text>
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>
                    {conditionData?.climate}
                </Text>
            </View>
        </Card>
    );

    const renderContent2 = (
        <Card
            containerStyle={[
                styles.card,
                { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>SOIL TEST</Text>
            {conditionData?.SoilTests?.map((soilTest, index) => {
                const nutrients = JSON.parse(soilTest.nutrients.replace(/'/g, '"'));
                const isLastItem = index === conditionData.SoilTests.length - 1;

                return (
                    <View key={soilTest.testId}>
                        <View style={styles.section}>
                            <Text style={[styles.subtitle, { color: colors.text }]}>pH Level:</Text>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
                                {soilTest.pHLevel}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.subtitle, { color: colors.text }]}>Nutrients - K, N, P:</Text>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
                                {`${nutrients.K}, ${nutrients.N}, ${nutrients.P}`}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.subtitle, { color: colors.text }]}>Organic Matter:</Text>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
                                {soilTest.organicMatter}
                            </Text>
                        </View>

                        {!isLastItem && (
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.text,
                                    marginVertical: 5,
                                }}
                            />
                        )}
                    </View>
                );
            })}
        </Card>
    );

    const renderContent3 = (
        <Card
            containerStyle={[
                styles.card,
                { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>SOIL PREPARATION</Text>
            {conditionData?.SoilPreparations?.map((val, index) => {
                const isLastItem = index === conditionData.SoilPreparations.length - 1;

                return (
                    <View key={val.preparationId}>
                        <View style={styles.section}>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
                                {val.preparationType}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.subtitle, { color: colors.text }]}>
                                {val.details}
                            </Text>
                        </View>

                        {!isLastItem && (
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.text,
                                    marginVertical: 5,
                                }}
                            />
                        )}
                    </View>
                );
            })}
        </Card>
    );

    const renderContent4 = (
        <Card
            containerStyle={[
                styles.card,
                { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>SOWING METHODS</Text>
            {conditionData?.SowingMethods?.map((val, index) => {
                const isLastItem = index === conditionData.SowingMethods.length - 1;

                return (
                    <View key={index}>
                        <View style={styles.section}>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
                                {val.sowingType}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.subtitle, { color: colors.text }]}>
                                {val.description}
                            </Text>
                        </View>

                        {!isLastItem && (
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.text,
                                    marginVertical: 5,
                                }}
                            />
                        )}
                    </View>
                );
            })}
        </Card>
    );

    const renderContent5 = (
        <Card
            containerStyle={[
                styles.card,
                { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>IRRIGATION METHODS</Text>
            {conditionData?.IrrigationMethods?.map((val, index) => {
                const isLastItem = index === conditionData.IrrigationMethods.length - 1;

                return (
                    <View key={index}>
                        <View style={styles.section}>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
                                {val.irrigationType}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.subtitle, { color: colors.text }]}>
                                {val.description}
                            </Text>
                        </View>

                        {!isLastItem && (
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.text,
                                    marginVertical: 5,
                                }}
                            />
                        )}
                    </View>
                );
            })}
        </Card>
    );

    const renderContent6 = (
        <Card
            containerStyle={[
                styles.card,
                { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>FERTILIZATION AND PEST MANAGEMENT</Text>
            {conditionData?.FertilizationPestMgmts?.map((val, index) => {
                const isLastItem = index === conditionData.FertilizationPestMgmts.length - 1;

                return (
                    <View key={index}>
                        <View style={styles.section}>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
                                {val.type}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.subtitle, { color: colors.text }]}>
                                {val.description}
                            </Text>
                        </View>

                        {!isLastItem && (
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.text,
                                    marginVertical: 5,
                                }}
                            />
                        )}
                    </View>
                );
            })}
        </Card>
    );

    const renderContent7 = (
        <Card
            containerStyle={[
                styles.card,
                { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>HARVESTING METHODS</Text>
            {conditionData?.HarvestingMethods?.map((val, index) => {
                const isLastItem = index === conditionData.HarvestingMethods.length - 1;

                return (
                    <View key={index}>
                        <View style={styles.section}>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
                                {val.harvestingType}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.subtitle, { color: colors.text }]}>
                                {val.description}
                            </Text>
                        </View>

                        {!isLastItem && (
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.text,
                                    marginVertical: 5,
                                }}
                            />
                        )}
                    </View>
                );
            })}
        </Card>
    );
    const renderContent8 = (
        <Card
            containerStyle={[
                styles.card,
                { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>POST HARVESTING HANDLING</Text>
            {conditionData?.PostHarvestHandlings?.map((val, index) => {
                const isLastItem = index === conditionData.PostHarvestHandlings.length - 1;

                return (
                    <View key={index}>
                        <View style={styles.section}>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
                                {val.handlingType}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.subtitle, { color: colors.text }]}>
                                {val.description}
                            </Text>
                        </View>

                        {!isLastItem && (
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.text,
                                    marginVertical: 5,
                                }}
                            />
                        )}
                    </View>
                );
            })}
        </Card>
    );
    const renderContent9 = (
        <Card
            containerStyle={[
                styles.card,
                { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>MARKETING OPTIONS</Text>
            {conditionData?.MarketingOptions?.map((val, index) => {
                const isLastItem = index === conditionData.MarketingOptions.length - 1;

                return (
                    <View key={index}>
                        <View style={styles.section}>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
                                {val.marketType}
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.subtitle, { color: colors.text }]}>
                                {val.description}
                            </Text>
                        </View>

                        {!isLastItem && (
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.text,
                                    marginVertical: 5,
                                }}
                            />
                        )}
                    </View>
                );
            })}
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
                            <Text style={[styles.title, { color: colors.text, marginBottom: 20, textAlign: 'center' }]}>FARMER GUIDE</Text>
                            {renderForm}
                            {conditionData?.conditionId && renderContent1}
                            {conditionData?.SoilTests?.length > 0 && renderContent2}
                            {conditionData?.SoilPreparations?.length > 0 && renderContent3}
                            {conditionData?.SowingMethods?.length > 0 && renderContent4}
                            {conditionData?.IrrigationMethods?.length > 0 && renderContent5}
                            {conditionData?.FertilizationPestMgmts?.length > 0 && renderContent6}
                            {conditionData?.HarvestingMethods?.length > 0 && renderContent7}
                            {conditionData?.PostHarvestHandlings?.length > 0 && renderContent8}
                            {conditionData?.MarketingOptions?.length > 0 && renderContent9}
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
        marginBottom: 8,
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
