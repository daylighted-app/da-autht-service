import { DaylightWhereUniqueInput } from "../daylight/DaylightWhereUniqueInput";

export type DaRepeatableWhereInput = {
  createdAt?: Date | null;
  daylight?: DaylightWhereUniqueInput;
  id?: string;
};
