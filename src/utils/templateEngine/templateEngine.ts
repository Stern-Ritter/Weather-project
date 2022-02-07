export default class TemplateEngine {
  private static loopRegExp = /{{for\s(\w+)\sas\s(\w+)}}([\s\S]+?(?={{endfor}}))/g;
  private static loopItemRegExp = (alias: string) => new RegExp(`{{${alias}\\.(\\w+)}}`, 'g');
  private static conditionRegExp = /{{if\s(\w+)}}\s*(\S+)\s*{{endif}}/g;
  private static placeholderRegExp = /{{(\w+)}}/g;

  static getLoopVariables = (idx: number, arr: any[]): Record<string, any> => ({
    index: idx,
    isFirst: idx === 0,
    notIsFirst: idx !== 0,
    isLast: idx === arr.length - 1,
    notIsLast: idx !== arr.length - 1
  });

  static createDocument(document: string, data: Record<string, any>) {
    return document
    .replace(this.loopRegExp,
      (overlap: string, collection: string, alias: string, template: string) =>
        data[collection]
        ?.reduce((
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
    .replace(/\n{2,}/g,'\n')
  }
}
