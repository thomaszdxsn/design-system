/**
 * Registry Validation
 * Validates registry entries against shadcn CLI v2+ schema
 */

import type {
  RegistryEntry,
  RegistryIndex,
  RegistryIndexItem,
  RegistryItemType,
} from "./registry-schema";

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Valid registry item types
 */
const VALID_TYPES: RegistryItemType[] = [
  "registry:ui",
  "registry:component",
  "registry:hook",
  "registry:lib",
  "registry:block",
  "registry:page",
  "registry:file",
  "registry:style",
  "registry:theme",
];

/**
 * Validate a registry entry against shadcn CLI v2+ schema
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

  // Required: name
  if (!e.name || typeof e.name !== "string") {
    errors.push({ field: "name", message: "name is required and must be a string" });
  }

  // Required: type
  if (!e.type || typeof e.type !== "string") {
    errors.push({ field: "type", message: "type is required and must be a string" });
  } else if (!VALID_TYPES.includes(e.type as RegistryItemType)) {
    errors.push({ field: "type", message: `type must be one of: ${VALID_TYPES.join(", ")}` });
  }

  // Optional: title
  if (e.title !== undefined && typeof e.title !== "string") {
    errors.push({ field: "title", message: "title must be a string when provided" });
  }

  // Optional: description
  if (e.description !== undefined && typeof e.description !== "string") {
    errors.push({ field: "description", message: "description must be a string when provided" });
  }

  // Required: files (non-empty array)
  if (!Array.isArray(e.files) || e.files.length === 0) {
    errors.push({ field: "files", message: "files is required and must be a non-empty array" });
  } else {
    // Validate each file entry
    for (const [idx, file] of e.files.entries()) {
      if (!file.path || typeof file.path !== "string") {
        errors.push({
          field: `files[${idx}].path`,
          message: "path is required and must be a string",
        });
      }
      if (!file.type || typeof file.type !== "string") {
        errors.push({
          field: `files[${idx}].type`,
          message: "type is required and must be a string",
        });
      } else if (!VALID_TYPES.includes(file.type as RegistryItemType)) {
        errors.push({
          field: `files[${idx}].type`,
          message: `type must be one of: ${VALID_TYPES.join(", ")}`,
        });
      }
      if (!file.content || typeof file.content !== "string") {
        errors.push({
          field: `files[${idx}].content`,
          message: "content is required and must be a string",
        });
      }
    }
  }

  // Optional: dependencies (array of strings)
  if (e.dependencies !== undefined) {
    if (!Array.isArray(e.dependencies)) {
      errors.push({
        field: "dependencies",
        message: "dependencies must be an array when provided",
      });
    } else {
      for (const [idx, dep] of e.dependencies.entries()) {
        if (typeof dep !== "string") {
          errors.push({ field: `dependencies[${idx}]`, message: "dependency must be a string" });
        }
      }
    }
  }

  // Optional: registryDependencies (array of strings)
  if (e.registryDependencies !== undefined) {
    if (!Array.isArray(e.registryDependencies)) {
      errors.push({
        field: "registryDependencies",
        message: "registryDependencies must be an array when provided",
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate an index item
 */
export function validateIndexItem(item: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (!item || typeof item !== "object") {
    return {
      valid: false,
      errors: [{ field: "item", message: "Item must be an object" }],
    };
  }

  const i = item as Partial<RegistryIndexItem>;

  if (!i.name || typeof i.name !== "string") {
    errors.push({ field: "name", message: "name is required and must be a string" });
  }

  if (!i.type || typeof i.type !== "string") {
    errors.push({ field: "type", message: "type is required and must be a string" });
  } else if (!VALID_TYPES.includes(i.type as RegistryItemType)) {
    errors.push({ field: "type", message: `type must be one of: ${VALID_TYPES.join(", ")}` });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate the registry index
 */
export function validateRegistryIndex(index: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (!index || typeof index !== "object") {
    return {
      valid: false,
      errors: [{ field: "index", message: "Index must be an object" }],
    };
  }

  const idx = index as Partial<RegistryIndex>;

  // Required: $schema
  if (!idx.$schema || typeof idx.$schema !== "string") {
    errors.push({ field: "$schema", message: "$schema is required and must be a string" });
  }

  // Required: name
  if (!idx.name || typeof idx.name !== "string") {
    errors.push({ field: "name", message: "name is required and must be a string" });
  }

  // Required: homepage
  if (!idx.homepage || typeof idx.homepage !== "string") {
    errors.push({ field: "homepage", message: "homepage is required and must be a string" });
  }

  // Required: items array
  if (!Array.isArray(idx.items)) {
    errors.push({ field: "items", message: "items is required and must be an array" });
  } else {
    for (const [i, item] of idx.items.entries()) {
      const result = validateIndexItem(item);
      if (!result.valid) {
        for (const error of result.errors) {
          errors.push({ field: `items[${i}].${error.field}`, message: error.message });
        }
      }
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
