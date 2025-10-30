import { CriteriaOperation } from '../enum/CriteriaOption';
import { SearchCriteria } from './SearchCriteria';

export class CriteriaBuilder {
  public criteriaList: (SearchCriteria|CriteriaBuilder)[] = [];
  private isBuilderOr = false;
  private isCriteriaOr = true;
  private of = '';

  public static of(of: string): CriteriaBuilder {
    const builder = new CriteriaBuilder();
    builder.of = of;
    return builder;
  }

  public and(): CriteriaBuilder {
    this.isCriteriaOr = false;
    return this;
  }

  public or(): CriteriaBuilder {
    this.isCriteriaOr = true;
    return this;
  }

  public eq(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, `'${operand2}'`, CriteriaOperation.EQ, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public gt(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2, CriteriaOperation.GT, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public lt(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2, CriteriaOperation.LT, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public ne(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2, CriteriaOperation.NE, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public like(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(
      new SearchCriteria(
        operand1,
        `'${CriteriaOperation.WILDCARD + operand2 + CriteriaOperation.WILDCARD}'`,
        CriteriaOperation.LIKE,
        this.isCriteriaOr
      )
    );
    this.isCriteriaOr = false;
    return this;
  }

  public startsWith(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(
      new SearchCriteria(
        operand1,
        `'${operand2 + CriteriaOperation.WILDCARD}'`,
        CriteriaOperation.LIKE,
        this.isCriteriaOr
      )
    );
    this.isCriteriaOr = false;
    return this;
  }

  public in(operand1: string, operand2: string[]): CriteriaBuilder {
    this.criteriaList.push(
      new SearchCriteria(
        operand1,
        '(' +
          operand2
            .toString()
            .split(',')
            .map(el => `'${el}'`) +
          ')',
        CriteriaOperation.IN,
        this.isCriteriaOr
      )
    );
    this.isCriteriaOr = false;
    return this;
  }

  public endsWith(operand1: string, operand2: string): CriteriaBuilder {
    this.criteriaList.push(
      new SearchCriteria(operand1, operand2 + CriteriaOperation.WILDCARD, CriteriaOperation.LIKE, this.isCriteriaOr)
    );
    this.isCriteriaOr = false;
    return this;
  }

  public null(operand1: string): CriteriaBuilder {
    this.criteriaList.push(
      new SearchCriteria(operand1, CriteriaOperation.NULL, CriteriaOperation.EQ, this.isCriteriaOr)
    );
    this.isCriteriaOr = false;
    return this;
  }

  public notNull(operand1: string): CriteriaBuilder {
    this.criteriaList.push(
      new SearchCriteria(operand1, CriteriaOperation.NOT_NULL, CriteriaOperation.EQ, this.isCriteriaOr)
    );
    this.isCriteriaOr = false;
    return this;
  }

  public criteria(cb: (builder: CriteriaBuilder) => CriteriaBuilder): any {
    const builder = new CriteriaBuilder();
    builder.isBuilderOr = this.isCriteriaOr;
    this.criteriaList.push(cb(builder));
    return builder;
  }

  public toString(): string {
    return ` ${this.isBuilderOr ? 'OR' : 'AND'} ${this.build()}`;
  }

  public build(): string {
    return btoa(JSON.stringify(this.criteriaList));
  }
}
