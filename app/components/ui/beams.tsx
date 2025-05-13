"use client";
// optimized

import { useMemo } from "react";
import BeamElement from "@/elements/beam-element";
import { useWindowSize } from "@/hooks/window-size";

const GRID_BOX_SIZE = 40;
const BEAM_WIDTH_OFFSET = 1;

interface Transition {
  duration?: number;
  repeatDelay?: number;
  delay?: number;
}

interface Placement {
  top: number;
  left: number;
  transition?: Transition;
}

function calculatePlacement(
  numColumns: number,
  rowPosition: number,
  columnFraction: number
): Placement {
  return {
    top: GRID_BOX_SIZE * rowPosition,
    left: Math.floor(numColumns * columnFraction) * GRID_BOX_SIZE,
  };
}

export default function Beams() {
  const { width } = useWindowSize();

  const numColumns = useMemo(
    () => (width ? Math.floor(width / GRID_BOX_SIZE) : 0),
    [width]
  );

  const placements = useMemo(
    (): Placement[] => [
      {
        ...calculatePlacement(numColumns, 0, 0.05),
        transition: { duration: 3.5, repeatDelay: 5, delay: 2 },
      },
      {
        ...calculatePlacement(numColumns, 12, 0.15),
        transition: { duration: 3.5, repeatDelay: 10, delay: 4 },
      },
      {
        ...calculatePlacement(numColumns, 3, 0.25),
      },
      {
        ...calculatePlacement(numColumns, 9, 0.75),
        transition: { duration: 2, repeatDelay: 7.5, delay: 3.5 },
      },
      {
        ...calculatePlacement(numColumns, 0, 0.7),
        transition: { duration: 3, repeatDelay: 2, delay: 1 },
      },
      {
        ...calculatePlacement(numColumns, 2, 1),
        transition: { duration: 5, repeatDelay: 5, delay: 5 },
      },
    ],
    [numColumns]
  );

  return (
    <>
      {placements.map((p, i) => (
        <BeamElement
          key={`beams-${i + 1}`}
          top={p.top}
          left={p.left - BEAM_WIDTH_OFFSET}
          transition={p.transition || {}}
        />
      ))}
    </>
  );
}
