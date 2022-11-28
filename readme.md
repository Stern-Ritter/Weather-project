# Прогноз погоды

![Coverage](https://github.com/Stern-Ritter/Weather-project/actions/workflows/coverage.yml/badge.svg)
![Sanity-check](https://github.com/Stern-Ritter/Weather-project/actions/workflows/sanity-check.yml/badge.svg)
![Deploy](https://github.com/Stern-Ritter/Weather-project/actions/workflows/deploy.yml/badge.svg)

## Описание проекта

Приложение показывает прогноз погоды в указанном городе, сохраняя 10 последних запросов пользователя.

## Функциональность проекта

1. при открытии страницы пользователь видит погоду (город, температуру и иконку) в своей местности;
2. пользователь может ввести имя города в поле ввода и увидеть погоду в выбранном городе;
3. введенные города сохраняются в браузере, так что пользователь видит последние 10 городов, где он смотрел погоду;
4. при клике по строчке города в списке пользователь видит погоду в выбранном городе.

## в рамках проекта разработан и применен шаблонизатор

### шаблонизатор поддерживает:

- подстановку данных;
- условный рендеринг;
- работу со списками;
- дополнительные переменные в циклах (index, isFirst, isLast etc.)

### Пример шаблона для шаблонизатора:

```html
<!-- Пример шаблона -->
<h2>{{title}}</h2>
{{if author}}
<h3>{{author}}</h3>
{{endif}}
<div class="tags">
  {{for tags as item}}
  <a class="tag" href="#tag{{item.id}}"> {{item.title}} </a>
  {{if notIsLastElement}}, {{endif}}
</div>
```

## в рамках проекта разработан и применен 'базовый' компонент, использующий шаблонизатор

```ts
export declare class Component<State = {}> {
  private el;
  state: State;
  events: {
    [key: string]: (ev: Event) => void;
  };
  constructor(el: HTMLElement, initialState?: Partial<State>);
  subscribeToEvents(): void;
  setState(patch: any): void;
  onMount(el: HTMLElement): void;
  render(): string;
}
```

### компонент поддерживает:

- передачу частичных свойств в конструктор
- подписку на события, объявленные в свойстве `events`
- рендеринг шаблона, который возвращается из метода `render()` c подстановкой данных из `state`
- вызов хука `onMount` при первом рендеринге
- обновление представления при изменении `state` через `setState`

### разработанный компонент к презентационной части проекта "Прогноз погоды".

## Использованные технологии

- TypeScript,
- HTML,
- CSS,
- Google maps API,
- Jest.

**Github-pages**

- [Ссылка на github-pages.](https://stern-ritter.github.io/weather-project/)
