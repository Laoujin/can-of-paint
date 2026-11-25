# Real DDD Fits in a Can of Paint

> The cathedral is fake DDD. The painted feet are real DDD.

An inversion talk on DDD, Hexagonal and CQRS: build a Hello World up to 41 files, change one character, then show the fix that needed no code at all.

Slides: <https://laoujin.github.io/can-of-paint/>

## Run

```sh
bun install
bun run dev
```

`bun run build` builds to `dist/`. Pushing to `main` deploys to GitHub Pages (`.github/workflows/deploy.yml`).

## Layout

- `slides.md`: slides and speaker notes
- `layouts/`: `enterprise` (parody chrome, KPI counter, stamps), `museum`, `min`, `black`, `bleed`
- `components/Cathedral.vue` + `utils/scenes.ts`: the DDD → Hex → CQRS build and the CR-0001 ripple, one step per click
- `components/Art.vue` + `utils/art.ts`: SVG artwork (feet, gauge wall, Pareto, mini cathedral)
- `utils/exhibits.ts`: Museum of Over-Engineering exhibits

## Sources

- Talk idea: <https://github.com/itenium-be/Architecture-KickOff/issues/4>
- Original deck: Laoujin/conferences PR #4 (`decks/hello-world-enterprise-edition`)

## Still to check

- Exact Fowler and Greg Young quotes + links
- Real museum exhibits and real cathedral numbers
- Feet story details and permission to tell it
