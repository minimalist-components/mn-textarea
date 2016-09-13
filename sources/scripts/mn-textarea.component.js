'use strict';

let prototype = Object.create(HTMLElement.prototype);
prototype.createdCallback = mnTextarea;
document.registerElement('mn-textarea', {prototype});

function mnTextarea() {
  let element = this;

  let textareaAttributes = [
    {
      name: 'placeholder',
      default: 'undefined',
    },
    // {
    //   name: 'rows',
    //   default: '1',
    // },
    {
      name: 'value',
    },
    {
      name: 'name',
    },
    {
      name: 'autofocus',
    },
    {
      name: 'maxlength',
    },
    {
      name: 'pattern',
    },
    {
      name: 'readonly',
    },
    {
      name: 'required',
    },
    {
      name: 'disabled',
    },
  ];

  // textarea element
  let textarea = document.createElement('div');
  textarea.classList.add('content');
  textarea.setAttribute('contenteditable', 'true');
  textareaAttributes.map(setInputAttribute);
  element.appendChild(textarea);

  // label element
  let placeholder = element.getAttribute('placeholder');
  if (placeholder) {
    let label = document.createElement('label');
    label.textContent = element.getAttribute('disabled')
      ? `${placeholder} disabled`
      : placeholder;
    element.appendChild(label);
  }

  function setInputAttribute(attribute) {
    let isDefaultAttribute = attribute.hasOwnProperty('default');
    let attributeValue = element.getAttribute(attribute.name);

    if (isDefaultAttribute) {
      let isValidValue = attribute.hasOwnProperty('values')
        && attribute.values.indexOf(attributeValue) >= 0;

      let value = isValidValue
        ? attributeValue
        : attribute.default;

      textarea.setAttribute(attribute.name, value);
    } else if (attributeValue) {
      textarea.setAttribute(attribute.name, attributeValue);
    }
  }
}
