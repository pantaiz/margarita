import type { CaseTableColumn, CaseTableRow } from '@/lib/types';
import { fixHangingPrepositions } from '@/lib/typography';
import styles from './CaseTable.module.css';

type CaseTableProps = {
  caption?: string;
  markerLegend?: boolean;
  boldFirstSentence?: boolean;
  columns: CaseTableColumn[];
  rows: CaseTableRow[];
};

function renderLead(cell: string) {
  const match = cell.match(/^(\d+\.\s+[^.]+\.)(\s+)([\s\S]*)$/);
  if (!match || !match[1] || !match[3]) {
    return fixHangingPrepositions(cell);
  }

  return (
    <>
      <strong className={styles.lead}>{fixHangingPrepositions(match[1])}</strong>
      {match[2]}
      {fixHangingPrepositions(match[3])}
    </>
  );
}

function renderCell(cell: string, boldFirstSentence: boolean) {
  if (cell === '•') {
    return <span className={styles.markerHit}>•</span>;
  }

  if (cell === '—' || cell === '-') {
    return <span className={styles.markerMiss}>—</span>;
  }

  if (boldFirstSentence) {
    return renderLead(cell);
  }

  return fixHangingPrepositions(cell);
}

export default function CaseTable({
  caption,
  markerLegend,
  boldFirstSentence = false,
  columns,
  rows,
}: CaseTableProps) {
  const colClass = styles[`cols${columns.length}`];

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <table
          className={`${styles.table}${colClass ? ` ${colClass}` : ''}`}
        >
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={styles.th}>
                  {column.imageSrc ? (
                    <span className={styles.headerWithLogo}>
                      <img
                        src={column.imageSrc}
                        alt={column.imageAlt ?? ''}
                        className={styles.logo}
                      />
                      <span>{fixHangingPrepositions(column.header)}</span>
                    </span>
                  ) : (
                    fixHangingPrepositions(column.header)
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`${styles.td} ${cellIndex === 0 && row.labelBold ? styles.labelBold : ''} ${cell === '•' || cell === '—' || cell === '-' ? styles.markerCell : ''}`}
                  >
                    {renderCell(
                      cell,
                      Boolean(boldFirstSentence && cellIndex === 0),
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {markerLegend && (
        <figcaption className={styles.markerLegend}>
          <span className={styles.markerLegendItem}>
            <span className={styles.markerHit} aria-hidden="true">
              •
            </span>
            — столкнулись с трудностью
          </span>
          <span className={styles.markerLegendItem}>
            <span className={styles.markerMiss} aria-hidden="true">
              —
            </span>
            — не столкнулись
          </span>
        </figcaption>
      )}
      {caption && (
        <figcaption className={styles.caption}>
          {fixHangingPrepositions(caption)}
        </figcaption>
      )}
    </figure>
  );
}
