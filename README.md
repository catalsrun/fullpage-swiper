# Fullpage-swiper library
`fullpage-swiper` is fullpage movement library for browser via touch actions

## install
```bash
npm install -S fullpage-swiper
```

## Check examples
```bash
npm run examples:view
# go to http://localhost:3000
```

## Getting started
```html
<!-- 
  HTML markup required, refer to two files
  - ./examples/pages/top-left.js
  - ./examples/pages/y-x.js
-->
```

```javascript
import FullpageSwiper from 'fullpage-swiper';

new FullpageSwiper('#container', {
  debug: true, // debug mode - default false, remove for production
  threshold: 10, // touch detection minimum value
  dragStart() {
    console.log('DRAG_START: callback');
  },
  dragMove(context) {
    const { snapshotPositions, stackMoveFromTo } = context
    console.log('DRAG_MOVE: callback', snapshotPositions, stackMoveFromTo);
  },
  dragEnd(context) {
    // const { snapshotPositions, stackMoveFromTo } = context
    console.log('DRAG_END: callback');
  }
});
```

## CDN
```html
<script src="https://unpkg.com/fullpage-swiper"><script>
<script>
// Use 'FullpageSwiper' global variable.
<script>
```

## Constraints
- Only one top-level data-stack-type
- One-depth sub-level mark-up structure - [data-stack > data-stack-type] set

## data-* naming explanation
- data-stack-type : 'top' | 'left' | 'y' | 'x'
- data-stack : direct child of data-stack-type element

## stack-type explanation
- top : position absolute based movement via top value (data-stack element)
- left : position absolute based movement via top value (data-stack element)
- y : transform based movement via transformY value (data-stack-type element)
- x : transform based movement via transformX value (data-stack-type element)