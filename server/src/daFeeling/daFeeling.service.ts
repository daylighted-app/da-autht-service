import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneDaFeelingArgs,
  FindManyDaFeelingArgs,
  DaFeelingCreateArgs,
  DaFeelingUpdateArgs,
  DaFeelingDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class DaFeelingService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyDaFeelingArgs>(
    args: Subset<T, FindManyDaFeelingArgs>
  ) {
    return this.prisma.daFeeling.findMany(args);
  }
  findOne<T extends FindOneDaFeelingArgs>(
    args: Subset<T, FindOneDaFeelingArgs>
  ) {
    return this.prisma.daFeeling.findOne(args);
  }
  create<T extends DaFeelingCreateArgs>(args: Subset<T, DaFeelingCreateArgs>) {
    return this.prisma.daFeeling.create<T>(args);
  }
  update<T extends DaFeelingUpdateArgs>(args: Subset<T, DaFeelingUpdateArgs>) {
    return this.prisma.daFeeling.update<T>(args);
  }
  delete<T extends DaFeelingDeleteArgs>(args: Subset<T, DaFeelingDeleteArgs>) {
    return this.prisma.daFeeling.delete(args);
  }
}
