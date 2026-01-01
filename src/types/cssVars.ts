import type { CSSProperties } from "react";

export type CSSVarName = `--${string}`;
export type StyleWithVars = CSSProperties & Partial<Record<CSSVarName, string>>;
