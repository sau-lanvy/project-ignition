# Project Ignition Flipbook

A dependency-free, responsive HTML flipbook for the *Project Ignition* manuscript.

## File structure

| File | Purpose |
|---|---|
| `index.html` | Accessible document shell and book controls |
| `assets/css/reader.css` | Layout, book styling, page-turn animation, and responsive rules |
| `assets/js/reader.js` | Pagination, rendering, navigation, and interaction state |
| `assets/js/chapters.js` | All editable chapter content |
| `assets/js/guide.js` | Part summaries and chapter-by-chapter reader guidance derived from the outline |

Open `index.html` directly in a browser. No build step is required.

## Editing chapters

Each chapter in `assets/js/chapters.js` has a number, date, and ordered list of blocks:

```js
{
  "num": 1,
  "date": "Monday, March 2",
  "blocks": [
    { "type": "p", "html": "Chapter prose." },
    { "type": "break" },
    { "type": "themes", "html": "The chapter takeaway." },
    {
      "type": "questions",
      "items": ["First discussion question?", "Second discussion question?"]
    }
  ]
}
```

Supported block types are `p`, `break`, `themes`, `questions`, and `end`. Basic inline HTML such as `<em>` is supported in `html` fields.

The reader paginates content automatically. Keep each block reasonably short because blocks are never split between pages.

## Editing the reader's guide

`assets/js/guide.js` contains the two part summaries, a synopsis for every chapter, and the practical “Apply It at Your Level” afterword. These appear at each chapter opening, in the expanded contents drawer, and after the novel, making the ideas easier to navigate, review, and apply across technical and nontechnical roles.
