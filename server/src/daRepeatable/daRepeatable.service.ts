import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneDaRepeatableArgs,
  FindManyDaRepeatableArgs,
  DaRepeatableCreateArgs,
  DaRepeatableUpdateArgs,
  DaRepeatableDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class DaRepeatableService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyDaRepeatableArgs>(
    args: Subset<T, FindManyDaRepeatableArgs>
  ) {
    return this.prisma.daRepeatable.findMany(args);
  }
  findOne<T extends FindOneDaRepeatableArgs>(
    args: Subset<T, FindOneDaRepeatableArgs>
  ) {
    return this.prisma.daRepeatable.findOne(args);
  }
  create<T extends DaRepeatableCreateArgs>(
    args: Subset<T, DaRepeatableCreateArgs>
  ) {
    return this.prisma.daRepeatable.create<T>(args);
  }
  update<T extends DaRepeatableUpdateArgs>(
    args: Subset<T, DaRepeatableUpdateArgs>
  ) {
    return this.prisma.daRepeatable.update<T>(args);
  }
  delete<T extends DaRepeatableDeleteArgs>(
    args: Subset<T, DaRepeatableDeleteArgs>
  ) {
    return this.prisma.daRepeatable.delete(args);
  }
}
