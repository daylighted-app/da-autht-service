import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneDelightArgs,
  FindManyDelightArgs,
  DelightCreateArgs,
  DelightUpdateArgs,
  DelightDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class DelightService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyDelightArgs>(
    args: Subset<T, FindManyDelightArgs>
  ) {
    return this.prisma.delight.findMany(args);
  }
  findOne<T extends FindOneDelightArgs>(args: Subset<T, FindOneDelightArgs>) {
    return this.prisma.delight.findOne(args);
  }
  create<T extends DelightCreateArgs>(args: Subset<T, DelightCreateArgs>) {
    return this.prisma.delight.create<T>(args);
  }
  update<T extends DelightUpdateArgs>(args: Subset<T, DelightUpdateArgs>) {
    return this.prisma.delight.update<T>(args);
  }
  delete<T extends DelightDeleteArgs>(args: Subset<T, DelightDeleteArgs>) {
    return this.prisma.delight.delete(args);
  }
}
