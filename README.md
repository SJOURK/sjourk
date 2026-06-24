# Articles with Tests

A serverless site for educational articles with embedded interactive exercises. Built with Vite + React + MDX. Articles live in `/articles/**/*.mdx` and are loaded dynamically by route.

[Website](https://sjourk.github.io/sjourk/)

## Licensing

**Source code** (`src/`, `public/`, config files, etc.) — [MIT License](LICENSE)

**Article content** (`articles/`) — [CC BY-NC-SA 4.0](articles/LICENSE)
You may share and adapt the articles for non-commercial purposes, with attribution and under the same license.

---

## Adding an article

### Standalone article

Create `articles/<slug>.mdx`. The slug must contain only lowercase letters, numbers, hyphens, and underscores.

Add a frontmatter block at the top:

```mdx
---
title: Your Title
date: 2026-01-15
image: articles/cover.jpg
imageAlt: Alt text for the cover image.
blurb: One or two sentences shown on the home page.
order: 1
---
```

`order` is optional. Articles are sorted by `order` ascending (default 0), then by `date` descending, then alphabetically by slug. Articles with no date appear after all dated ones.

The Vite plugin reads all `.mdx` frontmatter at build time and regenerates the article list automatically on save.

### Category article with sub-articles

To group related articles under a parent, create a subfolder with an `index.mdx` and any number of sub-articles:

```
articles/land-surveying/index.mdx          → /articles/land-surveying
articles/land-surveying/triangulation.mdx  → /articles/land-surveying/triangulation
articles/land-surveying/coordinates.mdx    → /articles/land-surveying/coordinates
```

The category article (`index.mdx`) appears on the home grid like any other article. A grid of its sub-articles is rendered automatically at the bottom of its page. Sub-articles do not appear on the home grid — only through the category page.

When reading a sub-article, the breadcrumb in the top nav shows the parent category title and links back to it.

Sub-articles use the same frontmatter fields. Their `order` field controls the order within the category grid.

---

## Custom MDX components for the articles

### `<DragAndDrop>` + `<DropZone>`

A passage with blanks the user fills by dragging words from a pool.

```mdx
<DragAndDrop words="omnivores;Vulpes;nocturnal">
  Foxes belong to the genus <DropZone answer="Vulpes" />.
  They are primarily <DropZone answer="nocturnal" /> animals
  and are considered <DropZone answer="omnivores" />.
</DragAndDrop>
```

**`<DragAndDrop>`**

| Prop    | Type   | Description                                 |
| ------- | ------ | ------------------------------------------- |
| `words` | string | Semicolon-separated pool of draggable words |

**`<DropZone>`**

| Prop     | Type   | Description                     |
| -------- | ------ | ------------------------------- |
| `answer` | string | The correct word for this blank |

### `<FillIn>` + `<Blank>`

A passage with blanks the user fills by typing. Multiple accepted answers can be separated with `;`. Comparison is case-insensitive and trims whitespace.

```mdx
<FillIn>
  Foxes belong to the genus <Blank answer="Vulpes" />.
  They are considered <Blank answer="omnivores;omnivore" />.
</FillIn>
```

**`<Blank>`**

| Prop     | Type   | Description                            |
| -------- | ------ | -------------------------------------- |
| `answer` | string | Correct answer(s), semicolon-separated |

When checking: correct answers turn green, wrong answers turn red with strikethrough and the correct answer shown next to it.

### `<Choices>` + `<Choice>`

A multiple-choice question. Use standalone for a single question with its own check/reset buttons, or wrap multiple questions in `<ChoiceSet>` to share one set of buttons.

```mdx
1. What do foxes primarily eat?
<Choices>
  <Choice explanation="Foxes are not grazers.">Grass and leaves</Choice>
  <Choice correct explanation="Foxes are omnivores that hunt small mammals and forage for berries.">Small mammals, birds, and berries</Choice>
  <Choice>Fish and aquatic plants</Choice>
</Choices>
```

There can be multiple correct answers. `explanation` is optional and shown after clicking "check answers".

**`<Choices>`**

| Prop     | Type    | Description                                                 |
| -------- | ------- | ----------------------------------------------------------- |
| `single` | boolean | Only one answer can be selected at a time (radio behaviour) |

**`<Choice>`**

| Prop          | Type    | Description                                      |
| ------------- | ------- | ------------------------------------------------ |
| `correct`     | boolean | Marks this option as correct                     |
| `explanation` | string  | Optional explanation shown when checking answers |

#### `<ChoiceSet>`

Wraps multiple `<Choices>` blocks so they share a single check/reset button bar.

```mdx
<ChoiceSet>

1. First question
<Choices>...</Choices>

2. Second question
<Choices>...</Choices>

</ChoiceSet>
```

### `<Categorize>` + `<Category>`

A drag-and-drop exercise where the user sorts words into labelled buckets.

```mdx
<Categorize words="rabbit;apple;salmon;grass;berries;mouse">
  <Category label="Eaten by foxes" answer="rabbit;apple;berries;mouse" />
  <Category label="Inedible to foxes" answer="salmon;grass" />
</Categorize>
```

**`<Categorize>`**

| Prop    | Type   | Description                       |
| ------- | ------ | --------------------------------- |
| `words` | string | Semicolon-separated words to sort |

**`<Category>`**

| Prop     | Type   | Description                                          |
| -------- | ------ | ---------------------------------------------------- |
| `label`  | string | Bucket heading                                       |
| `answer` | string | Semicolon-separated words that belong in this bucket |

Words can be dragged between buckets and back to the pool. Checking marks each placed word green or red in place.

### `<Img>`

Replaces the standard markdown image to add layout and sizing options.

```mdx
<Img src="./fox.jpg" alt="a red fox" />
<Img src="./fox.jpg" float="left" width={35} />
<Img src="./fox.jpg" float="right" />
<Img src="./fox.jpg" fullBleed />
<Img src="./fox.jpg" noMaxHeight />
<Img src="./fox.jpg" eager />
```

| Prop          | Type                  | Default | Description                                                   |
| ------------- | --------------------- | ------- | ------------------------------------------------------------- |
| `src`         | string                | —       | Image path                                                    |
| `caption`     | string                | —       | Caption displayed under the image                             |
| `alt`         | string                | `""`    | Alt text                                                      |
| `float`       | `"left"` \| `"right"` | —       | Float image left or right, text wraps around it               |
| `width`       | number                | —       | Max width as % of content column (e.g. `{40}`)                |
| `fullBleed`   | boolean               | —       | Extend to full viewport width, breaking out of content column |
| `noMaxHeight` | boolean               | —       | Disable the default `max-height: 100dvh` constraint           |
| `eager`       | boolean               | —       | Disable lazy loading                                          |

Plain markdown images (`![alt](src)`) still work if needed.