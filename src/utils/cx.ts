export type ClassValue = string | false | null | undefined;

/** Junta nomes de classe ignorando valores falsos. */
export function cx(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(' ');
}
