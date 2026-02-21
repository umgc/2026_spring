export function sanitizeDisplayText(input: string): string {
  return input.replace(/[<>]/g, "");
}
