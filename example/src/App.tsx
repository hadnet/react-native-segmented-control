import * as React from 'react';

import {StyleSheet, View} from 'react-native';
import SegmentedControl, {
  Segment,
} from '@hadnet/react-native-segmented-control';

export default function App() {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      <SegmentedControl
        haptics
        containerMargin={16}
        segmentedControlWrapper={{
          backgroundColor: '#1e1e1e',
          width: 300,
          borderRadius: 12,
        }}
        tileStyle={{
          margin: 4,
          backgroundColor: 'black',
          // paddingVertical: 18
          // borderRadius: 12,
        }}
        segments={[
          <Segment
            title="GPT-3.5"
            inactiveTitleStyle={{color: '#9a999f'}}
            activeTitleStyle={{color: 'white'}}
            activeIconColor={'limegreen'}
            // icon={<MaterialCommunityIcons name="lightning-bolt" size={22} />}
          />,
          <Segment
            title="GPT-4"
            inactiveTitleStyle={{color: '#9a999f'}}
            activeTitleStyle={{color: 'white'}}
            activeIconColor={'#9978f2'}
            // icon={<MaterialIcons name="auto-awesome" size={18} />}
          />,
        ]}
        // badgeValues={[null, 2]}
        onChange={(index) => setTabIndex(index)}
        currentIndex={tabIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
