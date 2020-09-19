# Fullpage-swiper library
Fullpage-swiper is fullpage movement library for browser via touch actions

## install
```bash
npm install -S fullpage-swiper
```

## Check examples
```bash
npm run example:view
# go to http://localhost:3000
```

## Getting started

```html
<!-- 
  markup required
-->
<div id="container" data-stack-type="top">
  <section data-stack>
    <div data-stack-type="top">
      <div data-stack>Top<->Down 1</div>
      <div data-stack>Top<->Down 2</div>
      <div data-stack>Top<->Down 3</div>
    </div>
  </section>
  <section data-stack>
    <div data-stack-type="left">
      <div data-stack>Left <-> Right 1</div>
      <div data-stack>Left <-> Right 2</div>
      <div data-stack>Left <-> Right 3</div>
    </div>
  </section>
  <section data-stack>
    <div data-stack-type="top">
      <div data-stack>Top<->Down Last stack</div>
    </div>
  </section>
</div>
```

```javascript
import Fullpage from 'fullpage-swiper';

new Fullpage('#container', {
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