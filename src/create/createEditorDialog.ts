import { addScript } from "../utils/addScript";
import { createDialog, type DialogProps } from "./createDialog";
import { createLoading } from "./createLoading";

interface MonacoEditorOptions {
  getValue: () => any;
  getAction: (str: string) => any;
  setValue: (str: string) => any;
  executeEdits: (key: string, edits: any[]) => any;
}

export type MonacoEditor = MonacoEditorOptions | null;

export const createEditorDialog = (dialogProps: Omit<DialogProps, 'body'> = {}): Promise<{monaco: any, editorNode: HTMLElement, prettier: any}> => {
  return new Promise(async (resolve) => {
    const monacoCDNUrl = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.0/min/vs/loader.min.js';
    const prettierCDNUrl = 'https://unpkg.com/prettier@3.2.4/standalone.js';
    const babelPluginCDNUrl = 'https://unpkg.com/prettier@3.2.4/plugins/babel.js';
    const estreePluginCDNUrl = 'https://unpkg.com/prettier@3.2.4/plugins/estree.js';

    const hasLoaded = document.querySelector(`script[src="${monacoCDNUrl}"]`)
    && document.querySelector(`script[src="${prettierCDNUrl}"]`)
    && document.querySelector(`script[src="${babelPluginCDNUrl}"]`)
    && document.querySelector(`script[src="${estreePluginCDNUrl}"]`);

    const loadingNode = createLoading('width: 100%; height: 100%');
    const bodyNode = document.createElement('div');
    bodyNode.style.width = '100%';
    bodyNode.style.height = '100%';
    const editorNode = document.createElement('div');
    editorNode.classList.add('attachment-container');
    editorNode.classList.add('hide');
    bodyNode.appendChild(loadingNode);
    bodyNode.appendChild(editorNode);

    createDialog({
      body: bodyNode,
      bodyStyle: 'width: 80vw; height: 80vh;',
      okText: '保存',
      ...dialogProps,
    })

    const createEditor = () => {
      loadingNode.classList.add('hide');
      editorNode.classList.remove('hide');
      editorNode.classList.add('show');

      // @ts-ignore
      require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.0/min/vs' } });

      // @ts-ignore
      require(['vs/editor/editor.main'], function() {
        resolve({
          // @ts-ignore
          monaco,
          editorNode,
          // @ts-ignore
          prettier,
        })
      })
    };

    if (!hasLoaded) {
      await addScript(prettierCDNUrl)
      await addScript(babelPluginCDNUrl)
      await addScript(estreePluginCDNUrl)
      await addScript(monacoCDNUrl)

      createEditor();
    } else {
      createEditor();
    }
  })
}
