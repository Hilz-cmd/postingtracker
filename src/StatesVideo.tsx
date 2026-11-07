import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Poppins';
import {STATES} from './states';
import {
  FRAMES_PER_STATE,
  INTRO_FRAMES,
  OUTRO_FRAMES,
  TOTAL_FRAMES,
} from './constants';

const {fontFamily} = loadFont('normal', {weights: ['500', '700', '800']});

const baseStyle: React.CSSProperties = {
  fontFamily,
  color: 'white',
  textAlign: 'center',
};

const bgFor = (i: number) => {
  const hue = (i * 37) % 360;
  return `linear-gradient(160deg, hsl(${hue}, 70%, 38%) 0%, hsl(${(hue + 50) % 360}, 75%, 18%) 100%)`;
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12}});
  const sub = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  return (
    <AbsoluteFill
      style={{
        ...baseStyle,
        background: 'linear-gradient(160deg, #1d3a8a 0%, #0b1330 100%)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: 200,
          fontWeight: 800,
          lineHeight: 1.05,
          transform: `scale(${pop})`,
        }}
      >
        50 US
        <br />
        STATES
      </div>
      <div style={{fontSize: 52, fontWeight: 500, marginTop: 40, opacity: sub}}>
        and their capitals
      </div>
    </AbsoluteFill>
  );
};

const StateCard: React.FC<{index: number}> = ({index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = STATES[index];

  const pop = spring({frame, fps, config: {damping: 14, stiffness: 160}});
  const capitalIn = spring({
    frame: frame - 6,
    fps,
    config: {damping: 16},
  });
  const longestWord = Math.max(...s.name.split(' ').map((w) => w.length));
  const nameSize = Math.min(200, 960 / (longestWord * 0.66));

  return (
    <AbsoluteFill
      style={{
        ...baseStyle,
        background: bgFor(index),
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 60px',
      }}
    >
      <div style={{position: 'absolute', top: 140, fontSize: 56, fontWeight: 700, opacity: 0.85}}>
        {index + 1} / {STATES.length}
      </div>

      <div
        style={{
          fontSize: nameSize,
          fontWeight: 800,
          lineHeight: 1.05,
          transform: `scale(${pop})`,
        }}
      >
        {s.name}
      </div>

      <div
        style={{
          marginTop: 70,
          opacity: capitalIn,
          transform: `translateY(${(1 - capitalIn) * 40}px)`,
        }}
      >
        <div style={{fontSize: 44, fontWeight: 500, opacity: 0.8, letterSpacing: 6}}>
          CAPITAL
        </div>
        <div style={{fontSize: 90, fontWeight: 700, marginTop: 10}}>{s.capital}</div>
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12}});
  return (
    <AbsoluteFill
      style={{
        ...baseStyle,
        background: 'linear-gradient(160deg, #8a1d2b 0%, #1d3a8a 100%)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{fontSize: 150, fontWeight: 800, lineHeight: 1.1, transform: `scale(${pop})`}}>
        How many
        <br />
        did you
        <br />
        know?
      </div>
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const pct = (frame / (TOTAL_FRAMES - 1)) * 100;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: 14,
        width: `${pct}%`,
        background: 'white',
        opacity: 0.9,
      }}
    />
  );
};

export const StatesVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      <Sequence from={0} durationInFrames={INTRO_FRAMES}>
        <Intro />
      </Sequence>

      {STATES.map((_, i) => (
        <Sequence
          key={i}
          from={INTRO_FRAMES + i * FRAMES_PER_STATE}
          durationInFrames={FRAMES_PER_STATE}
        >
          <StateCard index={i} />
        </Sequence>
      ))}

      <Sequence
        from={INTRO_FRAMES + STATES.length * FRAMES_PER_STATE}
        durationInFrames={OUTRO_FRAMES}
      >
        <Outro />
      </Sequence>

      <ProgressBar />
    </AbsoluteFill>
  );
};
