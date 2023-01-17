import { parse } from "@babel/parser";



function windboxesPlugin(options = {}) {
  const cssLookup: { [key: string]: string } = {};
  let cssDatabase: { [key: string]: string } = {};

  return {
    name: 'windboxes-preset',

    load(id: string) {
      // console.log('load id', id);
    },

    resolveId(id: string) {
      // console.log('resolveId', id);
    },

    async transform(code: string, id: string) {
      // console.log('transform id', id);
      // console.log('transform code', code);
      const fileExtensionRE = /\.[^/\s?]+$/;

      const [filepath, querystring = ''] = id.split('?');
      const [extension = ''] =
        querystring.match(fileExtensionRE) ||
        filepath.match(fileExtensionRE) ||
        [];

      // console.log('filepath', filepath);
      // console.log('querystring', querystring);
      // console.log('extension', extension);

      if (/\.(?:module.css?)$/.test(extension)) {
        console.log('extension', extension);
        console.log('id', id);
        // console.log('code', code);

        const ast = parse(code, {
          sourceType: 'module',
        });

        const node = ast.program.body;

        let cssValueLookup: { [key: string]: string } = {};

        node.forEach((node, index) => {
          if (node.type === 'ExportNamedDeclaration') {
            if (node.declaration.type === 'VariableDeclaration' && node.declaration.kind === 'const') {
              const declarations = node.declaration.declarations;
              const firstNode = declarations[0];

              if(firstNode.type === 'VariableDeclarator') {
                const id = firstNode.id;
                const init = firstNode.init;
                // console.log('id', id);
                // console.log('init', init);

                if(id.type === 'Identifier' && init.type === 'StringLiteral') {
                  const varName = id.name;
                  const varValue = init.value;

                  // console.log('varName', varName);
                  // console.log('varValue', varValue);

                  cssValueLookup[varName] = varValue;
                }
              }
            }
          }

          if (node.type === 'ExportDefaultDeclaration') {
            // console.log('-----------------');
            // console.log('node', node);
            // console.log('declaration', node.declaration);
            // console.log('code slice', code.slice(node.start, node.end));

            // get Object Expression
            if (node.declaration.type === 'ObjectExpression') {
              const properties = node.declaration.properties;
              // console.log('properties', properties);

              properties.forEach(node => {
                // console.log('-----------------');
                // console.log('properties node', node);

                if (node.type === 'ObjectProperty') {
                  const key = node.key;
                  const value = node.value;

                  if (key.type === 'StringLiteral' && value.type === 'StringLiteral') {
                    const cssKey = key.value;
                    const cssValue = value.value;
                    // console.log('cssKey', cssKey);
                    // console.log('cssValue', cssValue);

                    cssDatabase[cssKey] = cssValue;
                  } else if(key.type === 'Identifier' && value.type === 'Identifier') {
                    const varKey = key.name;
                    const varValue = value.name;
                    // console.log('varKey', varKey);
                    // console.log('varValue', varValue);

                    const foundValue = cssValueLookup[varValue];
                    // merge
                    cssDatabase[varKey] = foundValue;
                  }
                }
              });
            }
          }
        });

        console.log('cssValueLookup', cssValueLookup);
        console.log('cssDatabase', cssDatabase);
      }
    },
  }
}

export default windboxesPlugin;
