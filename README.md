# Fullpage-swiper library
`fullpage-swiper` is fullpage movement library for browser via touch actions

## Demo site (Currently, support mobile drag event only)
https://fullpage-swiper.netlify.app/

## Install
```bash
npm install -S fullpage-swiper
```

## Check examples
```bash
git clone https://github.com/catalsrun/fullpage-swiper.git
npm install
cd fullpage-swiper/examples
npm install
npm start
# Go to http://localhost:3000
# Check two files
#  - examples/pages/top-left.js
#  - examples/pages/y-x.js
```

## Getting started
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
    // console.log('DRAG_MOVE: callback', snapshotPositions, stackMoveFromTo);
  },
  dragEnd(context) {
    console.log('DRAG_END: callback', context.currentIdx);
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

## Current features
- drag event

## Todo features
- touch swipe event
- mousewheel event
- keydown event