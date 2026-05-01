import type { CDRL } from '../types';
import Badge from './Badge';
import { formatDate } from '../utils/helpers';

const thStyle: React.CSSProperties = {
  padding: '10px 12px',
  fontFamily: 'Inter, sans-serif',
  fontSize: 11,
  fontWeight: 700,
  color: '#374151',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  whiteSpace: 'nowrap',
  background: '#f9fafb',
  borderBottom: '2px solid #e5e7eb',
  position: 'sticky',
  top: 0,
  textAlign: 'left',
};

const tdStyle: React.CSSProperties = {
  padding: '9px 12px',
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  color: '#374151',
  borderBottom: '1px solid #f3f4f6',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
};

interface CDRLTableProps {
  cdrls: CDRL[];
  onEdit: (cdrl: CDRL) => void;
  onDelete: (id: string) => void;
}

export default function CDRLTable({ cdrls, onEdit, onDelete }: CDRLTableProps) {
  function handleDelete(cdrl: CDRL) {
    if (window.confirm(`Delete CDRL "${cdrl.cdrlNum}: ${cdrl.deliverable}"? This cannot be undone.`)) {
      onDelete(cdrl.id);
    }
  }

  return (
    <div style={{ overflowX: 'auto', borderRadius: '0 0 8px 8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
        <thead>
          <tr>
            <th style={thStyle}>CDRL #</th>
            <th style={{ ...thStyle, minWidth: 200 }}>Deliverable</th>
            <th style={thStyle}>OPR/OCR</th>
            <th style={thStyle}>TOR Reference</th>
            <th style={thStyle}>Due Date</th>
            <th style={thStyle}>Date Sent</th>
            <th style={thStyle}>Decision</th>
            <th style={thStyle}>Date Accepted/Rejected</th>
            <th style={{ ...thStyle, minWidth: 200 }}>Notes</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cdrls.length === 0 && (
            <tr>
              <td colSpan={10} style={{ ...tdStyle, textAlign: 'center', color: '#9ca3af', padding: '32px 12px' }}>
                No CDRLs found.
              </td>
            </tr>
          )}
          {cdrls.map((cdrl, idx) => (
            <tr key={cdrl.id} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', color: '#1d4ed8', fontWeight: 700 }}>
                {cdrl.cdrlNum}
              </td>
              <td style={{ ...tdStyle, fontWeight: 600, color: '#111827', minWidth: 200 }}>
                {cdrl.deliverable}
              </td>
              <td style={tdStyle}>{cdrl.oprOcr || '—'}</td>
              <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{cdrl.torReference || '—'}</td>
              <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{formatDate(cdrl.dueDate)}</td>
              <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{formatDate(cdrl.dateSent)}</td>
              <td style={tdStyle}><Badge value={cdrl.decision} type="decision" /></td>
              <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{formatDate(cdrl.dateDecision)}</td>
              <td style={{ ...tdStyle, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', color: '#9ca3af', fontSize: 11 }}>
                {cdrl.notes || '—'}
              </td>
              <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                <button
                  onClick={() => onEdit(cdrl)}
                  style={{
                    background: '#eff6ff',
                    color: '#1d4ed8',
                    border: '1px solid #bfdbfe',
                    borderRadius: 5,
                    padding: '4px 10px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginRight: 6,
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cdrl)}
                  style={{
                    background: '#fff5f5',
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                    borderRadius: 5,
                    padding: '4px 10px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
