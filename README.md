# React native animated carousel

# Installation

```bash
npm install react-native-carousel-slide
```

## Example

```jsx

import Carousel from 'react-native-carousel-slide';

....

const data = [
    {
      id: '1',
      color: '#4087B0',
      image: Full,
    },
    {id: '2', color: '#735BAB', image: ber},
    {
      id: '3',
      color: '#60C0C0',
      image: Ber,
    },
    {
      id: '4',
      color: '#60C0AA',
      image: Full,
    },
    {
      id: '5',
      color: '#735BAB',
      image: Ber,
    },
    {
      id: '6',
      color: '#735BAB',
      image: ber,
    },
  ];


  const handleImagePress = id => {
    // Define a map of messages for each image ID
    const idToMessage = {
      1: 'This is image with ID 1',
      2: 'This is image with ID 2',
      3: 'This is image with ID 3',
      4: 'This is image with ID 4',
      5: 'This is image with ID 5',
      6: 'This is image with ID 6',
    };

    // Check if the provided ID exists in the map, if not, use the default message
    const message = idToMessage[id] || 'This is another image';

    // You can display the message as an alert or in any other way you prefer
    Alert.alert(message);
  };



...


 <Carousel input={data} onPress={handleImagePress} />


```
