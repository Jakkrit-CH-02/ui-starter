import type { StatusTone } from "../../theme/tokens";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const DATE_TIME_GMT_FORMAT = "YYYY-MM-DD HH:mm:ss Z";
export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const DATE_FORMAT = "YYYY-MM-DD";
export const DISPLAY_DATE_FORMAT = "DD/MM/YYYY HH:mm:ss A [GMT]Z";

export enum ActionTable {
  VIEW = "view",
  EDIT = "edit",
  DELETE = "delete",
  BUTTON_DELETE = "button_delete",
  REVIEW = "review",
}

export enum ActionMode {
  VIEW = "view",
  EDIT = "edit",
  CREATE = "create",
}

export enum StatusType {
  AVAILABLE = "available",
  OCCUPIED = "occupied",
  RESERVED = "reserved",
  MAINTENANCE = "maintenance",
  EXPIRED = "expired",
  TERMINATED = "terminated",
}

export type StatusOption = {
  value: StatusType;
  /** Fallback label; translated with `status.<value>` */
  title: string;
  /** Colour pair in theme.tokens.color.status */
  tone: StatusTone;
};

export const statusOptions: StatusOption[] = [
  { value: StatusType.AVAILABLE, title: "Available", tone: "available" },
  { value: StatusType.OCCUPIED, title: "Occupied", tone: "occupied" },
  { value: StatusType.RESERVED, title: "Reserved", tone: "reserved" },
  { value: StatusType.MAINTENANCE, title: "Maintenance", tone: "maintenance" },
  { value: StatusType.EXPIRED, title: "Expired", tone: "expired" },
  { value: StatusType.TERMINATED, title: "Terminated", tone: "terminated" },
];

export enum UserRole {
  OWNER = "Owner",
  ADMIN = "Admin",
  TENANT = "Tenant",
}

export { MenuGroups } from "./MenuGroup";
