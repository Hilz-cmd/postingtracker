import {STATES} from './states';

export const FPS = 30;
export const FRAMES_PER_STATE = 30; // 1 second per state
export const INTRO_FRAMES = 60; // 2 seconds
export const OUTRO_FRAMES = 60; // 2 seconds

export const TOTAL_FRAMES =
  INTRO_FRAMES + STATES.length * FRAMES_PER_STATE + OUTRO_FRAMES;
