// eslint-disable-next-line import/no-extraneous-dependencies
import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  try {
    await OneSignal.init({
      appId: '17d52215-5040-4ae0-b00c-d2ebb6b96d1e',
      allowLocalhostAsSecureOrigin: true,
    });
    OneSignal.Slidedown.promptPush();
    console.log('Component mounted true');
  } catch (error) {
    console.log('error by signaal');
    console.error('Error initializing OneSignal:', error);
  }
}
