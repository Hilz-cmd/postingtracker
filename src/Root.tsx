import React from 'react';
import {Composition} from 'remotion';
import {StatesVideo} from './StatesVideo';
import {FPS, TOTAL_FRAMES} from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="StatesVideo"
      component={StatesVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
