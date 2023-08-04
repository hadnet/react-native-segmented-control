import React, {useCallback, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {trigger} from 'react-native-haptic-feedback';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import type {SegmentedControlProps, SegmentProps} from './types';

const defaultShadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: 0.025,
  shadowRadius: 1,
  elevation: 1,
};

const DEFAULT_SPRING_CONFIG: Parameters<typeof withSpring>[1] = {
  stiffness: 200,
  damping: 150,
  mass: 1,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

const SegmentedControl = ({
  segments,
  currentIndex,
  onChange,
  haptics = false,
  badgeValues = [],
  isRTL = false,
  containerMargin = 0,
  activeTextStyle,
  inactiveTextStyle,
  segmentedControlWrapper,
  pressableWrapper,
  tileStyle,
  activeBadgeStyle,
  inactiveBadgeStyle,
  badgeTextStyle,
}: SegmentedControlProps) => {
  const width = +(
    segmentedControlWrapper?.width ??
    widthPercentageToDP('100%') - containerMargin * 2
  );
  const translateValue = width / segments.length;
  const tabTranslateValue = useSharedValue(0);

  const memoizedTabPressCallback = useCallback(
    (index: number) => {
      haptics &&
        trigger('impactLight', {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: false,
        });
      onChange(index);
    },
    [onChange, haptics]
  );

  useEffect(() => {
    // If phone is set to RTL, make sure the animation does the correct transition.
    const transitionMultiplier = isRTL ? -1 : 1;
    tabTranslateValue.value = withSpring(
      currentIndex * (translateValue * transitionMultiplier),
      DEFAULT_SPRING_CONFIG
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const tabTranslateAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: tabTranslateValue.value}],
    };
  });

  const finalisedActiveTextStyle: TextStyle = {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
    ...activeTextStyle,
  };

  const finalisedInActiveTextStyle: TextStyle = {
    fontSize: 15,
    textAlign: 'center',
    color: '#4b5563',
    ...inactiveTextStyle,
  };

  const finalisedActiveBadgeStyle: ViewStyle = {
    backgroundColor: '#FF3B30',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    ...activeBadgeStyle,
  };

  const finalisedInActiveBadgeStyle: ViewStyle = {
    backgroundColor: '#6b7280',
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    ...inactiveBadgeStyle,
  };

  const finalisedBadgeTextStyle: TextStyle = {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    color: '#FFFFFF',
    ...badgeTextStyle,
  };

  const {
    margin,
    marginHorizontal,
    marginVertical,
    paddingVertical = 14,
  } = tileStyle || {
    margin: 2,
    marginHorizontal: 2,
    marginVertical: 2,
    paddingVertical: 14,
  };

  return (
    <Animated.View
      style={[styles.defaultSegmentedControlWrapper, segmentedControlWrapper]}
    >
      <Animated.View
        style={[
          styles.movingSegmentStyle,
          defaultShadowStyle,
          tileStyle,
          StyleSheet.absoluteFill,
          {
            width:
              width / segments.length - +(margin || marginHorizontal || 2) * 2,
            marginHorizontal: marginHorizontal ?? margin,
            marginVertical: marginVertical ?? margin,
          },
          tabTranslateAnimatedStyles,
        ]}
      />
      {segments.map((segment, index) => {
        const active =
          currentIndex === index
            ? finalisedActiveTextStyle
            : finalisedInActiveTextStyle;
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => memoizedTabPressCallback(index)}
            key={index}
            style={[
              styles.touchableContainer,
              pressableWrapper,
              {paddingVertical},
            ]}
          >
            {typeof segment === 'string' ? (
              <View style={styles.textWrapper}>
                <Text style={active}>{segment}</Text>
                {badgeValues[index] && (
                  <View
                    style={[
                      styles.defaultBadgeContainerStyle,
                      currentIndex === index
                        ? finalisedActiveBadgeStyle
                        : finalisedInActiveBadgeStyle,
                    ]}
                  >
                    <Text style={finalisedBadgeTextStyle}>
                      {badgeValues[index]}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View>
                {React.cloneElement(segment, {
                  active: currentIndex === index,
                  badgeValue: badgeValues[index],
                  finalisedBadgeTextStyle,
                  badgeValueStatusStyle:
                    currentIndex === index
                      ? finalisedActiveBadgeStyle
                      : finalisedInActiveBadgeStyle,
                })}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

export function Segment<T extends boolean | undefined>({
  column,
  title,
  icon,
  leftIcon,
  rightIcon,
  position,
  space = 4,
  padding = 0,
  inactiveTitleStyle,
  activeTitleStyle,
  inactiveIconColor,
  activeIconColor,
  /* hidden: internal props */
  // @ts-ignore
  active,
  // @ts-ignore
  badgeValue,
  // @ts-ignore
  finalisedBadgeTextStyle,
  // @ts-ignore
  badgeValueStatusStyle,
}: /* end hidden props */
SegmentProps<T>) {
  const flexDirection = column ? 'column' : 'row';
  const pos: ViewStyle = !flexDirection
    ? {alignItems: (position as ViewStyle['alignItems']) ?? 'center'}
    : {justifyContent: (position as ViewStyle['justifyContent']) ?? 'center'};
  const activeTitleDefaultStyle = {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
  } as const;
  const inactiveTitleDefaultStyle = {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4b5563',
  } as const;
  const iconStatusColor = active
    ? activeIconColor ??
      activeTitleStyle?.color ??
      activeTitleDefaultStyle.color
    : inactiveIconColor ??
      inactiveTitleStyle?.color ??
      inactiveTitleDefaultStyle.color;
  return (
    <View style={[styles.segmentWrapper, {padding, flexDirection, ...pos}]}>
      <Text style={{color: iconStatusColor}}>{icon ?? leftIcon}</Text>
      <View style={{width: space}} />
      <Text
        style={
          active
            ? [activeTitleDefaultStyle, activeTitleStyle]
            : [inactiveTitleDefaultStyle, inactiveTitleStyle]
        }
      >
        {title}
      </Text>
      <View style={{width: space}} />
      <Text style={{color: iconStatusColor}}>{rightIcon}</Text>
      {badgeValue != null && (
        <View
          style={[styles.defaultBadgeContainerStyle, badgeValueStatusStyle]}
        >
          <Text style={finalisedBadgeTextStyle}>{badgeValue}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  defaultSegmentedControlWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9,
    backgroundColor: '#f3f4f6',
  },
  touchableContainer: {
    flex: 1,
    elevation: 9,
    paddingVertical: 14,
  },
  segmentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  movingSegmentStyle: {
    top: 0,
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
  // Badge Styles
  defaultBadgeContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 16,
    width: 16,
    borderRadius: 9999,
    alignContent: 'flex-end',
  },
});

export default SegmentedControl;
