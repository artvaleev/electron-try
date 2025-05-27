import { useEffect } from "react";

export type ScanEvent = {
  key: string;
  code: string;
};

export type BarcodeScanHandler = (events: ScanEvent[]) => void;

export const useBarcodeScannerEventCapture = (
  onScan: BarcodeScanHandler,
  scanDelay = 50, // Время между событиями (сканеры обычно быстрые)
  endKey = "Enter" // Клавиша, завершающая сканирование
) => {
  useEffect(() => {
    let events: ScanEvent[] = [];
    let lastEventTime = Date.now();
    let timer: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key, code } = e;

      // Игнорируем повторные события (залипание клавиш)
      if (e.repeat) return;

      const currentTime = Date.now();
      const timeSinceLastEvent = currentTime - lastEventTime;

      // Если прошло много времени, начинаем новый сбор событий
      if (timeSinceLastEvent > scanDelay) {
        events = [];
      }

      // Запоминаем событие
      events.push({ key, code });
      lastEventTime = currentTime;

      // Если пришла конечная клавиша (например, Enter)
      if (key === endKey || code === endKey) {
        e.preventDefault();
        if (events.length > 1) {
          // Игнорируем одиночные нажатия Enter
          onScan(events);
        }
        events = [];
        return;
      }

      // Очищаем предыдущий таймер и ставим новый
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (events.length > 1) {
          // Игнорируем одиночные нажатия
          onScan(events);
        }
        events = [];
      }, scanDelay);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timer) clearTimeout(timer);
    };
  }, [onScan, scanDelay, endKey]);
};
