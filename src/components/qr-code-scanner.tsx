import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { WRAPPER_PADDING } from './wrapper';
import { useIsFocused } from '@react-navigation/native';
import { usePermissionsStatus } from '../state/permissions.state';

interface Props {
  prompt?: string;
  onDataReceived: (type: string, data: string) => void;
}

export const QRCodeScanner: React.FC<React.PropsWithChildren<Props>> = ({ prompt, onDataReceived, children }) => {
  const isFocused = useIsFocused();

  const { camera, setCameraStatus } = usePermissionsStatus();

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setCameraStatus(status === 'granted');
  };

  useEffect(() => {
    if (!camera) {
      getBarCodeScannerPermissions();
    }
  }, []);

  if (!camera) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {isFocused && (
        <Camera
          onBarCodeScanned={({ type, data }) => onDataReceived(type, data)}
          style={{
            width: Dimensions.get('screen').width,
            marginLeft: -WRAPPER_PADDING,
            marginRight: -WRAPPER_PADDING,
            marginBottom: WRAPPER_PADDING,
            marginTop: -WRAPPER_PADDING,
            height: 400,
          }}
        >
          {children}
        </Camera>
      )}

      {prompt && <Text>{prompt}</Text>}
    </>
  );
}
