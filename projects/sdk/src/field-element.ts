export class FieldElement {
    type: FieldElementType;
    constructor(fieldElementType: FieldElementType) {

    }

    mount(selectorForMount: string) {

    }
}
export enum FieldElementType {
    Cvv = 'cvv',
    CreditCardNumber = 'creditCardNumber',
    ExpiryDate = 'expiryDate',
    CardholderName = 'cardholderName'
}

export interface FieldElementCustomization {
    placeholder: string;
    classes: {
        focus: string;
        empty: string;
        base: string;
    },
}