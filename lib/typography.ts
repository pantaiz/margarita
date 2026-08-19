const HANGING_WORDS =
  'а|без|бы|в|во|да|для|до|за|и|из|или|к|ко|как|ли|между|на|над|не|ни|но|о|об|обо|около|от|перед|по|под|при|про|с|со|то|у|через|чем|что|это|я';

const HANGING_WORD_RE = new RegExp(
  `(^|[\\s(«"„])(${HANGING_WORDS})[ \\t]+(?=\\S)`,
  'gi',
);

/** Collapse long spaces, glue short Russian words, keep number groups together. */
export function fixHangingPrepositions(text: string): string {
  return text
    .replace(/[\u00A0\u202F\u2007]/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/№\s+/g, '№\u00A0')
    .replace(HANGING_WORD_RE, '$1$2\u00A0')
    .replace(/(\d)\s+(?=\d{3}\b)/g, '$1\u00A0');
}
