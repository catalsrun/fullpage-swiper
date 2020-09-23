import Hammer from 'hammerjs';
import gsap from 'gsap';

export default class FullpageSwiper {
  static getViewport() {
    return {
      // webview issue - undefined : window.innerWidth, window.innerHeight
      clientWidth: window.innerWidth || document.documentElement.clientWidth,
      clientHeight: window.innerHeight || document.documentElement.clientHeight
    };
  }
  static getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  constructor(selector, options = {}) {
    this.containerRef = document.querySelector(selector);
    this.containerType = this.containerRef.getAttribute('data-stack-type');
    if (!(this.containerRef && this.containerType)) {
      // eslint-disable-next-line no-console
      console.error(
        'fullpage-swiper initialization error, check selector',
        selector
      );
      return;
    }
    if (!Hammer || !gsap) {
      // eslint-disable-next-line no-console
      console.error(
        '"Hammer" and "gsap" peerDependencies are required'
      );
      return;
    }
    this.dep = { Hammer, gsap };
    this.containerAxis =
      this.containerType === 'top' || this.containerType === 'y'
        ? 'vertical'
        : 'horizontal';

    this.options = Object.assign({ debug: false }, options);

    this.parents = [];
    this.stacks = [];
    this.hammers = [];

    this.currentIdx = 0;
    this.eventType = {
      axis: '',
      direction: ''
    };
    this.dragging = false;
    this.draggingRef = null;

    this.viewport = FullpageSwiper.getViewport();

    this.setParents();
    this.setStacks();
    this.setCommonLayout();
    this.setLayout();

    // const config = this.options.parentsConfig[parent.id] || {}
    this._addEvents();

    this.options.debug && this.debug();
  }
  removeListeners() {}
  _blockEvent(eventType) {
    // 최초 이벤트 요청일 경우 블록 X
    if (this.eventType.axis === '') {
      this._updateEventType(eventType);
      return false;
    }
    // 1.드래깅중이 아닐 경우 이벤트 블록
    // 2. 진행중인 드래깅이 존재하는 경우, 요청 이벤트 타입이 동일하지 않으면 블록
    if (!this.isDragging || this.eventType.axis !== eventType.axis) {
      // console.log('blocked event', eventType);
      return true;
    }

    // 동일한 axis의 드래깅중인 경우 업데이트
    this._updateEventType(eventType);
  }
  _updateEventType(eventType) {
    this.eventType.axis = eventType.axis;
    this.eventType.direction = eventType.direction;
  }
  _resetDrag() {
    this.dragging = false;
    this.eventType = {
      target: null,
      axis: '',
      direction: ''
    };
    this.draggingRef = null;
  }
  _getDraggingInfo(eventTarget) {
    if (eventTarget) {
      // obj { from, to, draggable }
      let obj = eventTarget.canMoveToSibling[this.eventType.direction];
      if (!obj) {
        obj = eventTarget.canMoveToParent[this.eventType.direction];
      }
      return obj; 
    }
    return {};
  }
  _panstart(e) {
    this.isDragging = true;
    this.eventTarget = this.stacks.find(
      stack => stack.node === e.currentTarget
    );
    if (!this.eventTarget) {
      this.isDragging = false;
      return;
    }
    this.options.dragStart(this);
  }
  _panleft(e) {
    const eventType = {
      axis: 'horizontal',
      direction: 'left'
    };
    if (this._blockEvent(eventType)) return;
    // console.log('START:', eventType.direction);
    
    if (!this.draggingRef) {
      this.draggingInfo = this._getDraggingInfo(this.eventTarget);
      this.draggingRef = this.draggingInfo.draggable;
    }

    if (!this.draggingRef) {
      this._resetDrag();
    } else {
      this._dragging(this.draggingInfo, e);
    }
  }
  _panright(e) {
    const eventType = {
      axis: 'horizontal',
      direction: 'right'
    };
    if (this._blockEvent(eventType)) return;
    // console.log('START:', eventType.direction);
    if (!this.draggingRef) {
      this.draggingInfo = this._getDraggingInfo(this.eventTarget);
      this.draggingRef = this.draggingInfo.draggable;
    }

    if (!this.draggingRef) {
      this._resetDrag();
    } else {
      this._dragging(this.draggingInfo, e);
    }
  }
  _pandown(e) {
    const eventType = {
      axis: 'vertical',
      direction: 'down'
    };
    if (this._blockEvent(eventType)) return;
    // console.log('START:', eventType.direction, this.draggingRef);
    if (!this.draggingRef) {
      this.draggingInfo = this._getDraggingInfo(this.eventTarget);
      this.draggingRef = this.draggingInfo.draggable;
    }

    if (!this.draggingRef) {
      this._resetDrag();
    } else {
      this._dragging(this.draggingInfo, e);
    }
  }
  
