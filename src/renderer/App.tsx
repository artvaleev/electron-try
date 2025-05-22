import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
		let buffer = '';
		let timeout: NodeJS.Timeout | undefined;
	  
		const onKeyDown = (e: KeyboardEvent) => {
			console.log("🚀 ~ onKeyDown ~ onKeyDown:", e.key)
			
		  if (timeout) clearTimeout(timeout);
		  // Предположим, что сканер завершает ввод Enter'ом
		  if (e.key === 'Enter') {
			if (buffer.length > 0) {
			  console.log(buffer);
			  buffer = '';
			}
		  } else {
			buffer += e.key;
			timeout = setTimeout(() => buffer = '', 100); // сброс, если ввод не продолжается
		  }
		};
	  
	  
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	  }, []);
  return <h1>Hello World</h1>;
}