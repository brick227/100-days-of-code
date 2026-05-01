import type { Phase } from '../types';
import { PHASES, PHASE_COLORS } from '../constants/phases';
import { getSegState } from '../utils/helpers';

interface PhaseBarProps {
  currentPhase: Phase;
}

export default function PhaseBar({ currentPhase }: PhaseBarProps) {
  return (
    <div style={{ display: 'flex', width: '100%', borderRadius: 3, overflow: 'hidden', gap: 1 }}>
      {PHASES.map((phase) => {
        const state = getSegState(phase, currentPhase);
        const colors = PHASE_COLORS[phase];

        let bg: string;
        let borderColor: string;
        let textColor: string;
        let boxShadow: string | undefined;

        if (state === 'done') {
          bg = colors.background;
          borderColor = colors.border;
          textColor = colors.color;
        } else if (state === 'active') {
          bg = colors.background;
          borderColor = colors.border;
          textColor = colors.color;
          boxShadow = `0 0 0 2px ${colors.border}`;
        } else {
          bg = '#f3f4f6';
          borderColor = '#e5e7eb';
          textColor = '#d1d5db';
        }

        return (
          <div
            key={phase}
            title={phase}
            style={{
              flex: 1,
              height: 18,
              background: bg,
              border: `1px solid ${borderColor}`,
              boxShadow: state === 'active' ? boxShadow : undefined,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 8,
              fontWeight: 700,
              color: textColor,
              userSelect: 'none',
              zIndex: state === 'active' ? 1 : 0,
              position: 'relative',
            }}
          >
            {phase}
          </div>
        );
      })}
    </div>
  );
}
