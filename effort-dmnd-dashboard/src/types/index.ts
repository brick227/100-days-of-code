export type Phase = 'EF' | 'TIM' | 'TIN' | 'LOAM' | 'SCH' | 'FIN' | 'CON' | 'SUB';
export type ProjStatus = 'ACTIVE' | 'DELAYED' | 'AT RISK' | 'ON HOLD' | 'COMPLETE';
export type CDRLDecision = 'PENDING' | 'ACCEPTED' | 'REJECTED' | '';

export interface Project {
  id: string;
  demandNum: string;
  projectName: string;
  serviceManager: string;
  demandManager: string;
  technicalLead: string;
  projectManager: string;
  dateAssigned: string;
  timScheduled: string;
  techNarrative: string;
  rom: string;
  projectAuthorized: string;
  projectStatus: ProjStatus;
  projectKickoff: string;
  scheduleBaselined: string;
  baselineFinish: string;
  dateCompleted: string;
  currentPhase: Phase;
  notes: string;
}

export interface CDRL {
  id: string;
  cdrlNum: string;
  deliverable: string;
  oprOcr: string;
  torReference: string;
  dueDate: string;
  dateSent: string;
  decision: CDRLDecision;
  dateDecision: string;
  notes: string;
}
