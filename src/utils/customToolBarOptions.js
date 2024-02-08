import Pencil from '../assets/images/pencil.png'
import Expand from '../assets/images/expand.png'
import Copy from '../assets/images/copy.png'

export const addButtonToToolbar = ({handleFetchContentTool, replaceSelectedText}) => {
  const toolbar = document.getElementsByClassName("rdw-editor-toolbar")[0];
  if (toolbar) {
    const button1 = createButton("Re-write", Pencil, replaceSelectedText);
    const button2 = createButton("Write outline copy", Expand, handleFetchContentTool);
    const button3 = createButton("Expand copy", Expand);
    const button4 = createButton("Copy to clipboard", Copy);

    toolbar.appendChild(button1);
    toolbar.appendChild(button2);
    toolbar.appendChild(button3);
    toolbar.appendChild(button4);
  }
};

export const createButton = (tooltip, imageSrc, func) => {
    const button = document.createElement('button');
    button.title = tooltip;
    button.className = 'rdw-option-wrapper';
    button.addEventListener('click', () => handleButtonClick(func));
  
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = tooltip;
  
    button.appendChild(img);
    return button;
  };

  
  const handleButtonClick = (func) => {
    // Handle button click logic here
    func && func()
    // console.log('Custom button clicked! ', a);
  }; 