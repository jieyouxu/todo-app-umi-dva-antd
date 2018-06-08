import React from 'react';
import {connect} from 'dva';
import styles from './index.css';
import picture
  from '../assets/19a1ae01496879355ad638e2e73e4de8f15b9340d048bdef4d2c61adb207a063_1.jpg';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>
        {'{Math.random() < 0.5 ? \'Hello World\' : \'Goodbye World\'} => '}
        {Math.random() < 0.5 ? 'Hello World' : 'Goodbye World'}
      </h1>
      <div>
        <img
          src={picture}
        />
      </div>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
