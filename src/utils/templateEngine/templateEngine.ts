export default class TemplateEngine {
  private loopRegExp: RegExp;
  private loopItemRegExp: (alias: string) => RegExp;
  private conditionRegExp: RegExp;
  private placeholderRegExp: RegExp;

  constructor() {
    this.loopRegExp = /{{for\s(\w+)\sas\s(\w+)}}([\s\S]+?(?={{endfor}}))/g;
    this.loopItemRegExp = (alias) => new RegExp(`{{${alias}\\.(\\w+)}}`, 'g');
    this.conditionRegExp = /{{if\s(\w+)}}\s*(\S+)\s*{{endif}}/g;
    this.placeholderRegExp = /{{(\w+)}}/g;
  }

  static getLoopVariables = (idx: number, arr: any[]): Record<string, any> => ({
    index: idx,
    isFirst: idx === 0,
    notIsFirst: idx !== 0,
    isLast: idx === arr.length - 1,
    notIsLast: idx !== arr.length - 1
  });

  createDocument(document: string, data: Record<string, any>) {
    return document
    .replace(this.loopRegExp,
      (overlap: string, collection: string, alias: string, template: string) =>
        data[collection]
        .reduce((
            str: string,
            item: Record<string, any>,
            idx: number,
            arr: Record<string, any>[]
          ) => {
          const variables = TemplateEngine.getLoopVariables(idx, arr);
          return str + template
          .replace(
            this.loopItemRegExp(alias),
            (match: string, property: string) =>
              item[property] || match)
          .replace(
            this.conditionRegExp,
            (match: string, condition: string, content: string) =>
              variables[condition] ? content : match)
          .replace(
            this.placeholderRegExp,
            (match: string, property: string) =>
              variables[property] !== undefined ? variables[property] : match);
      },'')
    )
    .replace(this.conditionRegExp, (match, condition, content) => data[condition] ? content : '')
    .replace(this.placeholderRegExp, (match, prop) => data[prop] || '')
    .split('\n').map((str) => str.trim()).join('')
  }
}
