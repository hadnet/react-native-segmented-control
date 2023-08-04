import type {TextStyle, ViewStyle} from 'react-native';

type SetPos<T extends boolean | undefined> = T extends false | undefined
  ? ViewStyle['justifyContent']
  : ViewStyle['alignItems'];

export type SegmentProps<T extends boolean | undefined> = {
  title: string;
  icon?: JSX.Element;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  activeIconColor?: TextStyle['color'];
  inactiveIconColor?: TextStyle['color'];
  activeTitleStyle?: TextStyle;
  inactiveTitleStyle?: TextStyle;
  position?: SetPos<T>;
  space?: number;
  padding?: number;
  column?: T;
};

export type SegmentedControlProps = {
  /**
   * The Segments Text or Compoenent Array
   */
  segments: (string | JSX.Element)[];
  /**
   * The Current Active Segment Index
   */
  currentIndex: number;
  /**
   * A callback onPress of a Segment
   */
  onChange: (index: number) => void;
  /**
   * An array of Badge Values corresponding to the Segment
   */
  badgeValues?: Array<number | null | ''>;
  /**
   * Is right-to-left mode.
   */
  isRTL?: boolean;
  /**
  /* Activate haptics feedback 
  */
  haptics?: boolean;
  /**
   * The container margin for the segmented control
   * Used to calculate the width of Segmented Control
   */
  containerMargin?: number;
  /**
   * Active Segment Text Style
   */
  activeTextStyle?: TextStyle;
  /**
   * InActive Segment Text Style
   */
  inactiveTextStyle?: TextStyle;
  /**
   * Segment Container Styles
   */
  segmentedControlWrapper?: ViewStyle;
  /**
   * Pressable Container Styles
   */
  pressableWrapper?: ViewStyle;
  /**
   * The moving Tile Container Styles
   */
  tileStyle?: Pick<
    ViewStyle,
    | 'margin'
    | 'marginHorizontal'
    | 'marginVertical'
    | 'paddingVertical'
    | 'borderRadius'
    | 'backgroundColor'
  >;
  /**
   * Active Badge Styles
   */
  activeBadgeStyle?: ViewStyle;
  /**
   * Inactive Badge Styles
   */
  inactiveBadgeStyle?: ViewStyle;
  /**
   * Badge Text Styles
   */
  badgeTextStyle?: TextStyle;
};
