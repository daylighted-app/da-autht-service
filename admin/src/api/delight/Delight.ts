export type Delight = {
  createdAt: Date;
  id: string;
  is: Array<"Repeatable" | "Timable" | "Evaluatable" | "Schedulable">;
  updatedAt: Date;
};
