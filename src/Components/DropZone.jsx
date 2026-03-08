import classNames from "classnames";
import { useState } from "react";

export default function DropZone({
  answer,
  zoneId,
  value,
  onDrop,
  setAvailable,
  isCheckingAnswers
}) {
  const [dragDepth, setDragDepth] = useState(0);

  return <span
    draggable={!!value}
    onDragStart={e => {
      e.dataTransfer.setData("text/plain", value);
      e.dataTransfer.setData("sourceZone", zoneId);
    }}
    onDragOver={e => {
      e.preventDefault();
    }}
    onDrop={e => {
      e.preventDefault();
      setDragDepth(0);

      const word = e.dataTransfer.getData("text/plain");
      const sourceZone = e.dataTransfer.getData("sourceZone");

      if (parseInt(sourceZone) !== parseInt(zoneId)) {
        onDrop(zoneId, word);
        onDrop(sourceZone, null);
        if (value) setAvailable(prev => [...prev, value]);
      }

    }}
    onDragEnd={e => {
      if (e.dataTransfer.dropEffect === 'none') {
        onDrop(zoneId, null);
        if (value) setAvailable(prev => [...prev, value]);
      }
    }}
    onDragEnter={e => { e.preventDefault(); setDragDepth(d => d + 1); }}
    onDragLeave={e => { e.preventDefault(); setDragDepth(d => d - 1); }}
    className={classNames("DropZone", {
      "DropZone--correct": isCheckingAnswers && answer === value,
      "DropZone--wrong": isCheckingAnswers && answer !== value,
      "DropZone--dragging": dragDepth > 0,
      "DropZone--filled": !!value,
    })}
  >
    {value || " "}
  </span>;
}