  _panup(e) {
    const eventType = {
      axis: 'vertical',
      direction: 'up'
    };
    if (this._blockEvent(eventType)) return;
    // console.log('from to', data.from, data.to);

    if (!this.draggingRef) {
      this.draggingInfo = this._getDraggingInfo(this.eventTarget);
      this.draggingRef = this.draggingInfo.draggable;
    }

    if (!this.draggingRef) {
      this._resetDrag();
    } else {
      this._dragging(this.draggingInfo, e);
    }
  }
  _endCallback() {
    const { stackMoveFromTo } = this;
    let updateTo = stackMoveFromTo.to;
    if (stackMoveFromTo.toParent) {
      if (updateTo >= 0) {
        stackMoveFromTo.toParent.lastSeenIndex = updateTo;
      } else {
        // Restore
        stackMoveFromTo.toParent.lastSeenIndex = this.currentIdx;
        stackMoveFromTo.to = this.currentIdx;
      }
    }
    this.currentIdx = stackMoveFromTo.to;
    
    this.options.dragEnd(this);
    this._resetDrag();
  }
  _panend() {
    // console.log('START: panend', this.eventType, !!this.draggingRef);
    if (this.draggingRef) {
      // gsap 콜백내에서 this.draggingRef 의 값이 null 이 될 가능성이 존재하므로
      // 드래깅되는 객체의 주소지를 변수로 저장해서 사용
      const draggingRef = this.draggingRef;
      const eventType = this.eventType;
      const { type } = draggingRef;
      const { direction } = eventType;
      const { clientHeight, clientWidth } = this.viewport;
      const t = this.dep.gsap.timeline();

      if (type === 'top') {
        if (direction === 'up') {
          if (this.eventTarget.node !== draggingRef.node) {
            this.stackMoveFromTo.to = this.currentIdx;
          }
          t.to(draggingRef.node, { top: -clientHeight }).add(() => {
            draggingRef.positions.top = -clientHeight;
            this._endCallback();
          });
        }
        if (direction === 'down') {
          if (this.eventTarget.node === draggingRef.node) {
            this.stackMoveFromTo.to = this.currentIdx;
          }
          t.to(draggingRef.node, { top: 0 }).add(() => {
            draggingRef.positions.top = 0;
            this._endCallback();
          });
        }
      }
      if (type === 'left') {
        if (this.eventType.direction === 'left') {
          t.to(draggingRef.node, { left: -clientWidth }).add(() => {
            draggingRef.positions.left = -clientWidth;
            this._endCallback();
          });
        }
        if (this.eventType.direction === 'right') {
          t.to(draggingRef.node, { left: 0 }).add(() => {
            draggingRef.positions.left = 0;
            this._endCallback();
          });
        }
      }

      if (type === 'y') {
        const y = draggingRef.positions.y;
        if (direction === 'up') {
          const canNext = this.snapshotPositions.y < y;
          let move = y;
          if (canNext) {
            move = y - clientHeight;
            const max = -clientHeight * (draggingRef.children.length - 1);
            if (move < max) move = max;
          } else {
            this.stackMoveFromTo.to = this.currentIdx;
          }
          t.to(draggingRef.node, { y: move }).add(() => {
            draggingRef.positions.y = move;
            this._endCallback();
          });
        }
        if (direction === 'down') {
          const canNext = this.snapshotPositions.y > y;
          let move = y;
          if (canNext) {
            move = y + clientHeight;
            if (move >= 0) move = 0;
          } else {
            this.stackMoveFromTo.to = this.currentIdx;
          }

          t.to(draggingRef.node, { y: move }).add(() => {
            draggingRef.positions.y = move;
            this._endCallback();
          });
        }
      }

      if (type === 'x') {
        const x = draggingRef.positions.x;
        if (direction === 'left') {
          const canNext = this.snapshotPositions.x < x;

          let move = x;
          if (canNext) {
            move = x - clientWidth;
            const max = -clientWidth * (draggingRef.children.length - 1);
            if (move < max) move = max;
          } else {
            this.stackMoveFromTo.to = this.currentIdx;
          }
          t.to(draggingRef.node, { x: move }).add(() => {
            draggingRef.positions.x = move;
            this._endCallback();
          });
        }
        if (direction === 'right') {
          const canNext = this.snapshotPositions.x > x;
          let move = x;
          if (canNext) {
            move = x + clientWidth;
            if (move >= 0) move = 0;
          } else {
            this.stackMoveFromTo.to = this.currentIdx;
          }
          t.to(draggingRef.node, { x: move }).add(() => {
            draggingRef.positions.x = move;
            this._endCallback();
          });
        }
      }
    } else {
      this._resetDrag();
    }
  }
  // this.distance 값에 따라 드래그 가동범위 셋팅 가능하도록
  // Math.abs(e.deltaY), Math.abs(e.deltaX)
  _dragging({ from, to, changeableTo }, e) {
    const target = this.draggingRef;
    const { type } = target;
    const { clientHeight, clientWidth } = this.viewport;

    this.snapshotPositions = {
      top: 0,
      left: 0,
      x: 0,
      y: 0
    };
    const positions = this.snapshotPositions;
    let posY, posX;
    const stackView = this.stacks.find(el => el.node === this.eventTarget.node);
    if (type === 'y') {
      posY = e.deltaY + target.positions.y;
      if (posY >= 0) {
        target.positions.y = 0;
        target.node.style.transform = 'translate3d(0px, 0px, 0px)';
        // change dragging target
        this.draggingInfo = this._getDraggingInfo(stackView);
        this.draggingRef = this.draggingInfo.draggable;
        return;
      }

      const max = -clientHeight * (target.children.length - 1);
      if (posY <= max) {
        target.positions.y = max;
        target.node.style.transform = `translate3d(0px, ${max}px, 0px)`;
        // change dragging target
        const draggingInfo = this._getDraggingInfo(stackView);
        this.draggingRef = draggingInfo.draggable;
        return;
      }

      // 실제 그려짐
      positions.y = posY;
      this.dep.gsap.set(target.node, { y: posY });
    }
    if (type === 'x') {
      posX = e.deltaX + target.positions.x;
      if (posX >= 0) {
        target.positions.x = 0;
        target.node.style.transform = 'translate3d(0px, 0px, 0px)';
        // change dragging target
        this.draggingInfo = this._getDraggingInfo(stackView);
        this.draggingRef = this.draggingInfo.draggable;
        return;
      }
      const max = -clientWidth * (target.children.length - 1);
      if (posX <= max) {
        target.positions.x = max;
        target.node.style.transform = `translate3d(${max}px, 0px, 0px)`;
        // change dragging target
        this.draggingInfo = this._getDraggingInfo(stackView);
        this.draggingRef = this.draggingInfo.draggable;
        return;
      }
      positions.x = posX;
      this.dep.gsap.set(target.node, { x: posX });
    }
    if (type === 'top') {
      posY = e.deltaY + target.positions.top;
      if (posY >= 0) {
        target.positions.top = 0;
        target.node.style.top = 0 + 'px';
        // change dragging target
        this.draggingInfo = this._getDraggingInfo(stackView);
        this.draggingRef = this.draggingInfo.draggable;
        return;
      }
      if (posY <= -clientHeight) {
        target.positions.top = -clientHeight;
        target.node.style.top = -clientHeight + 'px';
        // change dragging target
        this.draggingInfo = this._getDraggingInfo(stackView);
        this.draggingRef = this.draggingInfo.draggable;
        return;
      }

      positions.top = posY;
      this.dep.gsap.set(target.node, { top: posY });
    }

    if (type === 'left') {
      posX = target.positions.left + e.deltaX;
      if (posX >= 0) {
        target.positions.left = 0;
        target.node.style.left = 0 + 'px';
        // change dragging target
        this.draggingInfo = this._getDraggingInfo(stackView);
        this.draggingRef = this.draggingInfo.draggable;
        return;
      }
      if (posX <= -clientWidth) {
        target.positions.left = -clientWidth;
        target.node.style.left = -clientWidth + 'px';
        // change dragging target
        this.draggingInfo = this._getDraggingInfo(stackView);
        this.draggingRef = this.draggingInfo.draggable;
        return;
      }

      positions.left = posX;
      this.dep.gsap.set(target.node, { left: posX });
    }

    this.stackMoveFromTo = this._getStackMoveFromTo(from, to, changeableTo);
    this.options.dragMove(this);
    // top 의 경우시
    // siblingIndex 0, posY 0, -1, -2, ... -> end Event 시 -667
    // siblingIndex 0 값은 점점 hide, sliblingindex 1값은 하단 부터 점점 노출
  }
  _getStackMoveFromTo(from, to, changeableTo) {
    const result = {
      from,
    };
    if (to !== undefined) {
      const toParent = this.stacks[to].innerParent;
      result.to = to;
      result.toParent = toParent;
    } else if (changeableTo !== undefined) {
      const toParent = this.stacks[changeableTo].innerParent;
      result.to = toParent.lastSeenIndex ? toParent.lastSeenIndex : changeableTo;
      result.toParent = toParent;
    }
    return result;
  }

