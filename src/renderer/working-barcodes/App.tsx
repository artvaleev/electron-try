import React, { useState } from "react";
import { useBarcodeScanner } from "./useBarcodeScanner.back";
import { useKeyLogger } from "./useKeyLogger";

export default function App() {
  useKeyLogger();

  const [value, setValue] = useState<string>("");
  useBarcodeScanner((data, _dataArr) => {
    console.log("scanned", data);
  });

  return (
    <>
      <h1>Hello World</h1>
      <textarea
        value={value}
        onChange={(e) => {
          // console.log("e.target.value", e.target.value);

          setValue(e.target.value);
        }}
      />
    </>
  );
}
