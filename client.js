// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, ReactNativeContext, Module, Surface} from 'react-360-web';
import SimpleRaycaster from 'simple-raycaster'
import Annyang from './speech/annyang'

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    cursorVisibility: 'visible',
    nativeModules: [
      ctx => new Annyang(ctx)
    ],
    ...options,
  });

  const s = r360.getDefaultSurface()
  s.setShape(Surface.SurfaceShape.Cylinder)
  s.resize(4000, 1000)

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('VR', { /* initial props */ }),
    s
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
  r360.controls.clearRaycasters()
  r360.controls.addRaycaster(SimpleRaycaster)
}

window.React360 = {init};
