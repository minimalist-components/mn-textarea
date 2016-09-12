"use strict";function mnTextarea(){function setHeight(){var breaks=(this.value.match(/\n/g)||[]).length,rows=void 0;switch(breaks){case 0:rows=1;break;case 1:rows=2;break;default:rows=breaks+1}console.log(rows),this.setAttribute("rows",rows)}function setInputAttribute(attribute){var isDefaultAttribute=attribute.hasOwnProperty("default"),attributeValue=element.getAttribute(attribute.name);if(isDefaultAttribute){var isValidValue=attribute.hasOwnProperty("values")&&attribute.values.indexOf(attributeValue)>=0,value=isValidValue?attributeValue:attribute.default;textarea.setAttribute(attribute.name,value)}else attributeValue&&textarea.setAttribute(attribute.name,attributeValue)}var element=this,textareaAttributes=[{name:"placeholder",default:"undefined"},{name:"rows",default:"1"},{name:"value"},{name:"name"},{name:"autofocus"},{name:"maxlength"},{name:"pattern"},{name:"readonly"},{name:"required"},{name:"disabled"}],textarea=document.createElement("textarea");textareaAttributes.map(setInputAttribute),element.appendChild(textarea),textarea.addEventListener("keyup",setHeight);var placeholder=element.getAttribute("placeholder");if(placeholder){var label=document.createElement("label");label.textContent=element.getAttribute("disabled")?placeholder+" disabled":placeholder,element.appendChild(label)}}var prototype=Object.create(HTMLElement.prototype);prototype.createdCallback=mnTextarea,document.registerElement("mn-textarea",{prototype:prototype});
//# sourceMappingURL=mn-textarea.js.map