import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package '@hadnet/react-native-segmented-control' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type ReactNativeSegmentedControlProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'ReactNativeSegmentedControlView';

export const ReactNativeSegmentedControlView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<ReactNativeSegmentedControlProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
