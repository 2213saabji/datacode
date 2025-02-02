import { ChatApp } from 'mirrorfly-uikit/dist';
import 'mirrorfly-uikit/dist/assets/scss/bundle.css';

import { useAuthContext } from 'src/auth/hooks';
import { ATTPL_CHAT_LICENCE_KEY_ID } from 'src/config-global';

import './mirror-fly-style.css';

export default function ChatView() {
  const { user } = useAuthContext();
  return (
    <>
      {user && (
        <ChatApp
          width="100%" // custom width for parent container
          height="100%"
          licenseKey={ATTPL_CHAT_LICENCE_KEY_ID}
          userIdentifier={user?.phone}
          enableDeviceSize
          isCallEnabled={false}
        />
      )}
    </>
  );
}
