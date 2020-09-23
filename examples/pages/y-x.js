import React from 'react';
import Head from 'next/head'

class YX extends React.Component {
  componentDidMount() {
    const FullpageSwiper = require('../../src/index').default;

    new FullpageSwiper('#fullpage', {
      debug: true, // debug mode - default false
      threshold: 10, // touch detection minimum value
      dragStart() {
        console.log('DRAG_START: callback');
      },
      dragMove(context) {
        const { snapshotPositions, stackMoveFromTo } = context
        // console.log('DRAG_MOVE: callback', snapshotPositions, stackMoveFromTo);
      },
      dragEnd(context) {
        // const { snapshotPositions, stackMoveFromTo } = context
        console.log('DRAG_END: callback', context.currentIdx);
      }
    });
  }

  render() {
    return (
    <div>
      <Head>
        <title>Y-X - Examples</title>
      </Head>
      <h2 style={{position: 'absolute', top: 0, right: 0, marginRight: 10}}>Y-X</h2>
      <div id="fullpage" data-stack-type="y">
        <section data-stack>
          <div data-stack-type="y">
            <div data-stack>Group 1 (Child - Top-Down 1)</div>
            <div data-stack>Group 1 (Child - Top-Down 2)</div>
            <div data-stack>Group 1 (Child - Top-Down 3)</div>
          </div>
        </section>
        <section data-stack>
          <div data-stack-type="x">
            <div data-stack>Group 2 (Child - Left-Right 1)</div>
            <div data-stack>Group 2 (Child - Left-Right 2)</div>
            <div data-stack>Group 2 (Child - Left-Right 3)</div>
          </div>
        </section>
        <section data-stack>
          <div data-stack-type="y">
            <div data-stack>Group 3 (Child - Top-Down 1)</div>
          </div>
        </section>
      </div>
    </div>
    )
  }
}

export default YX