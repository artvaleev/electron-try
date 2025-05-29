import React, { useState } from "react";
import { useBinaryScanner } from "./qr";

function base64ToHex(base64: string): string {
  const binaryStr = atob(base64);
  let hex = '';
  for (let i = 0; i < binaryStr.length; i++) {
    const byte = binaryStr.charCodeAt(i);
    hex += byte.toString(16).padStart(2, '0');
  }
  return hex;
}

const isBase64Encoded = (str: string): boolean => {
  if (str.length % 4 !== 0) {
    return false;
  }

  const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
  return base64Regex.test(str);
};

const isBarcode = (data: string): boolean => {
  return /^[0-9]+$/.test(data);
}

type ProcessingResult = {
  rawData: string;
} & ({
  isBarcode: true;
} | {
  isBarcode: false;
  isBase64Encoded: true;
  decodedHexData: string;
} | {
  isBarcode: false;
  isBase64Encoded: false;
  decodedHexData?: never;
}
)
const processScannedData = (rawData: string): ProcessingResult => {
  const dataIsBarcode = isBarcode(rawData);
  if (dataIsBarcode) {
    return {
      rawData,
      isBarcode: true,
    };
  }

  if (isBase64Encoded(rawData)) {
    try {
      return {
        rawData,
        isBarcode: false,
        isBase64Encoded: true,
        decodedHexData: base64ToHex(rawData)
      }
    } catch (error) {}
  }

  return {
    rawData,
    isBarcode: false,
    isBase64Encoded: false
  }
}

export default function App() {
  // useKeyLogger();
  const [value, setValue] = useState('')

  useBinaryScanner((data) => {
    console.log("scanned", processScannedData(data));
  })

  return (
    <>
      <h1>Hello World</h1>
      <textarea
        value={value}
        onChange={(e) => {
          // console.log("e.target.value", e.target.value);

          setValue(e.target.value);
        }}
        rows={20}
        style={{ width: "100%" }}
      />
    </>
  );
}
