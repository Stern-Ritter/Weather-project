export default class TemplateEngine {
  // public loopRegExp: RegExp;
  // public loopItemRegExp: (alias: string) => RegExp;
  // public conditionRegExp: RegExp;
  // public placeholderRegExp: RegExp;

  constructor() {
    this.loopRegExp = new RegExp('{{for\\s(\\w+)\\sas\\s(\\w+)}}([\\s\\S]+?(?={{endfor}}))', 'g');
    this.loopItemRegExp = (alias) => new RegExp(`{{${alias}\.(\\w+)}}`, 'g');
    this.conditionRegExp = new RegExp('{{if\\s(\\w+)}}\\s*(\\S+)\\s*{{endif}}', 'g');
    this.placeholderRegExp =  new RegExp('{{(\\w+)}}', 'g');
  }

  getLoopVariables = (idx, arr) => ({
    index: idx,
    isFirst: idx === 0,
    notIsFirst: idx !== 0,
    isLast: idx === arr.length - 1,
    notIsLast: idx !== arr.length - 1
  });

  createDocument(template, data) {
    return template.replace(this.loopRegExp,
    (match, collection, alias, template) => {
      return data[collection].reduce((str, item, idx, arr) => {
        const variables = this.getLoopVariables(idx, arr);
        return str + template
        .replace(this.loopItemRegExp(alias), (match, property) => item[property] || match)
        .replace(this.conditionRegExp, (match, condition, content) => variables[condition] ? content : match)
        .replace(this.placeholderRegExp, (match, property) => variables[property] !== undefined ? variables[property] : match);
      },'');
    })
    .replace(this.conditionRegExp, (match, condition, content) => data[condition] ? content : '')
    .replace(this.placeholderRegExp, (match, prop) => data[prop] || '')
    .split('\n').map((str) => str.trim()).join('')
  }
}
