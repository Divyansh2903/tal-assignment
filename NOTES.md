# NOTES

## Trade-offs & Decisions

- **Home open state**: Used an inline tooltip expansion instead of `@gorhom/bottom-sheet` for the question detail — felt more natural for the game-like path UI and matched the Figma more closely.
- **Bottom nav**: Custom-built instead of using the tab navigator's default tab bar, to match the Figma's floating pill design with the Store button breakout.
- **SVG for neumorphic shine**: Used `react-native-svg` Path overlays for the card highlights instead of images — keeps it resolution-independent and avoids extra assets.
- **Level path layout**: Used a manual array with `marginLeft` offsets instead of a dynamic snake algorithm — pragmatic for 8 fixed cards, avoids over-engineering.
- **Country picker**: Used FlashList inside a Modal instead of a third-party picker library to stay consistent with the "build UI from scratch" requirement.
- **Extended color palette**: Created `src/constants/app-colors.ts` alongside the provided theme to house Figma-specific color tokens not covered by the base theme, while keeping the original `src/theme/` files unmodified.

## What I'd Improve With More Time

- Add `@gorhom/bottom-sheet` for the question detail (Home open state) as an alternative interaction pattern.
- Add haptic feedback on button presses with `expo-haptics`.
- Add `accessibilityLabel` and `accessibilityRole` to all interactive elements for screen reader support.
- Add skeleton/shimmer loading states for the Home screen.
- Add smooth screen transitions using `react-native-reanimated`.
- Make the audio player in Key Moments functional with `expo-av`.
- Add the Store tab screen (currently a placeholder).
- Add pull-to-refresh and empty state handling.

## Assumptions

- The Figma "Store" tab has no detailed screen design, so it is left as a placeholder.
- OTP is 6 digits (Figma shows 6 input boxes), though the README mentions 4 — went with the Figma as the single source of truth for UI.
- Any phone number and OTP combination works as stated in the README — verification is mocked with local state.
- Used local asset images for company logos where available, with remote URLs in mock JSON as a fallback.
- The practice set card on the Home screen is static (not expandable/collapsible) since the Figma does not show a collapsed state.
