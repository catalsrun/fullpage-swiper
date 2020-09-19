import Hammer from 'hammerjs';
import gsap from 'gsap';

export default class Fullpage {
  static getViewport() {
    return {
      // webview issue - undefined : window.innerWidth, window.innerHeight
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight
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
      console.error('Fullpage initialization error');
      return;
    }
    this.containerAxis =
      this.containerType === 'top' ||
        this.containerType === 'y' ? 'vertical' : 'horizontal';

    this.options = Object.assign({ debug: false }, options);

    this.parents = [];
    this.stacks = [];
    this.hammers = [];

    this.currentIdx = 0;
    this.eventType = {
      axis: '',
      direction: '',
    };
    this.dragging = false;
    this.draggingRef = null;

    this.viewport = Fullpage.getViewport();

    this.setStacks();
    this.setCommonLayout();
    this.setLayout();

    // const config = this.options.parentsConfig[parent.id] || {}
    this._addEvents();

    this.options.debug && this.debug();
  }
  removeListeners() {

  }
  getDragTarget(evtTarget) {
    let target = this.draggingRef;
    if (!target) {
      target = this.stacks.find((child) => child.node === evtTarget);
    }
    return target;
  }
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
  _panstart(e) {
    this.isDragging = true;
    const target = this.stacks.find((child) => child.node === e.target);
    // console.log('START: start', !!target);
    if (!target) {
      this.isDragging = false;
      return;
    }
    this.options.dragStart(this, target);
    // Utils.safeCall(config.dragStart);
  }
  _panleft(e) {
    const eventType = {
      axis: 'horizontal',
      direction: 'left'
    };
    if (this._blockEvent(eventType)) return;
    // console.log('START:', eventType.direction);
    if (!this.draggingRef) {
      const eventTarget = this._getTargetInfo(e.target);
      if (eventTarget) {
        this.draggingRef = eventTarget.nextStackView[eventType.direction];
        this.eventType.target = eventTarget;
      }
    }
    if (!this.draggingRef) {
      this._resetDrag();
    } else {

      // 드로잉 지점
      this._dragging(this.draggingRef, e);
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
      const eventTarget = this._getTargetInfo(e.target);
      if (eventTarget) {
        this.draggingRef = eventTarget.nextStackView[eventType.direction];
        this.eventType.target = eventTarget;
      }
    }
    if (!this.draggingRef) {
      this._resetDrag();
    } else {

      // 드로잉 지점
      this._dragging(this.draggingRef, e);
    }
  }
  _pandown(e) {
    const eventType = {
      axis: 'vertical',
      direction: 'down'
    };
    if (this._blockEvent(eventType)) return;
    if (!this.draggingRef) {
      const eventTarget = this._getTargetInfo(e.target);
      if (eventTarget) {
        this.draggingRef = eventTarget.nextStackView[eventType.direction];
        this.eventType.target = eventTarget;
      }
    }
    // console.log('START:', eventType.direction, this.draggingRef);

    if (!this.draggingRef) {
      this._resetDrag();
    } else {

      // 드로잉 지점
      this._dragging(this.draggingRef, e);
    }
  }
  _panup(e) {
    const eventType = {
      axis: 'vertical',
      direction: 'up'
    };
    if (this._blockEvent(eventType)) return;
    // console.log('START:', eventType.direction);

    if (!this.draggingRef) {
      const eventTarget = this._getTargetInfo(e.target);
      if (eventTarget) {
        this.draggingRef = eventTarget.nextStackView[eventType.direction];
        this.eventType.target = eventTarget;
      }
    }
    if (!this.draggingRef) {
      this._resetDrag();
    } else {

      // 드로잉 지점
      this._dragging(this.draggingRef, e);
    }
  }
  _endCallback() {
    const { toParent, to } = this.stackMoveFromTo;
    if (toParent && to) toParent.lastSeenIndex = to;
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
      const t = gsap.timeline();

      if (type === 'top') {
        if (direction === 'up') {
          t.to(draggingRef.node, { top: -clientHeight })
            .add(() => {
              draggingRef.positions.top = -clientHeight;
              this._endCallback();
            });
        }
        if (direction === 'down') {
          t.to(draggingRef.node, { top: 0 })
            .add(() => {
              draggingRef.positions.top = 0;
              this._endCallback();
            });
        }
      }
      if (type === 'left') {
        if (this.eventType.direction === 'left') {
          t.to(draggingRef.node, { left: -clientWidth })
            .add(() => {
              draggingRef.positions.left = -clientWidth;
              this._endCallback();
            });
        }
        if (this.eventType.direction === 'right') {
          t.to(draggingRef.node, { left: 0 })
            .add(() => {
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
          }
          t.to(draggingRef.node, { y: move })
              .add(() => {
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
          }
          
          t.to(draggingRef.node, { y: move })
            .add(() => {
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
          }
          t.to(draggingRef.node, { x: move })
            .add(() => {
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
          }
          t.to(draggingRef.node, { x: move })
            .add(() => {
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
  _dragging(target, e) {
    const { type } = target;
    const { clientHeight, clientWidth } = this.viewport;

    this.snapshotPositions = {
      top: 0,
      left: 0,
      x: 0,
      y: 0,
    };
    const positions = this.snapshotPositions;
    let posY, posX;
    if (type === 'y') {
      posY = e.deltaY + target.positions.y;

      if (posY >= 0) {
        target.positions.y = 0;
        target.node.style.transform = 'translate3d(0px, 0px, 0px)';
        // change dragging target
        const stackView = this.stacks.find((el) => el.node === e.target);
        this.draggingRef = stackView[this.eventType.direction];
        return;
      }

      const max = -clientHeight * (target.children.length - 1);
      if (posY <= max) {
        target.positions.y = max;
        target.node.style.transform = `translate3d(0px, ${max}px, 0px)`;
        // change dragging target
        const stackView = this.stacks.find((el) => el.node === e.target);
        this.draggingRef = stackView[this.eventType.direction];
        return;
      }

      // 실제 그려짐
      positions.y = posY;
      gsap.set(target.node, { y: posY });
    }
    if (type === 'x') {
      posX = e.deltaX + target.positions.x;
      if (posX >= 0) {
        target.positions.x = 0;
        target.node.style.transform = 'translate3d(0px, 0px, 0px)';
        // change dragging target
        const stackView = this.stacks.find((el) => el.node === e.target);
        this.draggingRef = stackView[this.eventType.direction];
        return;
      }
      const max = -clientWidth * (target.children.length - 1);
      if (posX <= max) {
        target.positions.x = max;
        target.node.style.transform = `translate3d(${max}px, 0px, 0px)`;
        // change dragging target
        const stackView = this.stacks.find((el) => el.node === e.target);
        this.draggingRef = stackView[this.eventType.direction];
        return;
      }
      positions.x = posX;
      gsap.set(target.node, { x: posX });
    }
    if (type === 'top') {
      posY = e.deltaY + target.positions.top;
      if (posY >= 0) {
        target.positions.top = 0;
        target.node.style.top = 0 + 'px';
        // change dragging target
        const stackView = this.stacks.find((el) => el.node === e.target);
        this.draggingRef = stackView[this.eventType.direction];
        return;
      }
      if (posY <= -clientHeight) {
        target.positions.top = -clientHeight;
        target.node.style.top = -clientHeight + 'px';
        // change dragging target
        const stackView = this.stacks.find((el) => el.node === e.target);
        this.draggingRef = stackView[this.eventType.direction];
        return;
      }

      positions.top = posY;
      gsap.set(target.node, { top: posY });
    }

    if (type === 'left') {
      posX = target.positions.left + e.deltaX;
      if (posX >= 0) {
        target.positions.left = 0;
        target.node.style.left = 0 + 'px';
        // change dragging target
        const stackView = this.stacks.find((el) => el.node === e.target);
        this.draggingRef = stackView[this.eventType.direction];
        return;
      }
      if (posX <= -clientHeight) {
        target.positions.left = -clientWidth;
        target.node.style.left = -clientWidth + 'px';
        // change dragging target
        const stackView = this.stacks.find((el) => el.node === e.target);
        this.draggingRef = stackView[this.eventType.direction];
        return;
      }

      positions.left = posX;
      gsap.set(target.node, { left: posX });
    }

    this.stackMoveFromTo = this._getStackMoveFromTo();
    this.options.dragMove(this);
    // top 의 경우시
    // siblingIndex 0, posY 0, -1, -2, ... -> end Event 시 -667
    // siblingIndex 0 값은 점점 hide, sliblingindex 1값은 하단 부터 점점 노출
  }
  _getStackMoveFromTo() {
    // 경계면 이동간의 드래그되는 엘리먼트는 
    // 최상위 엘리먼트 data-stack 또는 최상위 data-stack-type
    const direction = this.eventType.direction;
    const eventAxis = this.eventType.axis;
    const eventTarget = this.eventType.target;
    const { stackIndex, isFirstNode, isLastNode } = eventTarget;
    const result = {
      direction: direction,
      type: this.draggingRef.type,
      from: null,
      to: null,
      toParent: null,
      isTopLevelMove: false
    };
    // 모든 이벤트 타켓 node는 currentParent 값이 존재
    // 여기에 lastSeenIndex 값 저장
    const findIndex = this.parents.findIndex((el) => el.node === eventTarget.innerParent.node);
    const currentParent = this.parents[findIndex];
    const isSameDirection =
      (currentParent.axis === 'vertical' && direction === 'up') ||
      (currentParent.axis === 'horizontal' && direction === 'left');
    const isSameReverseDirection =
      (currentParent.axis === 'vertical' && direction === 'down') ||
      (currentParent.axis === 'horizontal' && direction === 'right');

    const canMoveNextParent = eventAxis === this.containerAxis;
    const canDirectMoveToParent = currentParent.axis !== eventAxis && canMoveNextParent;
    if (canDirectMoveToParent) {
      // 바로 경계면 이동
      result.from = stackIndex;
      if (direction === 'up' || direction === 'left') {
        const nextParent = this.parents[findIndex + 1];
        if (nextParent) {
          result.isTopLevelMove = true;
          if (nextParent.lastSeenIndex) {
            result.to = nextParent.lastSeenIndex;
            result.toParent = nextParent;
          } else {
            result.to = currentParent.children[currentParent.children.length - 1].stackIndex + 1;
            result.toParent = nextParent;
          }
        }
      }
      if (direction === 'down' || direction === 'right') {
        const nextParent = this.parents[findIndex - 1];
        if (nextParent) {
          result.isTopLevelMove = true;
          if (nextParent.lastSeenIndex) {
            result.to = nextParent.lastSeenIndex;
            result.toParent = nextParent;
          } else {
            result.to = currentParent.children[0].stackIndex - 1;
            result.toParent = nextParent;
          }
        }
      }
    }

    if (isSameDirection) {
      result.from = stackIndex;
      if (!isLastNode) {
        result.to = stackIndex + 1;
        result.toParent = currentParent;
      } else {
        if (canMoveNextParent) {
          // debugger;
          const nextParent = this.parents[findIndex + 1];
          if (nextParent) {
            result.isTopLevelMove = true;
            if (nextParent.lastSeenIndex) {
              result.to = nextParent.lastSeenIndex;
              result.toParent = nextParent;
            } else {
              result.to = stackIndex + 1;
              result.toParent = nextParent;
            }
          }
        }
      }
    }

    if (isSameReverseDirection) {
      result.from = stackIndex;
      if (!isFirstNode) {
        result.to = stackIndex - 1;
        result.toParent = currentParent;
      } else {
        if (canMoveNextParent) {
          const nextParent = this.parents[findIndex - 1];
          if (nextParent) {
            result.isTopLevelMove = true;
            if (nextParent.lastSeenIndex) {
              result.to = nextParent.lastSeenIndex;
              result.toParent = nextParent;
            } else {
              result.to = stackIndex - 1;
              result.toParent = nextParent;
            }
          }
        }
      }
    }
    return result;
  }

  _getTargetInfo(ref) {
    return this.stacks.find((stack) => stack.node === ref);
  }
  _addEvents() {
    const mc = new Hammer(this.containerRef);
    // save mc instance for remove event listeners - mc.off();
    this.hammers.push(mc);
    mc.add(new Hammer.Pan({
      direction: Hammer.DIRECTION_ALL,
      threshold: this.options.threshold
    }));
    mc.on('panstart', this._panstart.bind(this));
    mc.on('panend', this._panend.bind(this));
    mc.on('panleft', this._panleft.bind(this));
    mc.on('panright', this._panright.bind(this));
    mc.on('pandown', this._pandown.bind(this));
    mc.on('panup', this._panup.bind(this));
  }
  setCommonLayout() {
    // block x,y scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.width = '100%';

    // required in samsung internet browser
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';
  }
  setLayout() {
    this.viewport = Fullpage.getViewport();
    // 부모 컨테이너 layout
    this.parents.forEach((parent) => {
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
    // console.log('_layoutX', el, children);
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
    // console.log('_layoutY', el, children);
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
      node.style.height = '100%';
      node.style.width = '100%';
      node.style.zIndex = (arr.length - idx) * 10;
    });
  }
  setStacks() {
    const filter = node => {
      const isStack = node && typeof node.getAttribute('data-stack') === 'string';
      // if (isStack) console.log('filtered node', node);
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

    this.parents = Array.from(document.querySelectorAll('[data-stack-type]'))
      .map((el) => {
        const type = el.getAttribute('data-stack-type');
        const direction = (type === 'top' || type === 'y') ? 'vertical' : 'horizontal';
        const children = Array.from(el.children).filter((el) => {
          return typeof el.getAttribute('data-stack') === 'string';
        });
        const parentNode = el === this.containerRef ? null : el.parentNode;
        return {
          type,
          axis: direction,
          node: el,
          children,
          outerParent: parentNode,
          positions: {
            x: 0,
            y: 0,
            top: 0,
            left: 0,
          },
        };
      });

    let node = walker.firstChild();
    while (node !== null) {
      const parentNode = node.parentNode;
      const type = parentNode.getAttribute('data-stack-type');
      const direction = (type === 'top' || type === 'y') ? 'vertical' : 'horizontal';
      const innerParent = this.parents.find((el) => el.node === parentNode);
      innerParent.isRoot = innerParent.node === this.containerRef;
      const index = innerParent.children.findIndex((el) => {
        return el === node;
      });
      const stackView = {
        type,
        axis: direction,
        node, // for e.target
        siblingIndex: index,
        innerParent,
        isRootLevel: innerParent.outerParent === null,
        children: innerParent.children,
        isFirstNode: node.previousElementSibling === null,
        isLastNode: node.nextElementSibling === null,
        positions: {
          x: 0,
          y: 0,
          top: 0,
          left: 0,
        },
      };
      innerParent.children[index] = stackView;

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

      this.stacks.push(stackView);
    }

    this.stacks = this.stacks.filter((item, _, arr) => {
      const idx = arr.findIndex((el) => {
        const outerParent = el.innerParent.outerParent;
        if (outerParent) return outerParent === item.node;
      });
      if (idx >= 0) {
        arr[idx].innerParent.outerParent = item;
        return false;
      }
      return true;
    }).map((item, idx, arr) => {
      // issue - innerParent.children[index] = stackView;
      // 동일한 객체를 바라보고 있으므로 mutation 으로 변경
      item.stackIndex = idx;
      item.nextStackView = this._setPrevNextTarget(item, arr);
      return item;
    });
    // console.log('parents', parents);
    // console.log('this.stacks', this.stacks);
  }

  // 결정론적 - stack 의 타입에 따라 이미 draggable element 를 결정
  _setPrevNextTarget(stackView) {
    // console.log('_setPrevNextTarget stackIndex', stackView);
    // if (stackView.stackIndex === 8) {
    //   debugger;
    // }
    const {
      stackIndex, siblingIndex,
      type, axis,
      isRootLevel, isFirstNode, isLastNode,
      innerParent,
      children,
    } = stackView;
    const targetToDrag = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    stackView.results = {
      up: null,
      down: null,
      left: null,
      right: null,
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
            targetToDrag.right = outerParent.children[outerParent.siblingIndex - 1];
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
            to: stackIndex + 1,
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
            to: stackIndex - 1,
          };
        } else {
          // **경계면 이동시 처리**
          // 첫번째 노드인 경우
          // axis === 'vertical' && type === 'y'
          // 최상위 엘리먼트가 첫번째 노드가 아닌 경우
          if (!outerParent.isFirstNode) {
            if (outerParent.type === 'top') {
              targetToDrag.down = outerParent.children[outerParent.siblingIndex - 1];
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
            to: stackIndex + 1,
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
            to: stackIndex - 1,
          };
        } else {
          // **경계면 이동시 처리**
          // 형제 노드들 중 첫 노드인 경우
          // StackView axis === 'vertical' && type === 'top'
          if (!outerParent.isFirstNode) {
            if (outerParent.type === 'top') {
              targetToDrag.down = outerParent.children[outerParent.siblingIndex - 1];
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
            targetToDrag.down = outerParent.children[outerParent.siblingIndex - 1];
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
            to: stackIndex + 1,
          };
        } else {
          // **경계면 이동시 처리**
          // 형제 노드들 중 마지막 노드인 경우
          // StackView axis === 'horizontal'
          if (!outerParent.isLastNode) {
            if (outerParent.type === 'left') {
              targetToDrag.left = outerParent.children[outerParent.siblingIndex];
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
            to: stackIndex - 1,
          };
        } else {
          // **경계면 이동시 처리**
          // 형제 노드들 중 첫번째 노드인 경우
          // StackView axis === 'horizontal'
          if (!outerParent.isFirstNode) {
            if (outerParent.type === 'left') {
              targetToDrag.right = outerParent.children[outerParent.siblingIndex - 1];
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
            to: stackIndex + 1,
          };
        } else {
          // **경계면 이동시 처리**
          // 형제 노드들 중 마지막 노드인 경우
          // StackView axis === 'horizontal'
          // Stack type === 'left'
          if (!outerParent.isLastNode) {
            if (outerParent.type === 'left') {
              targetToDrag.left = outerParent.children[outerParent.siblingIndex];
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
            to: stackIndex - 1,
          };
        } else {
          // **경계면 이동시 처리**
          // 형제 노드들 중 첫번째 노드인 경우
          // StackView axis === 'horizontal'
          // Stack type === 'left'
          if (!outerParent.isFirstNode) {
            if (outerParent.type === 'left') {
              targetToDrag.right = outerParent.children[outerParent.siblingIndex - 1];
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
      const color = Fullpage.getRandomColor();
      el.node.style.backgroundColor = color;
    });
    // eslint-disable-next-line no-console
    console.log('STACK_PARENTS: ', this.parents);
    // eslint-disable-next-line no-console
    console.log('STACK_VIEW: ', this.stacks);
    window.fps = this;
  }
}
