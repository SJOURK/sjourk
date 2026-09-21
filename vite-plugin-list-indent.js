const FENCE = /^\s*(```|~~~)/;
const ITEM = /^([ \t]*)([-*+]|\d+[.)])([ \t]+)/;

function width(indent) {
  return indent.replace(/\t/g, "    ").length;
}

export function normalize(code) {
  let inFence = false;
  let stack = [];

  return code
    .split("\n")
    .map(line => {
      if (FENCE.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;

      const match = line.match(ITEM);
      if (!match) {
        if (line.trim() !== "" && !/^[ \t]/.test(line)) stack = [];
        return line;
      }

      const [, indent, marker, gap] = match;
      const source = width(indent);
      const size = marker.length + width(gap);

      while (stack.length && source < stack[stack.length - 1].source) stack.pop();

      const top = stack[stack.length - 1];
      if (!top) {
        stack.push({ source, output: source, size });
      } else if (source > top.source) {
        stack.push({ source, output: top.output + top.size, size });
      } else {
        top.size = size;
      }

      return " ".repeat(stack[stack.length - 1].output) + line.slice(indent.length);
    })
    .join("\n");
}

export default function listIndentPlugin() {
  return {
    name: "list-indent",
    enforce: "pre",
    transform(code, id) {
      if (!id.split("?")[0].endsWith(".mdx")) return null;
      return { code: normalize(code), map: null };
    },
  };
}
