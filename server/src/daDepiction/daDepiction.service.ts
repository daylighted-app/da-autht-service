import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneDaDepictionArgs,
  FindManyDaDepictionArgs,
  DaDepictionCreateArgs,
  DaDepictionUpdateArgs,
  DaDepictionDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class DaDepictionService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyDaDepictionArgs>(
    args: Subset<T, FindManyDaDepictionArgs>
  ) {
    return this.prisma.daDepiction.findMany(args);
  }
  findOne<T extends FindOneDaDepictionArgs>(
    args: Subset<T, FindOneDaDepictionArgs>
  ) {
    return this.prisma.daDepiction.findOne(args);
  }
  create<T extends DaDepictionCreateArgs>(
    args: Subset<T, DaDepictionCreateArgs>
  ) {
    return this.prisma.daDepiction.create<T>(args);
  }
  update<T extends DaDepictionUpdateArgs>(
    args: Subset<T, DaDepictionUpdateArgs>
  ) {
    return this.prisma.daDepiction.update<T>(args);
  }
  delete<T extends DaDepictionDeleteArgs>(
    args: Subset<T, DaDepictionDeleteArgs>
  ) {
    return this.prisma.daDepiction.delete(args);
  }
}
