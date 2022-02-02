import TemplateEngine from "./templateEngine";

let templateEngine;

describe("Class TemplateEngine", () => {
  const data = {
    title: "The Dark Tower: The Gunslinger",
    author: "Stephen King",
    hashtagIcon: "#",
    tags: [
      {id: 1, name: "stephen king"},
      {id: 2, name: "man in black"},
      {id: 3, name: "lord of the rings"},
      {id: 4, name: "years ago"},
      {id: 5, name: "across the desert"},
      {id: 6, name: "rest of the series"},
      {id: 7, name: "science fiction"},
      {id: 8, name: "clint eastwood"},
      {id: 9, name: "looking forward"}
    ],
    bookSeries: [
      {id: 1, title: "The Gunslinger"},
      {id: 2, title: "The Drawing of the Three"},
      {id: 3, title: "The Waste Lands" },
      {id: 4, title: "Wizard and Glass"},
      {id: 5, title: "The Wind Through the Keyhole"},
      {id: 6, title: "Wolves of the Calla"},
      {id: 7, title: "Song of Susannah"},
      {id: 8, title: "The Dark Tower"}
    ]
  };

  beforeAll(() => {
    templateEngine = new TemplateEngine();
  });

  describe("basic data placing", () => {
    it("puts data into placeholders", () => {
      expect(templateEngine.createDocument(`<h2>{{title}}</h2>`, data))
      .toBe("<h2>The Dark Tower: The Gunslinger</h2>");
    });

    it("puts empty string into placeholders in no data provided", () => {
      expect(templateEngine.createDocument(
        `<h2>{{title}}</h2>
        <h3>{{volume}}</h3>`, data))
      .toBe(
        '<h2>The Dark Tower: The Gunslinger</h2>' +
        '<h3></h3>');
    });

    it("replaces all placeholders", () => {
      expect(templateEngine.createDocument(
        `<h2>{{title}}</h2>
        <h3>{{volume}}</h3>
        <h4>{{author}}</h4>`, data))
      .toBe(
        '<h2>The Dark Tower: The Gunslinger</h2>' +
        '<h3></h3>' +
        '<h4>Stephen King</h4>'
      );
    });
  });

  describe("conditional rendering", () => {
    it("puts content if the condition is true", () => {
      expect(templateEngine.createDocument(
        `<h2>{{title}}</h2>
        {{if author}}
        <h3>{{author}}</h3>
        {{endif}}`, data))
      .toBe(
        '<h2>The Dark Tower: The Gunslinger</h2>' +
        '<h3>Stephen King</h3>');
    });

    it("puts empty string if the condition is false", () => {
      expect(templateEngine.createDocument(
        `<h2>{{title}}</h2>
        {{if volume}}
        <h3>{{volume}}</h3>
        {{endif}}`, data))
      .toBe(`<h2>The Dark Tower: The Gunslinger</h2>`);
    });

    it("replaces all conditional blocks", () => {
      expect(templateEngine.createDocument(
        `{{if title}}
        <h2>{{title}}</h2>
        {{endif}}
        {{if volume}}
        <h3>{{volume}}</h3>
        {{endif}}
        {{if author}}
        <h4>{{author}}</h4>
        {{endif}}`, data))
      .toBe(
        '<h2>The Dark Tower: The Gunslinger</h2>' +
        '<h4>Stephen King</h4>'
      );
    });
  });

  describe("loops", () => {
    it("put values from list elements inside loop", () => {
      expect(templateEngine.createDocument(
        `<div class="tags">
        {{for tags as item}}
        <a class="tag" href="#tag{{item.id}}"> {{item.name}} </a>
        {{endfor}}
        </div>`, data))
      .toBe('<div class="tags">' +
      '<a class="tag" href="#tag1"> stephen king </a>' +
      '<a class="tag" href="#tag2"> man in black </a>' +
      '<a class="tag" href="#tag3"> lord of the rings </a>' +
      '<a class="tag" href="#tag4"> years ago </a>' +
      '<a class="tag" href="#tag5"> across the desert </a>' +
      '<a class="tag" href="#tag6"> rest of the series </a>' +
      '<a class="tag" href="#tag7"> science fiction </a>' +
      '<a class="tag" href="#tag8"> clint eastwood </a>' +
      '<a class="tag" href="#tag9"> looking forward </a>' +
      '</div>');
    });

    it("support basic data placing", () => {
      expect(templateEngine.createDocument(
        `<div class="tags">
        {{for tags as item}}
        <a class="tag" href="#tag{{item.id}}"> {{hashtagIcon}}{{item.name}} </a>
        {{endfor}}
        </div>`, data))
      .toBe('<div class="tags">' +
      '<a class="tag" href="#tag1"> #stephen king </a>' +
      '<a class="tag" href="#tag2"> #man in black </a>' +
      '<a class="tag" href="#tag3"> #lord of the rings </a>' +
      '<a class="tag" href="#tag4"> #years ago </a>' +
      '<a class="tag" href="#tag5"> #across the desert </a>' +
      '<a class="tag" href="#tag6"> #rest of the series </a>' +
      '<a class="tag" href="#tag7"> #science fiction </a>' +
      '<a class="tag" href="#tag8"> #clint eastwood </a>' +
      '<a class="tag" href="#tag9"> #looking forward </a>' +
      '</div>');
    });

    it("support multiplie loops", () => {
      expect(templateEngine.createDocument(
        `<div class="tags">
          <ul>
            {{for tags as item}}
              <li><a class="tag" href="#tag{{item.id}}"> {{item.name}} </a></li>
            {{endfor}}
          </ul>
          <ul>
            {{for bookSeries as item}}
              <li><a class="tag" href="#tag{{item.id}}"> {{item.title}} </a></li>
            {{endfor}}
          </ul>
        </div>`, data))
      .toBe('<div class="tags">' +
      '<ul>' +
      '<li><a class="tag" href="#tag1"> stephen king </a></li>' +
      '<li><a class="tag" href="#tag2"> man in black </a></li>' +
      '<li><a class="tag" href="#tag3"> lord of the rings </a></li>' +
      '<li><a class="tag" href="#tag4"> years ago </a></li>' +
      '<li><a class="tag" href="#tag5"> across the desert </a></li>' +
      '<li><a class="tag" href="#tag6"> rest of the series </a></li>' +
      '<li><a class="tag" href="#tag7"> science fiction </a></li>' +
      '<li><a class="tag" href="#tag8"> clint eastwood </a></li>' +
      '<li><a class="tag" href="#tag9"> looking forward </a></li>' +
      '</ul>' +
      '<ul>' +
      '<li><a class="tag" href="#tag1"> The Gunslinger </a></li>' +
      '<li><a class="tag" href="#tag2"> The Drawing of the Three </a></li>' +
      '<li><a class="tag" href="#tag3"> The Waste Lands </a></li>' +
      '<li><a class="tag" href="#tag4"> Wizard and Glass </a></li>' +
      '<li><a class="tag" href="#tag5"> The Wind Through the Keyhole </a></li>' +
      '<li><a class="tag" href="#tag6"> Wolves of the Calla </a></li>' +
      '<li><a class="tag" href="#tag7"> Song of Susannah </a></li>' +
      '<li><a class="tag" href="#tag8"> The Dark Tower </a></li>' +
      '</ul>' +
      '</div>');
    });

    it("support additional loop variables", () => {
      expect(templateEngine.createDocument(
        `<div class="tags">
        {{for tags as item}}
        <a class="tag" href="#tag{{item.id}}"> index: {{index}} isFirst: {{isFirst}} isLast: {{isLast}} {{hashtagIcon}}{{item.name}} </a>
        {{if notIsLast}}, {{endif}}
        {{endfor}}
        </div>`, data))
      .toBe('<div class="tags">' +
      '<a class="tag" href="#tag1"> index: 0 isFirst: true isLast: false #stephen king </a>,' +
      '<a class="tag" href="#tag2"> index: 1 isFirst: false isLast: false #man in black </a>,' +
      '<a class="tag" href="#tag3"> index: 2 isFirst: false isLast: false #lord of the rings </a>,' +
      '<a class="tag" href="#tag4"> index: 3 isFirst: false isLast: false #years ago </a>,' +
      '<a class="tag" href="#tag5"> index: 4 isFirst: false isLast: false #across the desert </a>,' +
      '<a class="tag" href="#tag6"> index: 5 isFirst: false isLast: false #rest of the series </a>,' +
      '<a class="tag" href="#tag7"> index: 6 isFirst: false isLast: false #science fiction </a>,' +
      '<a class="tag" href="#tag8"> index: 7 isFirst: false isLast: false #clint eastwood </a>,' +
      '<a class="tag" href="#tag9"> index: 8 isFirst: false isLast: true #looking forward </a>' +
      '</div>');
    });
  });
});
