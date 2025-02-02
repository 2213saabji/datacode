import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';

const Content = ({colors, fonts}) => {
  const handleInvite = async platform => {
    let shareOptions = {
      title: 'Share via',
      message: 'Check out this cool app!', // Example message
      url: 'https://yourapp.com/invite', // Example share URL
    };

    switch (platform) {
      case 'facebook':
        shareOptions.social = Share.Social.FACEBOOK;
        break;
      case 'facebookstories':
        shareOptions.social = Share.Social.FACEBOOK_STORIES;
        break;
      case 'twitter':
        shareOptions.social = Share.Social.TWITTER;
        break;
      case 'instagram':
        shareOptions.social = Share.Social.INSTAGRAM;
        break;
      case 'instagramstories':
        shareOptions.social = Share.Social.INSTAGRAM_STORIES;
        break;
      case 'whatsapp':
        shareOptions.social = Share.Social.WHATSAPP;
        shareOptions.whatsAppNumber = '9199999999'; // Example phone number
        break;
      case 'whatsappbusiness':
        shareOptions.social = Share.Social.WHATSAPPBUSINESS;
        break;
      case 'telegram':
        shareOptions.social = Share.Social.TELEGRAM;
        break;
      case 'snapchat':
        shareOptions.social = Share.Social.SNAPCHAT;
        break;
      case 'discord':
        shareOptions.social = Share.Social.DISCORD;
        break;
      case 'email':
        shareOptions.social = Share.Social.EMAIL;
        break;
      case 'googleplus':
        shareOptions.social = Share.Social.GOOGLEPLUS;
        break;
      case 'linkedin':
        shareOptions.social = Share.Social.LINKEDIN;
        break;
      case 'messenger':
        shareOptions.social = Share.Social.MESSENGER;
        break;
      case 'pagesmanager':
        shareOptions.social = Share.Social.PAGESMANAGER;
        break;
      case 'pinterest':
        shareOptions.social = Share.Social.PINTEREST;
        break;
      case 'sms':
        shareOptions.social = Share.Social.SMS;
        break;
      case 'viber':
        shareOptions.social = Share.Social.VIBER;
        break;
      default:
        return; // Do nothing if platform is not recognized
    }

    try {
      console.log('Sharing options:', shareOptions); // Log shareOptions for debugging
      await Share.shareSingle(shareOptions);
    } catch (error) {
      console.error('Failed to share:', error); // Log any error that occurs during sharing
    }
  };

  const handleShareLink = async () => {
    const url = 'https://yourapp.com/invite';
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open link:', error);
    }
  };

  const shareItems = [
    {
      platform: 'facebook',
      icon: 'logo-facebook',
      color: '#3b5998',
      label: 'Invite via Facebook',
      library: Ionicons,
    },
    {
      platform: 'facebookstories',
      icon: 'logo-facebook',
      color: '#3b5998',
      label: 'Invite via Facebook Stories',
      library: Ionicons,
    },
    {
      platform: 'twitter',
      icon: 'logo-twitter',
      color: '#1da1f2',
      label: 'Invite via Twitter',
      library: Ionicons,
    },
    {
      platform: 'instagram',
      icon: 'logo-instagram',
      color: '#c32aa3',
      label: 'Invite via Instagram',
      library: Ionicons,
    },
    {
      platform: 'instagramstories',
      icon: 'logo-instagram',
      color: '#c32aa3',
      label: 'Invite via Instagram Stories',
      library: Ionicons,
    },
    {
      platform: 'whatsapp',
      icon: 'logo-whatsapp',
      color: '#25D366',
      label: 'Invite via WhatsApp',
      library: Ionicons,
    },
    {
      platform: 'whatsappbusiness',
      icon: 'logo-whatsapp',
      color: '#25D366',
      label: 'Invite via WhatsApp Business',
      library: Ionicons,
    },
    {
      platform: 'telegram',
      icon: 'paper-plane',
      color: '#0088cc',
      label: 'Invite via Telegram',
      library: Ionicons,
    },
    {
      platform: 'snapchat',
      icon: 'logo-snapchat',
      color: '#fffc00',
      label: 'Invite via Snapchat',
      library: Ionicons,
    },
    {
      platform: 'discord',
      icon: 'logo-discord',
      color: '#7289da',
      label: 'Invite via Discord',
      library: Ionicons,
    },
    {
      platform: 'email',
      icon: 'mail',
      color: '#d44638',
      label: 'Invite via Email',
      library: Ionicons,
    },
    {
      platform: 'googleplus',
      icon: 'google-plus',
      color: '#db4437',
      label: 'Invite via Google Plus',
      library: MaterialCommunityIcons,
    },
    {
      platform: 'linkedin',
      icon: 'logo-linkedin',
      color: '#0077b5',
      label: 'Invite via LinkedIn',
      library: Ionicons,
    },
    {
      platform: 'messenger',
      icon: 'chatbubbles',
      color: '#0084ff',
      label: 'Invite via Messenger',
      library: Ionicons,
    },
    {
      platform: 'pagesmanager',
      icon: 'briefcase',
      color: '#3b5998',
      label: 'Invite via Pages Manager',
      library: Ionicons,
    },
    {
      platform: 'pinterest',
      icon: 'logo-pinterest',
      color: '#bd081c',
      label: 'Invite via Pinterest',
      library: Ionicons,
    },
    {
      platform: 'sms',
      icon: 'chatbubbles',
      color: '#34b7f1',
      label: 'Invite via SMS',
      library: Ionicons,
    },
  ];

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.text, ...fonts.titleMedium}]}>
        Invite Friends to Use Our App
      </Text>
      {shareItems.map(item => (
        <TouchableOpacity
          key={item.platform}
          style={styles.inviteItem}
          onPress={() => handleInvite(item.platform)}>
          <item.library name={item.icon} size={24} color={item.color} />
          <Text
            style={[
              styles.inviteText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.inviteLink} onPress={handleShareLink}>
        <Text
          style={[
            styles.inviteLinkText,
            {color: colors.primary, ...fonts.bodyMedium},
          ]}>
          Or share the link: https://yourapp.com/invite
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inviteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inviteText: {
    fontSize: 18,
    marginLeft: 16,
  },
  inviteLinkText: {
    fontSize: 16,
  },
});

export default Content;
