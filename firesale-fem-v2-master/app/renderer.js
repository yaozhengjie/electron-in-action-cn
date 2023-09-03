const { ipcRenderer } = require('electron');
// const remote = require('@electron/remote');
// const mainProcess = remote.require('./main.js');
const mainProcess = require('@electron/remote').require('./main.js');

const { marked } = require('marked');

const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');
const showFileButton = document.querySelector('#show-file');
const openInDefaultButton = document.querySelector('#open-in-default');

console.log('here render is');

const renderMarkdownToHtml = (markdown) => {
    htmlView.innerHTML = marked.parse(markdown); //改写代码
};

markdownView.addEventListener('keyup', (event) => {
    const currentContent = event.target.value; //获取文本
    renderMarkdownToHtml(currentContent);
});

openFileButton.addEventListener('click', () => {
    mainProcess.getFileFromUser();
    // alert('you click the button!')
});

ipcRenderer.on('file-opened', (event, file, content) => {
    markdownView.value = content;
    renderMarkdownToHtml(content);
});