import { useState, useCallback } from "react";

const useSplitView = () => {
  const [split, setSplit] = useState(50);
  const [highlightTimeoutId, setHighlightTimeoutId] = useState(null);
  const [startX, setStartX] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleMouseMove = useCallback(
    (event) => {
      const newSplit = ((event.clientX - startX) / window.innerWidth) * 100;
      setSplit(Math.max(0, Math.min(100, newSplit)));
    },
    [startX]
  );

  const handleMouseUp = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    setDragging(false);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (event) => {
      const initialOffset =
        event.clientX - event.currentTarget.getBoundingClientRect().right;
      setStartX(initialOffset);
      setDragging(true);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  const handleMouseEnter = useCallback(() => {
    const timeoutId = setTimeout(() => setHighlightTimeoutId("highlight"), 100);
    setHighlightTimeoutId(timeoutId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(highlightTimeoutId);
    setHighlightTimeoutId(null);
  }, [highlightTimeoutId]);

  return {
    split,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
    dragging,
    highlightTimeoutId,
  };
};

export default useSplitView;
