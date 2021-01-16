import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneDaylightArgs,
  FindManyDaylightArgs,
  DaylightCreateArgs,
  DaylightUpdateArgs,
  DaylightDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class DaylightService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyDaylightArgs>(
    args: Subset<T, FindManyDaylightArgs>
  ) {
    return this.prisma.daylight.findMany(args);
  }
  findOne<T extends FindOneDaylightArgs>(args: Subset<T, FindOneDaylightArgs>) {
    return this.prisma.daylight.findOne(args);
  }
  create<T extends DaylightCreateArgs>(args: Subset<T, DaylightCreateArgs>) {
    return this.prisma.daylight.create<T>(args);
  }
  update<T extends DaylightUpdateArgs>(args: Subset<T, DaylightUpdateArgs>) {
    return this.prisma.daylight.update<T>(args);
  }
  delete<T extends DaylightDeleteArgs>(args: Subset<T, DaylightDeleteArgs>) {
    return this.prisma.daylight.delete(args);
  }
}
