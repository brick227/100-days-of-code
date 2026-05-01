import type { ProjStatus, CDRLDecision } from '../types';
import { STATUS_COLORS, CDRL_DECISION_COLORS } from '../constants/phases';

interface BadgeProps {
  value: ProjStatus | CDRLDecision;
  type: 'status' | 'decision';
}

export default function Badge({ value, type }: BadgeProps) {
  if (!value) return <span style={{ color: '#9ca3af', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>—</span>;

  let color = '#374151';
  let background = '#f3f4f6';
  let border = '#d1d5db';

  if (type === 'status') {
    const token = STATUS_COLORS[value as ProjStatus];
    if (token) { color = token.color; background = token.background; border = token.border; }
  } else {
    const token = CDRL_DECISION_COLORS[value as Exclude<CDRLDecision, ''>];
    if (token) { color = token.color; background = token.background; border = token.border; }
  }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 8px',
      borderRadius: 4,
      border: `1px solid ${border}`,
      background,
      color,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.03em',
      whiteSpace: 'nowrap',
    }}>
      {value}
    </span>
  );
}