  _addEvents() {
    // mobile 일 경우
    // touchstart, touchmove, touchend 3가지 등록

    // pc 일 경우
    // DOMMouseScroll mousewheel
    // mousedown, mousemove, mouseup
    // keydown

    // resizeComplete 시 currentIdx 로 이동

    const mc = new this.dep.Hammer(this.containerRef);
    // save mc instance for remove event listeners - mc.off();
    this.hammers.push(mc);
    mc.add(
      new this.dep.Hammer.Pan({
        direction: this.dep.Hammer.DIRECTION_ALL,
        threshold: this.options.threshold
      })
    );
    // console.log(2);

    // Hammer pan event issue : not support event.currentTarget
    this.stacks.forEach(({ node }) => {
      node.addEventListener('touchstart', this._panstart.bind(this), false);
    });

    mc.on('panend', this._panend.bind(this));
    mc.on('panleft', this._panleft.bind(this));
    mc.on('panright', this._panright.bind(this));
    mc.on('pandown', this._pandown.bind(this));
    mc.on('panup', this._panup.bind(this));
  }
  setCommonLayout() {
    // Block x,y scrolling
    // Required in Samsung Internet browser
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
  }
  setLayout() {
    this.viewport = FullpageSwiper.getViewport();
    // 부모 컨테이너 layout
    this.parents.forEach(parent => {
      // data-stack-type 에 따라 layout setting
      // x, y, top, left
      switch (parent.type) {
      case 'x':
        this._layoutX(parent);
        return;
      case 'y':
        this._layoutY(parent);
        return;
      case 'top':
      case 'left':
        this._layoutFixed(parent);
        return;
      }
    });
  }
  _layoutX(parent) {
    const { clientHeight, clientWidth } = this.viewport;
    const { node, children } = parent;
    node.x = node.y = 0;
    node.style.display = 'flex';
    node.style.overflow = 'hidden';
    node.style.position = 'relative';
    node.style.width = clientWidth * children.length + 'px';
    node.style.transform = 'translate3d(0px, 0px, 0px)';
    children.forEach(({ node }) => {
      node.style.width = clientWidth + 'px';
      node.style.height = clientHeight + 'px';
    });
  }
  _layoutY(parent) {
    const { clientHeight } = this.viewport;
    const { node, children } = parent;
    node.x = node.y = 0;
    node.style.overflow = 'hidden';
    node.style.position = 'relative';
    node.style.height = clientHeight * children.length + 'px';
    node.style.transform = 'translate3d(0px, 0px, 0px)';
    children.forEach(({ node }) => {
      node.style.height = clientHeight + 'px';
    });
  }
  _layoutFixed(parent) {
    const { clientHeight, clientWidth } = this.viewport;
    const { node, children } = parent;
    node.style.overflow = 'hidden';
    node.style.position = 'relative';
    node.style.height = clientHeight + 'px';
    node.style.width = clientWidth + 'px';

    children.forEach(({ node }, idx, arr) => {
      node.style.position = 'absolute';
      node.style.top = 0;
      node.style.left = 0;
      node.style.height = clientHeight + 'px';
      node.style.width = clientWidth + 'px';
      node.style.zIndex = (arr.length - idx) * 10;
    });
  }
  setParents() {
    this.parents = Array.from(
      document.querySelectorAll('[data-stack-type]')
    ).map(parent => {
      const type = parent.getAttribute('data-stack-type');
      const axis =
        type === 'top' || type === 'y' ? 'vertical' : 'horizontal';

      let children = [];
      // if parent is root parent
      if (parent === this.containerRef) {
        children = Array
          .from(parent.children)
          .filter(el => typeof el.getAttribute('data-stack') === 'string');
      } else {
        children = Array
          .from(parent.querySelectorAll('[data-stack]'))
          .filter(el => typeof el.getAttribute('data-stack') === 'string');
      }

      return {
        type,
        axis,
        node: parent,
        isRoot: parent === this.containerRef,
        children,
        positions: {
          x: 0,
          y: 0,
          top: 0,
          left: 0
        }
      };
    });
  }
  setStacks() {
    // filter function - only [data-stack] element
    const filter = node => {
      const isStack =
        node && typeof node.getAttribute('data-stack') === 'string';
      
      const result = isStack
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
     
      return result;
    };
    
    const walker = document.createTreeWalker(
      this.containerRef,
      NodeFilter.SHOW_ELEMENT,
      filter,
      false
    );

    // node is [data-stack] element
    let node = walker.firstChild();
    let idx = 0;
    while (node !== null) {
      let parentNode = node.parentNode;
      let type;
      while (parentNode !== null) {
        type = parentNode.getAttribute('data-stack-type');
        if (type) {
          break;
        } else {
          parentNode = parentNode.parentNode;
        }
      }

      const isVertical = type === 'top' || type === 'y';
      const direction = isVertical ? 'vertical' : 'horizontal';
      const innerParentIndex = this.parents.findIndex(p => p.node === parentNode);
      const innerParent = this.parents[innerParentIndex];

      if (innerParent.node === this.containerRef) {
        innerParent.outerParent = null;
      } else {
        // data-stack (this is outerParent) > data-stack-type (this is innerParent)
        const outerParent = this.parents[0].children.find(outer => {
          return outer.node.querySelector('[data-stack-type]') === parentNode;
        });
        if (outerParent) {
          innerParent.outerParent = outerParent;
        }
      }

      const siblingIndex = innerParent.children.findIndex(el => el === node);
      const stackView = {
        type,
        axis: direction,
        node, // for e.target
        siblingIndex,
        innerParent,
        innerParentIndex,
        isRootLevel: innerParent.isRoot,
        isRootLevelStack: innerParent.isRoot,
        children: innerParent.children,
        isFirstNode: siblingIndex === 0,
        isLastNode: siblingIndex === innerParent.children.length - 1,
        requestEvents: {},
        positions: {
          x: 0,
          y: 0,
          top: 0,
          left: 0
        }
      };
      innerParent.children[siblingIndex] = stackView;

      const child = walker.firstChild();
      if (child) {
        node = child;
      } else {
        const next = walker.nextSibling();
        if (next) {
          node = next;
        } else {
          if (walker.parentNode()) {
            node = walker.nextSibling();
          } else {
            node = null;
          }
        }
      }
      if (!stackView.isRootLevelStack) {
        stackView.stackIndex = idx++;
        stackView.canMoveToSibling = this._canMoveToSibling(stackView);
        this.stacks.push(stackView);
      }
    }

    this.stacks.forEach((item, _, arr) => {
      item.canMoveToParent = this._canMoveToParent(item);
      item.nextStackView = this._setPrevNextTarget(item, arr);
    });
  }
  _canMoveToParent(stack) {
    const axis = this.parents[0].axis;
    const type = this.parents[0].type;

    const { canMoveToSibling, innerParent, innerParentIndex } = stack;
    const { outerParent } = innerParent;
    const result = {
      up: !canMoveToSibling.up && axis === 'vertical' && !outerParent.isLastNode,
      down: !canMoveToSibling.down && axis === 'vertical' && !outerParent.isFirstNode,
      left: !canMoveToSibling.left && axis === 'horizontal' && !outerParent.isLastNode,
      right: !canMoveToSibling.right && axis === 'horizontal' && !outerParent.isFirstNode
    };

    if (result.up) {
      result.up = { 
        from: stack.stackIndex
      };
      if (type === 'y') {
        result.up.draggable = outerParent.innerParent;
      }
      if (type === 'top') {
        result.up.draggable = outerParent;
      }
      const nextParent = this.parents[innerParentIndex + 1];
      if (nextParent.axis === axis) {
        result.up.to = nextParent.children[0].stackIndex;
      } else {
        result.up.changeableTo = nextParent.children[0].stackIndex;
        // 도착지가 다른 축인 경우
        // - vertical -> horizontal
      }
    }
    if (result.left) {
      result.left = { 
        from: stack.stackIndex
      };
      if (type === 'x') {
        result.left.draggable = outerParent.innerParent;
      }
      if (type === 'left') {
        result.left.draggable = outerParent;
      }
      const nextParent = this.parents[innerParentIndex + 1];
      if (nextParent.axis === axis) {
        result.left.to = nextParent.children[0].stackIndex;
      } else {
        // 도착지가 다른 축인 경우
        // - horizontal -> vertical
        result.left.changeableTo = nextParent.children[0].stackIndex;
      }
    }

    if (result.down) {
      result.down = { 
        from: stack.stackIndex
      };
      if (type === 'y') {
        result.down.draggable = outerParent.innerParent;
      }
      const nextParent = this.parents[innerParentIndex - 1];
      if (type === 'top') {
        const draggable = nextParent.outerParent;
        result.down.draggable = draggable;
      }
      if (nextParent.axis === axis) {
        result.down.to = nextParent.children[nextParent.children.length - 1].stackIndex;
      } else {
        // 도착지가 다른 축인 경우
        // - horizontal -> vertical
        result.down.changeableTo = nextParent.children[nextParent.children.length - 1].stackIndex;
      }
    }

    if (result.right) {
      result.right = { 
        from: stack.stackIndex
      };
      if (type === 'x') {
        result.right.draggable = outerParent.innerParent;
      }
      const nextParent = this.parents[innerParentIndex - 1];
      if (type === 'left') {
        const draggable = nextParent.outerParent;
        result.right.draggable = draggable;
      }
      if (nextParent.axis === axis) {
        result.right.to = nextParent.children[nextParent.children.length - 1].stackIndex;
      } else {
        // 도착지가 다른 축인 경우
        // - vertical -> horizontal
        result.right.changeableTo = nextParent.children[nextParent.children.length - 1].stackIndex;
      }
    }

    return result;
  }
  _canMoveToSibling(stack) {
    const axis = stack.innerParent.axis;
    const type = stack.innerParent.type;
    const result = {
      up: axis === 'vertical' && !stack.isLastNode,
      down: axis === 'vertical' && !stack.isFirstNode,
      left: axis === 'horizontal' && !stack.isLastNode,
      right: axis === 'horizontal' && !stack.isFirstNode,
    };
    if (result.up) {
      result.up = { 
        from: stack.stackIndex, to: stack.stackIndex + 1
      };
      if (type === 'y') {
        result.up.draggable = stack.innerParent;
      }
      if (type === 'top') {
        result.up.draggable = stack;
      }
    }
    if (result.left) {
      result.left = { from: stack.stackIndex, to: stack.stackIndex + 1 };
      if (type === 'x') {
        result.left.draggable = stack.innerParent;
      }
      if (type === 'left') {
        result.left.draggable = stack;
      }
    }

    if (result.down) {
      result.down = { from: stack.stackIndex, to: stack.stackIndex - 1 };
      if (type === 'y') {
        result.down.draggable = stack.innerParent;
      }
      if (type === 'top') {
        result.down.draggable = this.stacks[stack.stackIndex - 1];
      }
    }
    if (result.right) {
      result.right = { from: stack.stackIndex, to: stack.stackIndex - 1 };
      if (type === 'x') {
        result.right.draggable = stack.innerParent;
      }
      if (type === 'left') {
        result.right.draggable = this.stacks[stack.stackIndex - 1];
      }
    }
    return result;
  }
 
