import React, {Suspense, useState, useEffect} from 'react';
import LotteiLoadingScreen from '../screens/LoadingScreen/Loading';
import screenComponents from './screenComponentsMapping';

const LazyScreen = ({name, navigation, ...props}) => {
  const [showLoading, setShowLoading] = useState(true);

  let Component = screenComponents[name];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<LotteiLoadingScreen />}>
      {showLoading ? (
        <LotteiLoadingScreen />
      ) : (
        <Component {...props} navigation={navigation} />
      )}
    </Suspense>
  );
};

export default LazyScreen;
