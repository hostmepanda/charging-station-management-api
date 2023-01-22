export const updateParamsSchema = {
  id: 'string',
  name: { type: 'string', optional: true },
  parentId: { type: 'string', optional: true, nullable: true },
};
