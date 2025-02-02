import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {selectTheme} from '../../redux/selectors';

const TemplateItem = ({template}) => {
  const {colors} = useSelector(selectTheme);

  const renderDetailItem = (label, value) => (
    <View style={styles.templateDetail}>
      <Text style={[styles.detailLabel, {color: colors.placeholder}]}>
        {label}
      </Text>
      <Text style={{color: colors.text}}>{value}</Text>
    </View>
  );

  return (
    <View
      style={[
        styles.templateItem,
        {backgroundColor: colors.surface, borderColor: colors.border},
      ]}>
      <View style={styles.templateHeader}>
        <View style={styles.templateTitleContainer}>
          <Image
            source={{
              uri: template.imageUrl || 'https://via.placeholder.com/40',
            }}
            style={styles.templateImage}
          />
          <Text style={[styles.templateName, {color: colors.text}]}>
            {template.name}
          </Text>
        </View>
        <TouchableOpacity>
          <Icon name="more-vertical" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      {renderDetailItem('Template Type', template.type)}
      {renderDetailItem('Template Size', template.size)}
      {renderDetailItem('Created At', template.createdAt)}
      {renderDetailItem('Updated At', template.updatedAt)}
      <View style={styles.templateDetail}>
        <Text style={[styles.detailLabel, {color: colors.placeholder}]}>
          Status
        </Text>
        <View
          style={[
            styles.statusIndicator,
            {
              backgroundColor:
                template.status === 'active' ? colors.accent : colors.primary,
            },
          ]}
        />
      </View>
    </View>
  );
};

const TemplatesListScreen = () => {
  const {colors} = useSelector(selectTheme);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['All', 'Published', 'Draft'];

  const dummyTemplates = [
    {
      id: 1,
      name: 'Political Party Template',
      type: 'Political',
      size: '10.04kb',
      createdAt: '2023-08-15',
      updatedAt: '2023-08-20',
      status: 'active',
    },
    {
      id: 2,
      name: 'Corporate Website Template',
      type: 'Business',
      size: '15.2kb',
      createdAt: '2023-07-10',
      updatedAt: '2023-08-18',
      status: 'draft',
    },
    {
      id: 3,
      name: 'E-commerce Product Page',
      type: 'E-commerce',
      size: '8.7kb',
      createdAt: '2023-08-01',
      updatedAt: '2023-08-22',
      status: 'published',
    },
  ];

  const filteredTemplates = dummyTemplates.filter(
    template =>
      (activeTab === 'All' ||
        template.status.toLowerCase() === activeTab.toLowerCase()) &&
      template.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.header, {backgroundColor: colors.surface}]}>
        <Text style={[styles.title, {color: colors.text}]}>TEMPLATES LIST</Text>
        <Text style={[styles.subtitle, {color: colors.placeholder}]}>
          Dashboard • All Templates • List
        </Text>
        <View style={styles.tabs}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
                activeTab === tab && {backgroundColor: colors.primary},
              ]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  activeTab === tab ? styles.activeTabText : styles.tabText,
                  {color: colors.text},
                ]}>
                {tab}
              </Text>
              <View style={[styles.badge, {backgroundColor: colors.surface}]}>
                <Text style={[styles.badgeText, {color: colors.text}]}>
                  {
                    filteredTemplates.filter(
                      t =>
                        tab === 'All' ||
                        t.status.toLowerCase() === tab.toLowerCase(),
                    ).length
                  }
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={[
            styles.searchInput,
            {backgroundColor: colors.surface, color: colors.text},
          ]}
          placeholder="Search Templates"
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView style={styles.templateList}>
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          Templates List
        </Text>
        {filteredTemplates.map(template => (
          <TemplateItem key={template.id} template={template} />
        ))}
      </ScrollView>
      <View style={[styles.footer, {backgroundColor: colors.surface}]}>
        <Text style={{color: colors.text}}>Rows per page: 10</Text>
        <Text style={{color: colors.text}}>
          1-{filteredTemplates.length} of {filteredTemplates.length}
        </Text>
        <View style={styles.pagination}>
          <Icon name="chevron-left" size={24} color={colors.text} />
          <Icon name="chevron-right" size={24} color={colors.text} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    fontWeight: 'bold',
  },
  badge: {
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
  },
  searchInput: {
    borderRadius: 8,
    padding: 8,
  },
  templateList: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  templateItem: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  templateTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  templateImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  templateName: {
    fontWeight: 'bold',
  },
  templateDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: '500',
  },
  statusIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  pagination: {
    flexDirection: 'row',
  },
});

export default TemplatesListScreen;
