import React, { useState } from 'react';
import {
  View,
  FlatList,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const width = Dimensions.get('window').width;
const CARD_LENGTH = width * 0.53;
const SPACING = width * 0.07;
const SIDECARD_LENGTH = (width * 0.5) / 50;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// const Box = ({color}) => (
//   <View style={[styles.box, {backgroundColor: color}]} />
// );
interface CarouselProps {
  index: number;
  scrollX: number;
  image: string;
  // onPress: () => void;
  // color: string;
}
console.log('width', width);

function Item({ index, scrollX, image, onPress, input }: CarouselProps) {
  console.log('item', input);

  const size = useSharedValue(0.8);
  const handlePress = () => {
    onPress(input[index].id);
  };
  const inputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];

  size.value = interpolate(
    scrollX,
    inputRange,
    [0.8, 1, 0.8],
    Extrapolate.CLAMP
  );

  const opacity = useSharedValue(1);
  const opacityInputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];
  opacity.value = interpolate(
    scrollX,
    opacityInputRange,
    [0.5, 1, 0.5],
    Extrapolate.CLAMP
  );

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: size.value }],
      opacity: opacity.value,
    };
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        shadowOpacity: 3,
        shadowColor: 'grey',
        shadowOffset: 0.1,
        shadowRadius: 5,
      }}
    >
      <Animated.View
        style={[
          styles.box,
          cardStyle,
          {
            marginLeft: index == 0 ? SIDECARD_LENGTH : SPACING,
            marginRight: index == 2 ? SIDECARD_LENGTH : SPACING,
            // backgroundColor: color,
          },
        ]}
      >
        {/* <Animated.View
        index={index}
        scrollX={scrollX}
        style={[
          styles.box,
          {
            backgroundColor: item.color,
            height: height,
            marginLeft: index === 0 ? 10 : 20,
            marginRight: index === 0 ? 0 : 30,
          },
        ]}
      /> */}
        <Image source={image} style={{ width: '100%', height: '100%' }} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const FirstCarousel = ({ input, onPress }) => {
  // const height = useSharedValue(300);
  const [scrollX, setScrollX] = useState(0);
  console.log('first', input);

  return (
    <Animated.View>
      <AnimatedFlatList
        scrollEventThrottle={30}
        showsHorizontalScrollIndicator={false}
        decelerationRate={10}
        snapToInterval={CARD_LENGTH + SPACING * 1.5}
        // snapToInterval={0.001}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        snapToAlignment={'center'}
        data={input}
        horizontal={true}
        renderItem={({ item, index }) => {
          return (
            <Item
              input={input}
              index={index}
              scrollX={scrollX}
              // color={item.color}
              // image={item.image}
              image={item.image}
              onPress={onPress}
            />
          );
        }}
        // @ts-ignore
        keyExtractor={(item) => item.id}
        onScroll={(event) => {
          setScrollX(event.nativeEvent.contentOffset.x);
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: CARD_LENGTH,
    height: 300,
    margin: 10,
    borderTopRightRadius: 20,
  },
});

export default FirstCarousel;
