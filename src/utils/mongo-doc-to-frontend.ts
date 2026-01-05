export const mongoDocToFrontend = <
  DocType extends { _id: { toString(): string }; createdAt: Date; updatedAt: Date },
>(
  doc: DocType
) => {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  return {
    ...rest,
    id: _id.toString(),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
};