  // 결정론적 - stack 의 타입에 따라 이미 draggable element 를 결정
  // issue : index 3 일때 up 이 셋팅되지 않음
  _setPrevNextTarget(stackView) {
    // console.log('_setPrevNextTarget stackIndex', stackView);
    if (stackView.stackIndex === 3) {
      // debugger;
    }
    const {
      stackIndex,
      siblingIndex,
      type,
      axis,
      isRootLevel,
      isFirstNode,
      isLastNode,
      innerParent,
      children
    } = stackView;
    const targetToDrag = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    stackView.results = {
      up: null,
      down: null,
      left: null,
      right: null
    };

    if (isRootLevel) {
      // Request event type : panup or pandown
      // TransformY 값 변경시
      if (type === 'y') {
        if (!isLastNode) {
          targetToDrag.up = innerParent;
        }
        if (!isFirstNode) {
          targetToDrag.down = innerParent;
        }
      }

      if (type === 'x') {
        if (!isLastNode) {
          targetToDrag.left = innerParent;
        }
        if (!isFirstNode) {
          targetToDrag.right = innerParent;
        }
      }

      // top 값 변경시
      if (type === 'top') {
        if (!isLastNode) {
          targetToDrag.up = children[siblingIndex];
        }
        if (!isFirstNode) {
          targetToDrag.down = children[siblingIndex - 1];
        }
      }

      // left 값 변경시
      if (type === 'left') {
        if (!isLastNode) {
          targetToDrag.left = children[siblingIndex];
        }
        if (!isFirstNode) {
          targetToDrag.right = children[siblingIndex - 1];
        }
      }
    } else {
      // **Root level 스택뷰가 아닌 경우**
      const outerParent = innerParent.outerParent;

      if (axis === 'vertical') {
        // todo - results
        // **경계면 이동시 처리**
        if (!outerParent.isLastNode) {
          if (outerParent.type === 'left') {
            targetToDrag.left = outerParent.children[outerParent.siblingIndex];
          }
          if (outerParent.type === 'x') {
            targetToDrag.left = outerParent.innerParent;
          }
        }

        // todo - results
        // **경계면 이동시 처리**
        if (!outerParent.isFirstNode) {
          if (outerParent.type === 'left') {
            targetToDrag.right =
              outerParent.children[outerParent.siblingIndex - 1];
          }
          if (outerParent.type === 'x') {
            targetToDrag.right = outerParent.innerParent;
          }
        }
      }

      if (type === 'y') {
        // Request event
        // axis === 'vertical' && type === 'y'
        if (!isLastNode) {
          // 형제간 이동시 - 형제 노드들중 마지막 노드가 아닌 경우
          targetToDrag.up = innerParent;
          // targetToDrag.result.up = [fromIndex, toIndex]
          stackView.results.up = {
            type,
            from: stackIndex,
            to: stackIndex + 1
          };
        } else {
          // **경계면 이동시 처리**
          // 마지막 노드인 경우
          // axis === 'vertical' && type === 'y'
          if (!outerParent.isLastNode) {
            if (outerParent.type === 'top') {
              targetToDrag.up = outerParent.children[outerParent.siblingIndex];
            }
            if (outerParent.type === 'y') {
              targetToDrag.up = outerParent.innerParent;
            }
          }
        }

        // axis === 'vertical' && type === 'y'
        if (!isFirstNode) {
          // 형제간 이동시 - 형제 노드들중 첫번째 노드가 아닌 경우
          targetToDrag.down = innerParent;
          // targetToDrag.result.down = [fromIndex, toIndex]
          stackView.results.down = {
            type,
            from: stackIndex,
            to: stackIndex - 1
          };
        } else {
          // **경계면 이동시 처리**
          // 첫번째 노드인 경우
          // axis === 'vertical' && type === 'y'
          // 최상위 엘리먼트가 첫번째 노드가 아닌 경우
          if (!outerParent.isFirstNode) {
            if (outerParent.type === 'top') {
              targetToDrag.down =
                outerParent.children[outerParent.siblingIndex - 1];
            }
            if (outerParent.type === 'y') {
              targetToDrag.down = outerParent.innerParent;
            }
          }
        }
      }
      if (type === 'top') {
        // Request event
        // axis === 'vertical' && type === 'top'
        if (!isLastNode) {
          // 형제간 이동시 - 형제 노드들 중 마지막 노드가 아닌 경우
          // up 이벤트 발생할 경우 top 값을 -clientHeight 만큼 변경 시킴
          targetToDrag.up = children[siblingIndex];

          // 핵심!
          // targetToDrag.result.up = [fromIndex, toIndex]
          stackView.results.up = {
            type,
            from: stackIndex,
            to: stackIndex + 1
          };
        } else {
          // 형제 노드들중 마지막 노드인 경우
          // axis === 'vertical' && type === 'top'
          // 경계면 이동시 처리
          if (!outerParent.isLastNode) {
            if (outerParent.type === 'top') {
              targetToDrag.up = outerParent.children[outerParent.siblingIndex];
            }
            if (outerParent.type === 'y') {
              targetToDrag.up = outerParent.innerParent;
            }
          }
        }

        if (!isFirstNode) {
          // 형제간 이동시 - 형제 노드들 중 첫 노드가 아닌 경우
          // down 이벤트 발생할 경우 현재 stackView의 -1 전 형제 노드의 top값을 0으로 변경
          targetToDrag.down = children[siblingIndex - 1];
          // targetToDrag.result.down = [fromIndex, toIndex]

          stackView.results.down = {
            type,
            from: stackIndex,
            to: stackIndex - 1
          };
        } else {
          // **경계면 이동시 처리**
          // 형제 노드들 중 첫 노드인 경우
          // StackView axis === 'vertical' && type === 'top'
          if (!outerParent.isFirstNode) {
            if (outerParent.type === 'top') {
              targetToDrag.down =
                outerParent.children[outerParent.siblingIndex - 1];
            }
            if (outerParent.type === 'y') {
              targetToDrag.down = outerParent.innerParent;
            }
          }
        }
      }

      if (axis === 'horizontal') {
        // **경계면 이동시 처리**
        // StackView axis === 'horizontal'
        if (outerParent.type === 'top') {
          // 최상위 엘리먼트가 마지막 노드가 아닌 경우
          if (!outerParent.isLastNode) {
            targetToDrag.up = outerParent.children[outerParent.siblingIndex];
          }
          // 최상위 엘리먼트가 첫번째 노드가 아닌 경우
          if (!outerParent.isFirstNode) {
            targetToDrag.down =
              outerParent.children[outerParent.siblingIndex - 1];
          }
        }
        // **경계면 이동시 처리**
        if (outerParent.type === 'y') {
          targetToDrag.up = outerParent.innerParent;
          targetToDrag.down = outerParent.innerParent;
        }
      }

      if (type === 'x') {
        // Request event
        // StackView axis === 'horizontal'
        // Stack type === 'x'
        if (!isLastNode) {
          // 형제간 이동시 - 형제 노드들 중 마지막 노드가 아닌 경우
          targetToDrag.left = innerParent;
          // 핵심!
          // targetToDrag.result.up = [fromIndex, toIndex]
          stackView.results.left = {
            type,
            from: stackIndex,
            to: stackIndex + 1
          };
        } else {
          // **경계면 이동시 처리**
          // 형제 노드들 중 마지막 노드인 경우
          // StackView axis === 'horizontal'
          if (!outerParent.isLastNode) {
            if (outerParent.type === 'left') {
              targetToDrag.left =
                outerParent.children[outerParent.siblingIndex];
            }
            if (outerParent.type === 'x') {
              targetToDrag.left = outerParent.innerParent;
            }
          }
        }

        // Request event
        // StackView axis === 'horizontal'
        // Stack type === 'x'
        if (!isFirstNode) {
          // 형제간 이동시 - 형제 노드들 중 첫번째 노드가 아닌 경우
          targetToDrag.right = innerParent;
          stackView.results.right = {
            type,
            from: stackIndex,
            to: stackIndex - 1
          };
        } else {
          // **경계면 이동시 처리**
          // 형제 노드들 중 첫번째 노드인 경우
          // StackView axis === 'horizontal'
          if (!outerParent.isFirstNode) {
            if (outerParent.type === 'left') {
              targetToDrag.right =
                outerParent.children[outerParent.siblingIndex - 1];
            }
            if (outerParent.type === 'x') {
              targetToDrag.right = outerParent.innerParent;
            }
          }
        }
      }

      if (type === 'left') {
        // Request event
        // StackView axis === 'horizontal'
        // Stack type === 'left'
        if (!isLastNode) {
          // 형제간 이동시 - 형제 노드들 중 마지막 노드가 아닌 경우
          targetToDrag.left = children[siblingIndex];
          stackView.results.left = {
            type,
            from: stackIndex,
            to: stackIndex + 1
          };
        } else {
          // **경계면 이동시 처리**
          // 형제 노드들 중 마지막 노드인 경우
          // StackView axis === 'horizontal'
          // Stack type === 'left'
          if (!outerParent.isLastNode) {
            if (outerParent.type === 'left') {
              targetToDrag.left =
                outerParent.children[outerParent.siblingIndex];
            }
            if (outerParent.type === 'x') {
              targetToDrag.left = outerParent.innerParent;
            }
          }
        }

        // Request event
        // StackView axis === 'horizontal'
        // Stack type === 'left'
        if (!isFirstNode) {
          // 형제간 이동시 - 형제 노드들 중 첫번째 노드가 아닌 경우
          targetToDrag.right = children[siblingIndex - 1];
          stackView.results.right = {
            type,
            from: stackIndex,
            to: stackIndex - 1
          };
        } else {
          // **경계면 이동시 처리**
          // 형제 노드들 중 첫번째 노드인 경우
          // StackView axis === 'horizontal'
          // Stack type === 'left'
          if (!outerParent.isFirstNode) {
            if (outerParent.type === 'left') {
              targetToDrag.right =
                outerParent.children[outerParent.siblingIndex - 1];
            }
            if (outerParent.type === 'x') {
              targetToDrag.right = outerParent.innerParent;
            }
          }
        }
      }
    }
    return targetToDrag;
  }
  debug() {
    this.stacks.forEach(el => {
      const color = FullpageSwiper.getRandomColor();
      el.node.style.backgroundColor = color;
    });
    // eslint-disable-next-line no-console
    console.log('STACK_PARENTS: ', this.parents);
    // eslint-disable-next-line no-console
    console.log('STACK_VIEW: ', this.stacks);
    window.fps = this;
  }
}
