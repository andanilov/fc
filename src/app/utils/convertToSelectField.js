export function convertToSelectField(list) {
    !Array.isArray(list) && (list = Object.values?.(list));
    return list.map(({ _id, name }) => ({ label: name, value: _id }));
}
