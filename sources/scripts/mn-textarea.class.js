class MnInput extends HTMLElement {
  constructor(self) {
    self = super(self)
    this.setPlaceholder()
    this.setTextarea()
    return self
  }

  setPlaceholder() {
    let placeholder = this.getAttribute('placeholder')
    let id = this.getAttribute('id')

    if (placeholder) {
      let label = document.createElement('label')
      label.textContent = this.getAttribute('disabled')
        ? `${placeholder} disabled`
        : placeholder

      if (id) {
        label.setAttribute('for', id)
      }

      this.insertBefore(label, this.firstChild)
    }
  }

  setTextarea() {
    let attributeSpecs = [
      {
        name: 'placeholder',
        default: 'undefined',
      },
      {
        name: 'rows',
        default: '1',
      },
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
    ]

    let textarea = document.createElement('textarea')

    let attributes = Array
      .from(this.attributes)
      .map(getNameAndValue)

    let defaultAttibutes = attributeSpecs
      .filter(defaults)
      .filter(notImplemented)

    attributes = attributes.concat(defaultAttibutes)

    attributes.forEach(setAttribute)

    attributeSpecs
      .filter(attr => attr.remove)
      .forEach(attr => {
        this.removeAttribute(attr.name)
      })

    textarea.addEventListener('keyup', setHeight)

    function setHeight() {
      // textarea.setAttribute('style', `height:${textarea.scrollHeight}px`)
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }

    this.insertBefore(textarea, this.firstChild)

    function getNameAndValue(attr) {
      let name = attr.name
      let value = attr.value
      return {name, value}
    }

    function defaults(attribute) {
      return attribute.hasOwnProperty('default')
    }

    function notImplemented(defaultAttr) {
      return !attributes.some(attribute => attribute.name === defaultAttr.name)
    }

    function setAttribute(attribute) {
      let attributeSpec = attributeSpecs.filter(spec => spec.name === attribute.name)[0]
      if (!attributeSpec) {
        return false
      }
      let isDefaultAttribute = attributeSpec.hasOwnProperty('default')
      let attributeValue = attribute.value

      if (isDefaultAttribute) {
        let isValidValue = attributeSpec.hasOwnProperty('values')
          && attributeSpec.values.indexOf(attributeValue) >= 0

        let value = isValidValue
          ? attributeValue
          : attributeSpec.default

        textarea.setAttribute(attribute.name, value)
      } else if (attributeValue) {
        textarea.setAttribute(attribute.name, attributeValue)
      }
    }
  }
}

customElements.define('mn-textarea', MnInput)
