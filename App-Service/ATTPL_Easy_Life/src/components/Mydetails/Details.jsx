import React from 'react';
import {Text, View} from 'react-native';

import {StyleSheet} from 'react-native';
import DetailRow from './DetailRow';
const Details = () => {
  return (
    <View style={detailsContainerStyles.detailsContainer}>
      <View style={detailsContainerStyles.detailsHeader}>
        <Text style={detailsContainerStyles.detailsHeaderText}>
          Election Details
        </Text>
        <Text style={detailsContainerStyles.detailsHeaderText}>
          Description
        </Text>
      </View>
      <View style={detailsContainerStyles.detailsBody}>
        <DetailRow
          title="Election Titles:"
          description="2024 Presidential Election"
        />
        <DetailRow title="Election Type:" description="Presidential" />
        <DetailRow title="Election Date:" description="2024-03-15" />
        <DetailRow title="Start Time:" description="10:00:00" />
        <DetailRow title="End Time:" description="17:00:00" />
        <DetailRow title="Election Method:" description="Online & Offline" />
        <DetailRow
          title="Election Description:"
          description="The election for the President of the country."
        />
        <DetailRow
          title="Election Description:"
          description="The election for the President of the country."
        />
      </View>
    </View>
  );
};

export default Details;

const detailsContainerStyles = StyleSheet.create({
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    paddingTop: 20,
    width: 'auto',
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(244, 246, 248, 1)',
    height: 50,
  },
  detailsHeaderText: {
    textAlign: 'center',
    fontSize: 8,
    lineHeight: 13,
    fontFamily: 'PublicSans-Regular',
    fontWeight: '600',
    color: 'rgba(99, 115, 129, 1)',
    // marginRight: 'auto',
  },
  detailsBody: {
    borderRadius: 10,
  },
});
