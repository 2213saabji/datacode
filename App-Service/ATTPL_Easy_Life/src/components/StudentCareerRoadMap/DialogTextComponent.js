import React from 'react';
import {
  Paragraph,
  Text,
  Text as NativeText,
  useTheme,
  Subheading,
} from 'react-native-paper';


export const TextComponent = ({ isSubheading = false, ...props }) => {
  const theme = useTheme();
  

  if (theme.isV3) {
    return (
      <Text
        variant={isSubheading ? 'bodyLarge' : 'bodyMedium'}
        style={{ color: theme.colors.onSurfaceVariant }}
        {...props}
      />
    );
  } else if (isSubheading) {
    return <Subheading {...props} />;
  }
  return <Paragraph {...props} />;
};
