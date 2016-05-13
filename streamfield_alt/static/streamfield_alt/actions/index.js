export function setInitialState(value) {
  return {
    type: 'SET_INITIAL_STATE',
    blocks: value,
  };
}

export function newChildBlock(type, position, schema) {
  return {
    type: 'NEW_CHILD_BLOCK',
    position: position,
    blockType: type,
    schema: schema,
  };
}

export function deleteChildBlock(position, deletedItems) {
  return {
    type: 'DELETE_CHILD_BLOCK',
    position: position,
    deletedItems: deletedItems,
  };
}

export function moveChildBlock(position, to) {
  return {
    type: 'MOVE_CHILD_BLOCK',
    position: position,
    to: to,
  };
}
