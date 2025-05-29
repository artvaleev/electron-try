import React, { useCallback, useEffect, useState } from "react";
import { useAltScannerViaInput } from "./useBarcodeScanner";
import { useBarcodeScanner } from "./useBarcodeScanner.back";
import { useKeyLogger } from "./useKeyLogger";
import { useBarcodeScannerEventCapture } from "./useBarcodeScannerEventCapture";
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

export default function App() {
  // useKeyLogger();

  const [value, setValue] = useState<string>("");
  // useBarcodeScanner((data, _dataArr) => {
  //   console.log("scanned", data);
  // });

  // const { data, isScanning } = useBinaryScanner();
  // useEffect(() => {
  //   if (!data) {
  //     return
  //   }
  //   console.log("data", data);

  //   console.log('base64ToHex', base64ToHex(data));
    
  // }, [data]);

  const isScanning = useBinaryScanner((data) => {
    console.log("scanned", data);
    try {
      console.log('base64ToHex', base64ToHex(data));
    } catch (error) {
      console.error('cant extract hex from data', data, error);
    }
  })

  return (
    <>
      {isScanning ? "isScanning" : "no isScanning"}
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
