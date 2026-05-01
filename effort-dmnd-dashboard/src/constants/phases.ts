import type { Phase, ProjStatus, CDRLDecision } from '../types';

export const PHASES: Phase[] = ['EF', 'TIM', 'TIN', 'LOAM', 'SCH', 'FIN', 'CON', 'SUB'];

export const PHASE_LABELS: Record<Phase, string> = {
  EF: 'Engineering Feasibility',
  TIM: 'Technical Interchange Meeting',
  TIN: 'Technical Interchange Narrative',
  LOAM: 'Letter of Authorization & Management',
  SCH: 'Scheduling',
  FIN: 'Finance',
  CON: 'Contract',
  SUB: 'Subcontract',
};

export interface ColorToken {
  color: string;
  background: string;
  border: string;
}

export const PHASE_COLORS: Record<Phase, ColorToken> = {
  EF:   { color: '#0369a1', background: '#e0f2fe', border: '#7dd3fc' },
  TIM:  { color: '#7c3aed', background: '#ede9fe', border: '#c4b5fd' },
  TIN:  { color: '#4f46e5', background: '#eef2ff', border: '#a5b4fc' },
  LOAM: { color: '#b45309', background: '#fef3c7', border: '#fcd34d' },
  SCH:  { color: '#047857', background: '#d1fae5', border: '#6ee7b7' },
  FIN:  { color: '#0e7490', background: '#cffafe', border: '#67e8f9' },
  CON:  { color: '#c2410c', background: '#ffedd5', border: '#fdba74' },
  SUB:  { color: '#9d174d', background: '#fce7f3', border: '#f9a8d4' },
};

export const STATUS_COLORS: Record<ProjStatus, ColorToken> = {
  ACTIVE:   { color: '#065f46', background: '#d1fae5', border: '#6ee7b7' },
  DELAYED:  { color: '#991b1b', background: '#fee2e2', border: '#fca5a5' },
  'AT RISK': { color: '#92400e', background: '#fef3c7', border: '#fcd34d' },
  'ON HOLD': { color: '#374151', background: '#f3f4f6', border: '#d1d5db' },
  COMPLETE: { color: '#1e3a5f', background: '#dbeafe', border: '#93c5fd' },
};

export const CDRL_DECISION_COLORS: Record<Exclude<CDRLDecision, ''>, ColorToken> = {
  PENDING:  { color: '#92400e', background: '#fef3c7', border: '#fcd34d' },
  ACCEPTED: { color: '#065f46', background: '#d1fae5', border: '#6ee7b7' },
  REJECTED: { color: '#991b1b', background: '#fee2e2', border: '#fca5a5' },
};
