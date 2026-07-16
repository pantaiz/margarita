const HANGING_PREPOSITIONS =
  'а|в|во|и|к|ко|о|об|обо|от|по|под|при|про|с|со|у|на|за|из|до|для|без|над|между|через|перед|около';

const HANGING_PREPOSITION_RE = new RegExp(
  `(^|[\\s(«"„])(${HANGING_PREPOSITIONS})\\s+(?=\\S)`,
  'gi',
);

/** Prevent line breaks after short Russian prepositions/conjunctions. */
export function fixHangingPrepositions(text: string): string {
  return text.replace(HANGING_PREPOSITION_RE, '$1$2\u00A0');
}
