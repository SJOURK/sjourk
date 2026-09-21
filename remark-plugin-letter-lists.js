const MARKER = /^([a-zA-Z])[.)]\s+/;

function splitLines(children) {
  const lines = [[]];
  const push = node => lines[lines.length - 1].push(node);

  for (const child of children) {
    if (child.type === "break") {
      lines.push([]);
      continue;
    }
    if (child.type !== "text" || !child.value.includes("\n")) {
      push(child);
      continue;
    }
    const parts = child.value.split("\n");
    parts.forEach((part, index) => {
      if (index > 0) lines.push([]);
      if (part !== "") push({ ...child, value: part, position: undefined });
    });
  }

  return lines.filter(line => line.length > 0);
}

function markerOf(line) {
  const first = line[0];
  return first.type === "text" ? first.value.match(MARKER) : null;
}

function findRun(lines) {
  const a = "a".charCodeAt(0);

  for (let start = 0; start < lines.length; start++) {
    const first = markerOf(lines[start]);
    if (!first || first[1].toLowerCase().charCodeAt(0) !== a) continue;

    const markers = [first];
    while (start + markers.length < lines.length) {
      const next = markerOf(lines[start + markers.length]);
      if (!next || next[1].toLowerCase().charCodeAt(0) !== a + markers.length) break;
      markers.push(next);
    }
    if (markers.length >= 2) return { start, markers };
  }

  return null;
}

function toParagraph(lines) {
  const children = [];
  lines.forEach((line, index) => {
    if (index > 0) children.push({ type: "text", value: "\n" });
    children.push(...line);
  });
  return { type: "paragraph", children };
}

function toList(lines, markers) {
  return {
    type: "list",
    ordered: true,
    start: 1,
    spread: false,
    data: { hProperties: { type: markers[0][1] === markers[0][1].toUpperCase() ? "A" : "a" } },
    children: lines.map((line, index) => {
      const [head, ...rest] = line;
      const text = head.value.slice(markers[index][0].length);
      return {
        type: "listItem",
        spread: false,
        children: [
          {
            type: "paragraph",
            children: [...(text ? [{ ...head, value: text }] : []), ...rest],
          },
        ],
      };
    }),
  };
}

export default function remarkLetterLists() {
  return tree => {
    const walk = node => {
      if (!Array.isArray(node.children)) return;

      node.children = node.children.flatMap(child => {
        if (child.type !== "paragraph") {
          walk(child);
          return child;
        }

        const lines = splitLines(child.children);
        const run = findRun(lines);
        if (!run) return child;

        const before = lines.slice(0, run.start);
        const after = lines.slice(run.start + run.markers.length);
        return [
          ...(before.length ? [toParagraph(before)] : []),
          toList(lines.slice(run.start, run.start + run.markers.length), run.markers),
          ...(after.length ? [toParagraph(after)] : []),
        ];
      });
    };

    walk(tree);
  };
}
