import {create} from "zustand";

type Diagnostic = {
  index?: number;
  name?: string;
};

type DiagnosticStore = {
  diagnostics: Diagnostic[];
  activeDiagnostic: number;
  setActiveDiagnostic: (index: number) => void;
  tabExists: boolean;
  diagnosticName: string;
};

export const useDiagnosticStore = create<DiagnosticStore>((set) => ({
  diagnostics: [
    {index: 0, name: "Chronological"},
    {index: 1, name: "Diagnoses"},
    {index: 2, name: "Diet"},
    {index: 3, name: "Injections"},
    {index: 4, name: "Lab"},
    {index: 5, name: "Prescriptions"},
    {index: 6, name: "Reminder"},
    {index: 7, name: "Surgery"},
    {index: 8, name: "VAACS"},
    {index: 9, name: "X-Ray"},
    {index: 10, name: "Soap"},
    {index: 11, name: "Notes"},
    {index: 12, name: "Public"},
    {index: 13, name: "Attachments"},
    {index: 14, name: "Requisitions"},
    {index: 15, name: "Plan"},
  ],
  diagnosticName: "Chronological",
  // diagnosticName: "Medical History",
  tabExists: false,
  activeDiagnostic: 0,
  setActiveDiagnostic: (index: number) =>
    set((state) => {
      const diagnosticExists = state.diagnostics.some((d) => d.index === index);
      const diagnostic = state.diagnostics.find((d) => d.index === index);
      return {
        activeDiagnostic: diagnosticExists ? index : undefined,
        tabExists: diagnosticExists,
        diagnosticName: diagnostic ? diagnostic.name || "" : "",
      };
    }),
}));
