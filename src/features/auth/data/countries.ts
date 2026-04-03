export interface Country {
  code: string;
  flag: string;
  name: string;
}

export const COUNTRIES: Country[] = [
  { code: "+91", flag: "\u{1F1EE}\u{1F1F3}", name: "India" },
  { code: "+1", flag: "\u{1F1FA}\u{1F1F8}", name: "United States" },
  { code: "+44", flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom" },
  { code: "+61", flag: "\u{1F1E6}\u{1F1FA}", name: "Australia" },
  { code: "+81", flag: "\u{1F1EF}\u{1F1F5}", name: "Japan" },
  { code: "+49", flag: "\u{1F1E9}\u{1F1EA}", name: "Germany" },
  { code: "+33", flag: "\u{1F1EB}\u{1F1F7}", name: "France" },
  { code: "+86", flag: "\u{1F1E8}\u{1F1F3}", name: "China" },
  { code: "+971", flag: "\u{1F1E6}\u{1F1EA}", name: "UAE" },
  { code: "+65", flag: "\u{1F1F8}\u{1F1EC}", name: "Singapore" },
];
