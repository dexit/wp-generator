export const buildTreeHierarchy = (items, id = null) =>
  items
    .filter((item) => item.parent_id === id)
    .map((item) => {
      const data = {
        text: item.name,
        type: item.type,
        file: item.file,
        value: typeof item.value === 'function' ? item.value() : item.value
      };

      if (item.directory) {
        data.children = buildTreeHierarchy(items, item.id);
      }

      return data;
    });

export const buildZipTree = (items, zip, id = null) =>
  items
    .filter((item) => item.parent_id === id)
    .forEach((item) => {
      if (item.directory) {
        const folder = zip.folder(item.name);
        buildZipTree(items, folder, item.id);
      } else if (item.file) {
        const code = typeof item.value === 'function' ? item.value() : item.value;
        zip.file(item.name, code || '');
      }
    });
