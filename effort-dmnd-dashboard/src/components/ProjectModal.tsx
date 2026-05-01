import { useState, useEffect } from 'react';
import type { Project, ProjStatus } from '../types';
import { PHASES, PHASE_LABELS, PHASE_COLORS } from '../constants/phases';
import { generateProjectId } from '../utils/helpers';
import PhaseBar from './PhaseBar';

const STATUS_OPTIONS: ProjStatus[] = ['ACTIVE', 'DELAYED', 'AT RISK', 'ON HOLD', 'COMPLETE'];

const EMPTY_PROJECT: Omit<Project, 'id'> = {
  demandNum: '',
  projectName: '',
  serviceManager: '',
  demandManager: '',
  technicalLead: '',
  projectManager: '',
  dateAssigned: '',
  timScheduled: '',
  techNarrative: '',
  rom: '',
  projectAuthorized: '',
  projectStatus: 'ACTIVE',
  projectKickoff: '',
  scheduleBaselined: '',
  baselineFinish: '',
  dateCompleted: '',
  currentPhase: 'EF',
  notes: '',
};

interface ProjectModalProps {
  mode: 'add' | 'edit';
  project?: Project;
  projects: Project[];
  onSave: (project: Project) => void;
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

export default function ProjectModal({ mode, project, projects, onSave, onClose }: ProjectModalProps) {
  const [form, setForm] = useState<Omit<Project, 'id'>>(
    project ? { ...project } : { ...EMPTY_PROJECT }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Project, string>>>({});

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  function set<K extends keyof Omit<Project, 'id'>>(key: K, value: Omit<Project, 'id'>[K]) {
    setForm(f => ({ ...f, [key]: value }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof Project, string>> = {};
    if (!form.demandNum.trim()) newErrors.demandNum = 'Demand number is required.';
    if (!form.projectName.trim()) newErrors.projectName = 'Project name is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    const saved: Project = mode === 'edit' && project
      ? { ...form, id: project.id }
      : { ...form, id: generateProjectId(projects.length) };
    onSave(saved);
  }

  function Field({ label, field, required, type = 'text' }: {
    label: string;
    field: keyof Omit<Project, 'id' | 'currentPhase' | 'projectStatus'>;
    required?: boolean;
    type?: string;
  }) {
    return (
      <div>
        <label style={labelStyle}>{label}{required && <span style={{ color: '#ef4444' }}> *</span>}</label>
        <input
          type={type}
          value={form[field] as string}
          onChange={e => set(field, e.target.value)}
          style={{ ...inputStyle, borderColor: errors[field] ? '#ef4444' : '#e5e7eb' }}
        />
        {errors[field] && <div style={{ color: '#ef4444', fontSize: 11, marginTop: 3, fontFamily: 'Inter, sans-serif' }}>{errors[field]}</div>}
      </div>
    );
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
        maxWidth: 760,
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
            {mode === 'add' ? 'Add New Project' : 'Edit Project'}
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
              <label style={labelStyle}>Demand #<span style={{ color: '#ef4444' }}> *</span></label>
              <input
                type="text"
                value={form.demandNum}
                onChange={e => set('demandNum', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.demandNum ? '#ef4444' : '#e5e7eb', fontFamily: 'JetBrains Mono, monospace' }}
              />
              {errors.demandNum && <div style={{ color: '#ef4444', fontSize: 11, marginTop: 3, fontFamily: 'Inter, sans-serif' }}>{errors.demandNum}</div>}
            </div>
            <div>
              <label style={labelStyle}>Project Name<span style={{ color: '#ef4444' }}> *</span></label>
              <input
                type="text"
                value={form.projectName}
                onChange={e => set('projectName', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.projectName ? '#ef4444' : '#e5e7eb' }}
              />
              {errors.projectName && <div style={{ color: '#ef4444', fontSize: 11, marginTop: 3, fontFamily: 'Inter, sans-serif' }}>{errors.projectName}</div>}
            </div>

            {/* Row 2 */}
            <Field label="Service Manager" field="serviceManager" />
            <Field label="Demand Manager" field="demandManager" />

            {/* Row 3 */}
            <Field label="Technical Lead" field="technicalLead" />
            <Field label="Project Manager" field="projectManager" />

            {/* Row 4 */}
            <Field label="Date Assigned" field="dateAssigned" type="date" />
            <Field label="TIM Scheduled" field="timScheduled" type="date" />

            {/* Row 5 */}
            <Field label="Tech Narrative" field="techNarrative" />
            <Field label="ROM" field="rom" />

            {/* Row 6 */}
            <Field label="Project Authorized" field="projectAuthorized" type="date" />
            <Field label="Project Kickoff" field="projectKickoff" type="date" />

            {/* Row 7 */}
            <Field label="Schedule Baselined" field="scheduleBaselined" type="date" />
            <Field label="Baseline Finish" field="baselineFinish" type="date" />

            {/* Row 8 */}
            <Field label="Date Completed" field="dateCompleted" type="date" />
            <div>
              <label style={labelStyle}>Project Status</label>
              <select
                value={form.projectStatus}
                onChange={e => set('projectStatus', e.target.value as ProjStatus)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Row 9 — phase toggles full width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ ...labelStyle, marginBottom: 8 }}>Current Phase</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {PHASES.map(phase => {
                  const active = form.currentPhase === phase;
                  const colors = PHASE_COLORS[phase];
                  return (
                    <button
                      key={phase}
                      type="button"
                      onClick={() => set('currentPhase', phase)}
                      title={PHASE_LABELS[phase]}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 5,
                        border: `2px solid ${active ? colors.border : '#e5e7eb'}`,
                        background: active ? colors.background : '#f9fafb',
                        color: active ? colors.color : '#9ca3af',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: active ? `0 0 0 2px ${colors.border}` : 'none',
                        transition: 'all 0.1s',
                      }}
                    >
                      {phase}
                    </button>
                  );
                })}
              </div>
              <PhaseBar currentPhase={form.currentPhase} />
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
                {PHASE_LABELS[form.currentPhase]}
              </div>
            </div>

            {/* Row 10 — notes full width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Notes</label>
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Inter, sans-serif' }}
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
            {mode === 'add' ? 'Add Project' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
