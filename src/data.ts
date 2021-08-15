import { Collection } from "mongodb";
import { WoofDocument } from "./woof-document";

export async function getWoofCount(woofCollection: Collection<WoofDocument>) {
  return (await woofCollection.findOne({ _id: 1 }))?.count;
}

export async function incrementWoofCount(
  incrementBy: number,
  woofCollection: Collection<WoofDocument>
) {
  await woofCollection.updateOne({ _id: 1 }, { $inc: { count: incrementBy } });
}
