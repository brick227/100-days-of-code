import { useState, useEffect } from 'react';
import type { CDRL, CDRLDecision } from '../types';
import { generateCdrlId } from '../utils/helpers';

const DECISION_OPTIONS: CDRLDecision[] = ['', 'PENDING', 'ACCEPTED', 'REJECTED'];

const EMPTY_CDRL: Omit<CDRL, 'id'> = {
  cdrlNum: '',
  deliverable: '',
  oprOcr: '',
  torReference: '',
  dueDate: '',
  dateSent: '',
  decision: '',
  dateDecision: '',
  notes: '',
};

interface CDRLModalProps {
  mode: 'add' | 'edit';
  cdrl?: CDRL;
  cdrls: CDRL[];
  onSave: (cdrl: CDRL) => void;
  onClose: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '7px 10px',
  border: '1px solid #e5e7eb',
  borderRadius: 5,
  fontFamily: 'Inter, sans-serif',
  fontSize: 13,
  color: '#111827',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Inter, sans-serif',
  fontSize: 11,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 4,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
};

export default function CDRLModal({ mode, cdrl, cdrls, onSave, onClose }: CDRLModalProps) {
  const [form, setForm] = useState<Omit<CDRL, 'id'>>(
    cdrl ? { ...cdrl } : { ...EMPTY_CDRL }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof CDRL, string>>>({});

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  function set<K extends keyof Omit<CDRL, 'id'>>(key: K, value: Omit<CDRL, 'id'>[K]) {
    setForm(f => ({ ...f, [key]: value }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof CDRL, string>> = {};
    if (!form.cdrlNum.trim()) newErrors.cdrlNum = 'CDRL number is required.';
    if (!form.deliverable.trim()) newErrors.deliverable = 'Deliverable is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    const saved: CDRL = mode === 'edit' && cdrl
      ? { ...form, id: cdrl.id }
      : { ...form, id: generateCdrlId(cdrls.length) };
    onSave(saved);
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(17,24,39,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#fff',
        borderRadius: 10,
        width: '100%',
        maxWidth: 600,
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 700, color: '#111827' }}>
            {mode === 'add' ? 'Add New CDRL' : 'Edit CDRL'}
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 20, lineHeight: 1 }}
          >×</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px' }}>
            {/* Row 1 */}
            <div>
              <label style={labelStyle}>CDRL #<span style={{ color: '#ef4444' }}> *</span></label>
              <input
                type="text"
                value={form.cdrlNum}
                onChange={e => set('cdrlNum', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.cdrlNum ? '#ef4444' : '#e5e7eb', fontFamily: 'JetBrains Mono, monospace' }}
              />
              {errors.cdrlNum && <div style={{ color: '#ef4444', fontSize: 11, marginTop: 3, fontFamily: 'Inter, sans-serif' }}>{errors.cdrlNum}</div>}
            </div>
            <div>
              <label style={labelStyle}>Deliverable<span style={{ color: '#ef4444' }}> *</span></label>
              <input
                type="text"
                value={form.deliverable}
                onChange={e => set('deliverable', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.deliverable ? '#ef4444' : '#e5e7eb' }}
              />
              {errors.deliverable && <div style={{ color: '#ef4444', fontSize: 11, marginTop: 3, fontFamily: 'Inter, sans-serif' }}>{errors.deliverable}</div>}
            </div>

            {/* Row 2 */}
            <div>
              <label style={labelStyle}>OPR/OCR</label>
              <input type="text" value={form.oprOcr} onChange={e => set('oprOcr', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>TOR Reference</label>
              <input type="text" value={form.torReference} onChange={e => set('torReference', e.target.value)} style={inputStyle} />
            </div>

            {/* Row 3 */}
            <div>
              <label style={labelStyle}>Due Date</label>
              <input type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Date Sent</label>
              <input type="date" value={form.dateSent} onChange={e => set('dateSent', e.target.value)} style={inputStyle} />
            </div>

            {/* Row 4 */}
            <div>
              <label style={labelStyle}>Decision</label>
              <select
                value={form.decision}
                onChange={e => set('decision', e.target.value as CDRLDecision)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {DECISION_OPTIONS.map(d => (
                  <option key={d} value={d}>{d === '' ? '— None —' : d}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Date Accepted/Rejected</label>
              <input type="date" value={form.dateDecision} onChange={e => set('dateDecision', e.target.value)} style={inputStyle} />
            </div>

            {/* Row 5 — notes full width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Notes</label>
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 10,
          background: '#f9fafb',
          borderRadius: '0 0 10px 10px',
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#fff',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              padding: '8px 20px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              background: '#1d4ed8',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 20px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {mode === 'add' ? 'Add CDRL' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
