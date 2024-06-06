import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';

const PinInput = ({ length, onPinComplete, placeholderText ,label, pinWidth = 40 ,labelAlign ="center"}) => {
  const placeholder = placeholderText || "PAROLA"
  const [pins, setPins] = useState(new Array(length).fill(''));
  const pinRefs = useRef(new Array(length).fill().map(() => React.createRef()));
  const placeholders = placeholder.split('').slice(0, length);

  useEffect(() => {
    setPins(new Array(length).fill(''));  // PIN uzunluğu değiştiğinde state'i sıfırla
  }, [length]);

  const handleChange = (text, index) => {
    const newPins = [...pins];
    newPins[index] = text;
    setPins(newPins);

    if (text) {
      if (index < length - 1) {
        pinRefs.current[index + 1].focus();
      }
    } else {
      if (index > 0) {
        pinRefs.current[index - 1].focus();
      }
    }

    if (newPins.every(pin => pin.trim() !== '') && index === length - 1) {
      onPinComplete(newPins.join(''));
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }, index) => {
    if (key === 'Backspace' && !pins[index]) {
      if (index > 0) {
        pinRefs.current[index - 1].focus();
      }
    }
  };

  const handleFocus = (index) => {
    const lastFilledIndex = pins.findIndex(pin => pin === '');
    if (lastFilledIndex !== -1 && index > lastFilledIndex) {
      pinRefs.current[lastFilledIndex].focus();
    } else {
      pinRefs.current[index].focus();
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, {textAlign:labelAlign}]}>{label }</Text>}
      <View style={styles.pinContainer}>
        {pins.map((_, index) => (
          <View key={index} style={styles.pinWrapper}>

            <TextInput
              key={index}
              style={[styles.pin, { width: pinWidth }]}
              maxLength={1}
              keyboardType="numeric"
              secureTextEntry={true}
              placeholder={placeholders[index]}
              placeholderTextColor="#999"
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
              onFocus={() => handleFocus(index)}
              ref={(el) => pinRefs.current[index] = el}
            />
          </View>

        ))}
      </View>

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pinWrapper: {
    alignItems: 'center',
  },
  pin: {
    width: 40,
    height: 40,
    margin: 5,
    textAlign: 'center',  // Yazma işaretini ortala
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  definitionText: {
    fontSize: 10,
    color: '#999',
    marginBottom: 2,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,

  },
});

export default PinInput;
