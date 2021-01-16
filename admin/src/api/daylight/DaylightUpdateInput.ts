import { DaRepeatableWhereUniqueInput } from "../daRepeatable/DaRepeatableWhereUniqueInput";
import { DaTimingWhereUniqueInput } from "../daTiming/DaTimingWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type DaylightUpdateInput = {
  repeatition?: DaRepeatableWhereUniqueInput | null;
  score?: number | null;
  timing?: DaTimingWhereUniqueInput | null;
  userId?: UserWhereUniqueInput | null;
};
