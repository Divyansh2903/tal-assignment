# NOTES

## Trade-offs & Decisions

- **Home open state**: Used an inline tooltip expansion instead of `bottom-sheet` for the question detail as it matched the Figma design more closely and felt more natural for the game-like path UI.
- **Bottom nav**: Custom-built instead of using React Navigation's default tab bar, to match the Figma's floating pill design with the Store button breakout.
- **SVG for neumorphic shine**: Used `react-native-svg` Path overlays for the card highlights to replicate the Figma shine effect as it keeps it resolution-independent and avoids extra image assets, though the result isn't a perfect 1:1 match.
- **Level path layout**: Used a manual array with `marginLeft` offsets as shown in the Figma file, rather than a dynamic snake algorithm, pragmatic for 8 fixed cards and avoids over-engineering.
- **Country picker**: Used `@shopify/flash-list` inside a Modal instead of a third-party picker library as FlashList is faster than FlatList, and building it from scratch stays consistent with the project's approach.
- **Extended color palette**: Created `src/constants/app-colors.ts` alongside the provided theme to house Figma-specific color tokens. The original `src/theme/` files remain unmodified as the single source of truth, and `app-colors` extends them for screen-specific needs.
- **Feature-based folder structure**: This is my default approach for Mobile projects as it keeps screens, components, and data co-located by feature, making navigation and ownership clear.

## Bonus Features Implemented

- **Haptic feedback**: Added `expo-haptics` on all button presses, tab switches, and level card taps (`ImpactFeedbackStyle.Light` / `.Medium`).
- **Accessibility**: Added `accessibilityLabel` and `accessibilityRole` to all interactive elements, and `accessible={false}` on decorative images/icons to prevent TalkBack from reading them. This was a new learning for me — testing with TalkBack on Android revealed issues like bare numbers being misread ("8" as "8mil") and icon names being announced, which taught me the importance of hiding decorative elements and writing meaningful labels.
- **Skeleton loading**: Built a reusable `Skeleton` component with animated opacity pulse; applied to the Session Result screen with a `SessionResultSkeleton` layout.
- **Smooth transitions**: Configured screen transitions via React Navigation — `slide_from_right` for auth flow, `fade` for main/splash, `slide_from_bottom` for session result.

## What I'd Improve With More Time

- Clean up the overall structure further, analyse and extract more common code into shared files to improve DRY compliance across features.
- Make the UI throughout more consistent (spacing, typography, shadows) with a stricter design-token system.
- Implement a backend for auth (OTP verification) and the AI analysis/completion flow, would be a great way to learn.
- Make the audio player in Key Moments functional with `expo-av`.
- Add the Store tab screen (currently a placeholder since Figma has no detailed design for it).
- Add pull-to-refresh and empty state handling.

## Assumptions

- The Figma "Store" tab has no detailed screen design, so it is left as a placeholder.
- OTP is 6 digits (Figma shows 6 input boxes). This can be changed easily via the `OTP_LENGTH` constant.
- Phone number input is restricted to 10 digits; OTP input is restricted to numeric-only entry.
- Any phone number and OTP combination works — verification is mocked with local state as stated in the README.
- Used local asset images for company logos where available, with remote URLs in mock JSON as a fallback.
- The practice set card on the Home screen is static (not expandable/collapsible) since the Figma does not show a collapsed state.
