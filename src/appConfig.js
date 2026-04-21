export const CAMERA_CONFIG = {
  position: [2, 0, 10],
  zoom: 100,
  near: 0.1,
  far: 1000
};

export const LIGHTS_CONFIG = {
  ambient: {
    intensity: 0.2,
    color: "#1a1a1a"
  },
  point: {
    position: [-1, 0, 5],
    intensity: 2.5,
    color: "#ff6600",
    distance: 20,
    decay: 2
  }
};

export const POST_PROCESSING_CONFIG = {
  pixelation: {
    granularity: 5
  },
  vignette: {
    offset: 0.4,
    darkness: 0.7
  }
};
