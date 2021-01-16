import { DaylightWhereUniqueInput } from "../daylight/DaylightWhereUniqueInput";

export type DaRepeatable = {
  createdAt: Date | null;
  daylight: DaylightWhereUniqueInput;
  id: string;
};
