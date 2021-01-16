import { registerEnumType } from "@nestjs/graphql";

export enum EnumIs {
  Repeatable = "Repeatable",
  Timable = "Timable",
  Evaluatable = "Evaluatable",
  Schedulable = "Schedulable",
}

registerEnumType(EnumIs, {
  name: "EnumIs",
});
