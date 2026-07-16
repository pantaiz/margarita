import type { CaseTableColumn, CaseTableRow } from '@/lib/types';
import { fixHangingPrepositions } from '@/lib/typography';
import styles from './CaseTable.module.css';

type CaseTableProps = {
  caption?: string;
  markerLegend?: boolean;
  columns: CaseTableColumn[];
  rows: CaseTableRow[];
};

function renderCell(cell: string) {
  if (cell === '•') {
    return <span className={styles.markerHit}>•</span>;
  }

  if (cell === '—' || cell === '-') {
    return <span className={styles.markerMiss}>—</span>;
  }

  return fixHangingPrepositions(cell);
}

export default function CaseTable({
  caption,
  markerLegend,
  columns,
  rows,
}: CaseTableProps) {
  return (
    <figure className={styles.figure}>
      <div className={styles.scroll}>
        <table className={styles.table}>
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
                    {renderCell(cell)}
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
