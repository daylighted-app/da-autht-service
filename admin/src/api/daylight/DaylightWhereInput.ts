import { DaRepeatableWhereUniqueInput } from "../daRepeatable/DaRepeatableWhereUniqueInput";
import { DaTimingWhereUniqueInput } from "../daTiming/DaTimingWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type DaylightWhereInput = {
  createdAt?: Date;
  id?: string;
  repeatition?: DaRepeatableWhereUniqueInput | null;
  score?: number | null;
  timing?: DaTimingWhereUniqueInput | null;
  updatedAt?: Date;
  userId?: UserWhereUniqueInput | null;
};
