import type { Phase } from '../types';
import { PHASES } from '../constants/phases';

export function getPhaseIndex(phase: Phase): number {
  return PHASES.indexOf(phase);
}

export type SegState = 'done' | 'active' | 'todo';

export function getSegState(phase: Phase, currentPhase: Phase): SegState {
  const idx = getPhaseIndex(phase);
  const curIdx = getPhaseIndex(currentPhase);
  if (idx < curIdx) return 'done';
  if (idx === curIdx) return 'active';
  return 'todo';
}

export function generateProjectId(projectCount: number): string {
  const year = new Date().getFullYear();
  const next = projectCount + 1;
  return `PRJ-${year}-${String(next).padStart(3, '0')}`;
}

export function generateCdrlId(cdrlCount: number): string {
  const year = new Date().getFullYear();
  const next = cdrlCount + 1;
  return `CDRL-${year}-${String(next).padStart(3, '0')}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}
