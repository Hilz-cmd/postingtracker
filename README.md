# US States Video (Remotion)

Vertical 1080x1920 video listing all 50 US states (alphabetical) with their capitals.
About 1 second per state, plus a 2s intro and 2s outro (~54s total).

## Render on GitHub
1. Push this folder to a GitHub repo (branch `main`).
2. Open the **Actions** tab. The "Render video" workflow runs on every push, or click **Run workflow**.
3. When it finishes, open the run and download `us-states-video` under **Artifacts**.

## Run locally (optional)
```
npm install
npm run dev      # preview in Remotion Studio
npm run render   # writes out/us-states.mp4
```

## Edit
- States and capitals: `src/states.ts`
- Design and animation: `src/StatesVideo.tsx`
- Speed: `FRAMES_PER_STATE` in `src/constants.ts` (30 = 1 second)
