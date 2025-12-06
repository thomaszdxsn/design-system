/**
 * Registry Validation
 * Validates registry entries against schema
 */

import type { RegistryEntry } from "./registry-schema";

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validate a registry entry against required schema
 */
export function validateRegistryEntry(entry: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (!entry || typeof entry !== "object") {
    return {
      valid: false,
      errors: [{ field: "entry", message: "Entry must be an object" }],
    };
  }

  const e = entry as Partial<RegistryEntry>;

  // Required fields
  if (!e.id || typeof e.id !== "string") {
    errors.push({ field: "id", message: "id is required and must be a string" });
  }

  if (!e.name || typeof e.name !== "string") {
    errors.push({ field: "name", message: "name is required and must be a string" });
  }

  if (!Array.isArray(e.files) || e.files.length === 0) {
    errors.push({ field: "files", message: "files is required and must be a non-empty array" });
  }

  if (!Array.isArray(e.registryDependencies)) {
    errors.push({
      field: "registryDependencies",
      message: "registryDependencies is required and must be an array",
    });
  }

  if (!Array.isArray(e.npmDependencies)) {
    errors.push({
      field: "npmDependencies",
      message: "npmDependencies is required and must be an array",
    });
  }

  if (!e.copyCommand || typeof e.copyCommand !== "object") {
    errors.push({
      field: "copyCommand",
      message: "copyCommand is required and must be an object",
    });
  } else {
    const cmd = e.copyCommand;
    if (!cmd.npm || !cmd.pnpm || !cmd.bun) {
      errors.push({
        field: "copyCommand",
        message: "copyCommand must have npm, pnpm, and bun fields",
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate multiple registry entries
 */
export function validateRegistryEntries(entries: unknown[]): ValidationResult {
  const allErrors: ValidationError[] = [];

  for (const [index, entry] of entries.entries()) {
    const result = validateRegistryEntry(entry);
    if (!result.valid) {
      for (const error of result.errors) {
        allErrors.push({
          field: `entry[${index}].${error.field}`,
          message: error.message,
        });
      }
    }
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  };
}
