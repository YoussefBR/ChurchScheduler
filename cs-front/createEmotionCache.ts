import createCache from '@emotion/cache';

// Create an instance of Emotion's cache to handle SSR for MUI.
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
