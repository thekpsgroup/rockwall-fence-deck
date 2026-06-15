# Project photos

Real project photos, web-optimized (resized to ~1600 px long edge, progressive JPEG q82).
Hero backgrounds also have a WebP version (q62) that's preloaded for fast LCP.

## Fences (homepage "Recent Work" gallery)

| File | Photo |
|---|---|
| `cedar-board-on-board-privacy-fence.jpg` | Dark-stained board-on-board cedar privacy fence |
| `horizontal-cedar-fence-gate.jpg` | Horizontal cedar privacy fence with gate |
| `cedar-privacy-fence-steel-posts.jpg` | Cedar privacy fence on galvanized steel posts |
| `horizontal-cedar-fence-sloped-yard.jpg` | Horizontal cedar fence stepped down a slope |
| `wrought-iron-ranch-fence.jpg` | Ornamental iron fence on acreage |
| `welded-wire-ranch-fence-gate.jpg` | Welded-wire ranch fence with swing gate |
| `pipe-top-field-fence.jpg` | Pipe-top wire field/pasture fence |

## Decks (gallery + deck-page heroes)

| File | Photo |
|---|---|
| `composite-deck-cable-rail.jpg` | Composite deck with black cable railing (Deck Building hero) |
| `stained-cedar-deck-tree.jpg` | Stained cedar deck with steps, wraps a tree (Deck Staining hero) |
| `cedar-deck-bench-steps.jpg` | Cedar deck with built-in bench |

## Hero backgrounds (WebP, preloaded)

Home → `horizontal-cedar-fence-gate.webp` · Fence Installation → `cedar-board-on-board-privacy-fence.webp`
· Fence Repair → `cedar-privacy-fence-steel-posts.webp` · Deck Building → `composite-deck-cable-rail.webp`
· Deck Staining → `stained-cedar-deck-tree.webp` · Service Area → `horizontal-cedar-fence-sloped-yard.webp`

## Adding or replacing

- Drop a JPG (~1600 px long edge) into `images/`, then reference it in the page.
- Gallery tiles crop to 4:3 (`object-fit: cover`); hero backgrounds use `--bg:url('images/…')`
  and have a matching `<link rel="preload">` in the page `<head>`.
