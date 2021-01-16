import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneDaTimingArgs,
  FindManyDaTimingArgs,
  DaTimingCreateArgs,
  DaTimingUpdateArgs,
  DaTimingDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class DaTimingService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyDaTimingArgs>(
    args: Subset<T, FindManyDaTimingArgs>
  ) {
    return this.prisma.daTiming.findMany(args);
  }
  findOne<T extends FindOneDaTimingArgs>(args: Subset<T, FindOneDaTimingArgs>) {
    return this.prisma.daTiming.findOne(args);
  }
  create<T extends DaTimingCreateArgs>(args: Subset<T, DaTimingCreateArgs>) {
    return this.prisma.daTiming.create<T>(args);
  }
  update<T extends DaTimingUpdateArgs>(args: Subset<T, DaTimingUpdateArgs>) {
    return this.prisma.daTiming.update<T>(args);
  }
  delete<T extends DaTimingDeleteArgs>(args: Subset<T, DaTimingDeleteArgs>) {
    return this.prisma.daTiming.delete(args);
  }
}
