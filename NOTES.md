# NOTES

## Trade-offs & Decisions

- **Home open state**: Used an inline tooltip expansion instead of `bottom-sheet` for the question detail as it matched the Figma design more closely and felt more natural for the game-like path UI.
- **Bottom nav**: Custom-built instead of using React Navigation's default tab bar, to match the Figma's floating pill design with the Store button breakout.
- **SVG for neumorphic shine**: Used `react-native-svg` Path overlays for the card highlights to replicate the Figma shine effect as it keeps it resolution-independent and avoids extra image assets, though the result isn't a perfect 1:1 match.
- **Level path layout**: Used a manual array with `marginLeft` offsets as shown in the Figma file, rather than a dynamic snake algorithm, pragmatic for 8 fixed cards and avoids over-engineering.
- **Home scroll path vs FlashList**: The README asks for `@shopify/flash-list` (not `FlatList`) for scrollable lists. The Home “question path” is implemented with a `ScrollView` around eight fixed cards, a `MilestoneDivider` between sections, and an inline detail state on the first card that changes row height (tooltip). `@shopify/flash-list` is already used where long lists matter: the country picker modal and the Session Result tabs (Smart Summary + Key Moments). Moving the Home path to FlashList would be a moderate refactor (mixed row types, `estimatedItemSize`, `extraData` when the tooltip opens, z-index and tap testing) for little performance gain on a tiny, fixed list. I prioritized shipping a stable layout; with more time I could port this screen to FlashList if strict alignment with the letter of the README is required.
- **Country picker**: Used `@shopify/flash-list` inside a Modal instead of a third-party picker library as FlashList is faster than FlatList, and building it from scratch stays consistent with the project's approach.
- **Extended color palette**: Created `src/constants/app-colors.ts` alongside the provided theme to house Figma-specific color tokens. The original `src/theme/` files remain unmodified as the single source of truth, and `app-colors` extends them for screen-specific needs.
- **Feature-based folder structure**: This is my default approach for Mobile projects as it keeps screens, components, and data co-located by feature, making navigation and ownership clear.
- **Haptics (attempted)**: I wired `expo-haptics` behind a small `triggerHaptic` helper (`src/utils/haptics.ts`) and called it from primary buttons, the bottom tab bar, level cards, and session result actions. I was not able to get reliable, noticeable haptic feedback in my local testing environment (custom dev client / emulator vs device quirks), so I do not treat this as a completed bonus. With a bit more time I would validate on a physical device, adjust Android vs iOS APIs if needed, and extend coverage consistently, the integration pattern is straightforward once the native layer behaves as expected.

## Bonus Features Implemented

- **Accessibility**: Added `accessibilityLabel` and `accessibilityRole` to all interactive elements, and `accessible={false}` on decorative images/icons to prevent TalkBack from reading them. This was a new learning for me, testing with TalkBack on Android revealed issues like bare numbers being misread ("8" as "8mil") and icon names being announced.
- **Skeleton loading**: Built a reusable `Skeleton` component with animated opacity pulse; applied to the Session Result screen with a `SessionResultSkeleton` layout.
- **Smooth transitions**: Configured screen transitions via React Navigation,  `slide_from_right` for auth flow, `fade` for main/splash, `slide_from_bottom` for session result.

## What I'd Improve With More Time

- Finish and verify **haptic feedback** end-to-end (see trade-off above).
- Optionally refactor the Home level path to **FlashList** for strict README compliance (see “Home scroll path vs FlashList” above).
- Clean up the overall structure further, analyse and extract more common code into shared files to improve DRY compliance across features.
- Make the UI throughout more consistent (spacing, typography, shadows) with a stricter design-token system.
- Improve **responsiveness** across device sizes (e.g. small vs large phones, font scaling, safe areas) so layouts stay balanced beyond the single Figma reference; the assignment targets portrait phone, but I would spend more time testing and tuning breakpoints and flexible layouts if the timeline allowed.
- Implement a backend for auth (OTP verification) and the AI analysis/completion flow, would be a great way to learn.
- Make the audio player in Key Moments functional with `expo-av`.
- Add the Store tab screen (currently a placeholder since Figma has no detailed design for it).
- Add pull-to-refresh and empty state handling.

## Assumptions

- The Figma "Store" tab has no detailed screen design, so it is left as a placeholder.
- OTP uses 6 input boxes to match the Figma; the README text mentions 4 digits, but the design shows six fields, implemented as 6 via `OTP_LENGTH`.
- Phone number input is restricted to 10 digits; OTP input is restricted to numeric-only entry.
- Any phone number and OTP combination works - verification is mocked with local state as stated in the README.
- Used local asset images for company logos where available, with remote URLs in mock JSON as a fallback.
- The practice set card on the Home screen is static (not expandable/collapsible) since the Figma does not show a collapsed state.
