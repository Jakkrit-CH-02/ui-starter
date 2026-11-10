import { StatusType } from "../lib/constants";

export type Unit = {
  id: number;
  name: string;
  tenant: string;
  rent: number;
  status: StatusType;
};

/** Demo data for OverviewPage. Delete this file once the page reads from your API. */
export const sampleUnits: Unit[] = [
  { id: 1, name: "A-101", tenant: "Somchai Jaidee", rent: 12000, status: StatusType.OCCUPIED },
  { id: 2, name: "A-102", tenant: "", rent: 12000, status: StatusType.AVAILABLE },
  { id: 3, name: "A-103", tenant: "Kanya Srisuk", rent: 12500, status: StatusType.RESERVED },
  { id: 4, name: "A-201", tenant: "", rent: 14000, status: StatusType.MAINTENANCE },
  { id: 5, name: "A-202", tenant: "Niran Thongdee", rent: 14000, status: StatusType.OCCUPIED },
  { id: 6, name: "A-203", tenant: "Pim Wattanakul", rent: 14500, status: StatusType.EXPIRED },
  { id: 7, name: "B-101", tenant: "", rent: 9500, status: StatusType.AVAILABLE },
  { id: 8, name: "B-102", tenant: "Arthit Boonmee", rent: 9500, status: StatusType.OCCUPIED },
  { id: 9, name: "B-103", tenant: "Chanida Phromma", rent: 9800, status: StatusType.TERMINATED },
  { id: 10, name: "B-201", tenant: "Wichai Saetang", rent: 11000, status: StatusType.OCCUPIED },
  { id: 11, name: "B-202", tenant: "", rent: 11000, status: StatusType.AVAILABLE },
  { id: 12, name: "B-203", tenant: "Malee Rattanaporn", rent: 11500, status: StatusType.RESERVED },
];
