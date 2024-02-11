import { FieldElement, FieldElementType, FieldElementCustomization } from './field-element';

export class VaultService {
    private elements: Map<FieldElementType, FieldElement> = new Map();
    constructor(key: string) { }

    createElement(fieldElementType: FieldElementType, customization?: FieldElementCustomization): FieldElement {
        const fieldElement = new FieldElement(fieldElementType);
        this.elements.set(fieldElementType, fieldElement);
        return fieldElement;
    }
}