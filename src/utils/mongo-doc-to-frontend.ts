import { ObjectId } from 'mongoose';

export const mongoDocToFrontend = <DocType>(
  doc: DocType & {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
): DocType & { id: string; createdAt: string; updatedAt: string } => {
  return {
    ...doc,
    id: doc._id.toString(),
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
};
