/**
 * Centralized Asset Registry
 *
 * All require() calls for static assets live here.
 * Components import from @/constants/assets. 
 */

export const assets = {
  icons: {
    cancel: require("../../assets/icons/cancel-btn.png"),
    diamond: require("../../assets/icons/diamond-icon.png"),
    home: require("../../assets/icons/home.png"),
    settings: require("../../assets/icons/settings.png"),
    store: require("../../assets/icons/store.png"),
  },
  images: {
    body: require("../../assets/images/body.png"),
    boyGif: require("../../assets/images/boy-gif.gif"),
    girlGif: require("../../assets/images/girl-gif.gif"),
    happyGirl: require("../../assets/images/happy-girl.png"),
    containerVideo: require("../../assets/images/container-video.mp4"),
  },
  logos: {
    amazon: require("../../assets/images/logos/amazon.png"),
    google: require("../../assets/images/logos/google.png"),
    microsoft: require("../../assets/images/logos/microsoft.png"),
    swiggy: require("../../assets/images/logos/swiggy.png"),
    phonepe: require("../../assets/icons/phonepay.png"),
  },
} as const;
