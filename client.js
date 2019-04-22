// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, ReactNativeContext, Module, Location, Surface } from 'react-360-web';
import KeyboardModule from 'react-360-keyboard/KeyboardModule';
import SimpleRaycaster from 'simple-raycaster';
import Annyang from './speech/annyang';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    cursorVisibility: 'visible',
    nativeModules: [
      KeyboardModule.addModule,
      ctx => new Annyang(ctx)
    ],
    ...options,
  });

  const s = r360.getDefaultSurface()
  s.setShape(Surface.SurfaceShape.Cylinder)
  s.resize(4096, 720)

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('VR', { /* initial props */ }),
    s
  );

  // r360.renderToLocation(
  //   r360.createRoot('Boat', { /* initial props */ }),
  //   r360.getDefaultLocation(),
  // );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
  r360.controls.clearRaycasters();
  r360.controls.addRaycaster(SimpleRaycaster);
  KeyboardModule.setInstance(r360);
}

window.React360 = { init };
