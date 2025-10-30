import {CriteriaOperation} from "../enum/CriteriaOption"
export class SearchCriteria {
  readonly firstOperand: string = '';
  public secondOperand = '';
  operation: CriteriaOperation;
  isOr: boolean = false;

  get getSecondOperand(): string {
    return this.secondOperand;
  }

  constructor(firstOperand: string, secondOperand: string, operation: CriteriaOperation, isOr = false) {
    this.firstOperand = firstOperand;
    this.secondOperand = secondOperand;
    this.operation = operation;
    this.isOr = isOr;
  }

  public get chainOp(): string {
    return this.isOr ? 'OR' : 'AND';
  }

  public toString(): string {
    return ` ${this.chainOp} ${this.firstOperand}${this.operation}${this.secondOperand}`;
  }
}
