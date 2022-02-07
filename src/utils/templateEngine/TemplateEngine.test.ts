import TemplateEngine from "./TemplateEngine";

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

  describe("basic data placing", () => {
    it("puts data into placeholders", () => {
      expect(TemplateEngine.createDocument(`<h2>{{title}}</h2>`, data))
      .toBe("<h2>The Dark Tower: The Gunslinger</h2>");
    });

    it("puts empty string into placeholders in no data provided", () => {
      expect(TemplateEngine.createDocument(
        '<h2>{{title}}</h2>\n' +
        '<h3>{{volume}}</h3>\n', data))
      .toBe(
        '<h2>The Dark Tower: The Gunslinger</h2>\n' +
        '<h3></h3>\n');
    });

    it("replaces all placeholders", () => {
      expect(TemplateEngine.createDocument(
        '<h2>{{title}}</h2>\n'+
        '<h3>{{volume}}</h3>\n' +
        '<h4>{{author}}</h4>\n', data))
      .toBe(
        '<h2>The Dark Tower: The Gunslinger</h2>\n' +
        '<h3></h3>\n' +
        '<h4>Stephen King</h4>\n'
      );
    });
  });

  describe("conditional rendering", () => {
    it("puts content if the condition is true", () => {
      expect(TemplateEngine.createDocument(
        '<h2>{{title}}</h2>\n' +
        '{{if author}}\n' +
        '<h3>{{author}}</h3>\n' +
        '{{endif}}\n', data))
      .toBe(
        '<h2>The Dark Tower: The Gunslinger</h2>\n' +
        '<h3>Stephen King</h3>\n');
    });

    it("puts empty string if the condition is false", () => {
      expect(TemplateEngine.createDocument(
        '<h2>{{title}}</h2>\n' +
        '{{if volume}}\n' +
        '<h3>{{volume}}</h3>\n' +
        '{{endif}}\n', data))
      .toBe('<h2>The Dark Tower: The Gunslinger</h2>\n');
    });

    it("replaces all conditional blocks", () => {
      expect(TemplateEngine.createDocument(
        '{{if title}}\n' +
        '<h2>{{title}}</h2>\n' +
        '{{endif}}\n' +
        '{{if volume}}\n' +
        '<h3>{{volume}}</h3>\n' +
        '{{endif}}\n' +
        '{{if author}}\n' +
        '<h4>{{author}}</h4>\n' +
        '{{endif}}\n', data))
      .toBe(
        '<h2>The Dark Tower: The Gunslinger</h2>\n' +
        '<h4>Stephen King</h4>\n'
      );
    });
  });

  describe("loops", () => {
    it("put values from list elements inside loop", () => {
      expect(TemplateEngine.createDocument(
        '<div class="tags">\n' +
        '{{for tags as item}}\n' +
        '<a class="tag" href="#tag{{item.id}}"> {{item.name}} </a>\n' +
        '{{endfor}}\n' +
        '</div>\n', data))
      .toBe('<div class="tags">\n' +
      '<a class="tag" href="#tag1"> stephen king </a>\n' +
      '<a class="tag" href="#tag2"> man in black </a>\n' +
      '<a class="tag" href="#tag3"> lord of the rings </a>\n' +
      '<a class="tag" href="#tag4"> years ago </a>\n' +
      '<a class="tag" href="#tag5"> across the desert </a>\n' +
      '<a class="tag" href="#tag6"> rest of the series </a>\n' +
      '<a class="tag" href="#tag7"> science fiction </a>\n' +
      '<a class="tag" href="#tag8"> clint eastwood </a>\n' +
      '<a class="tag" href="#tag9"> looking forward </a>\n' +
      '</div>\n');
    });

    it("support basic data placing", () => {
      expect(TemplateEngine.createDocument(
        '<div class="tags">\n' +
        '{{for tags as item}}\n' +
        '<a class="tag" href="#tag{{item.id}}"> {{hashtagIcon}}{{item.name}} </a>\n' +
        '{{endfor}}\n' +
        '</div>\n', data))
      .toBe('<div class="tags">\n' +
      '<a class="tag" href="#tag1"> #stephen king </a>\n' +
      '<a class="tag" href="#tag2"> #man in black </a>\n' +
      '<a class="tag" href="#tag3"> #lord of the rings </a>\n' +
      '<a class="tag" href="#tag4"> #years ago </a>\n' +
      '<a class="tag" href="#tag5"> #across the desert </a>\n' +
      '<a class="tag" href="#tag6"> #rest of the series </a>\n' +
      '<a class="tag" href="#tag7"> #science fiction </a>\n' +
      '<a class="tag" href="#tag8"> #clint eastwood </a>\n' +
      '<a class="tag" href="#tag9"> #looking forward </a>\n' +
      '</div>\n');
    });

    it("support multiplie loops", () => {
      expect(TemplateEngine.createDocument(
        '<div class="tags">\n' +
        '<ul>\n' +
        '{{for tags as item}}\n' +
        '<li><a class="tag" href="#tag{{item.id}}"> {{item.name}} </a></li>\n' +
        '{{endfor}}\n' +
        '</ul>\n' +
        '<ul>\n' +
        '{{for bookSeries as item}}\n' +
        '<li><a class="tag" href="#tag{{item.id}}"> {{item.title}} </a></li>\n' +
        '{{endfor}}\n' +
        '</ul>\n' +
        '</div>\n', data))
      .toBe('<div class="tags">\n' +
      '<ul>\n' +
      '<li><a class="tag" href="#tag1"> stephen king </a></li>\n' +
      '<li><a class="tag" href="#tag2"> man in black </a></li>\n' +
      '<li><a class="tag" href="#tag3"> lord of the rings </a></li>\n' +
      '<li><a class="tag" href="#tag4"> years ago </a></li>\n' +
      '<li><a class="tag" href="#tag5"> across the desert </a></li>\n' +
      '<li><a class="tag" href="#tag6"> rest of the series </a></li>\n' +
      '<li><a class="tag" href="#tag7"> science fiction </a></li>\n' +
      '<li><a class="tag" href="#tag8"> clint eastwood </a></li>\n' +
      '<li><a class="tag" href="#tag9"> looking forward </a></li>\n' +
      '</ul>\n' +
      '<ul>\n' +
      '<li><a class="tag" href="#tag1"> The Gunslinger </a></li>\n' +
      '<li><a class="tag" href="#tag2"> The Drawing of the Three </a></li>\n' +
      '<li><a class="tag" href="#tag3"> The Waste Lands </a></li>\n' +
      '<li><a class="tag" href="#tag4"> Wizard and Glass </a></li>\n' +
      '<li><a class="tag" href="#tag5"> The Wind Through the Keyhole </a></li>\n' +
      '<li><a class="tag" href="#tag6"> Wolves of the Calla </a></li>\n' +
      '<li><a class="tag" href="#tag7"> Song of Susannah </a></li>\n' +
      '<li><a class="tag" href="#tag8"> The Dark Tower </a></li>\n' +
      '</ul>\n' +
      '</div>\n');
    });

    it("support additional loop variables", () => {
      expect(TemplateEngine.createDocument(
        '<div class="tags">\n' +
        '{{for tags as item}}\n' +
        '<a class="tag" href="#tag{{item.id}}">\n' +
        '{{index}} {{isFirst}} {{isLast}} {{hashtagIcon}}{{item.name}}\n' +
        '</a>{{if notIsLast}}, {{endif}}\n' +
        '{{endfor}}\n' +
        '</div>\n', data))
      .toBe('<div class="tags">\n' +
      '<a class="tag" href="#tag1">\n' +
        '0 true false #stephen king\n'+
      '</a>,\n' +
      '<a class="tag" href="#tag2">\n' +
        '1 false false #man in black\n'+
      '</a>,\n' +
      '<a class="tag" href="#tag3">\n' +
        '2 false false #lord of the rings\n'+
      '</a>,\n' +
      '<a class="tag" href="#tag4">\n' +
        '3 false false #years ago\n'+
      '</a>,\n' +
      '<a class="tag" href="#tag5">\n' +
        '4 false false #across the desert\n'+
      '</a>,\n' +
      '<a class="tag" href="#tag6">\n' +
        '5 false false #rest of the series\n'+
      '</a>,\n' +
      '<a class="tag" href="#tag7">\n' +
        '6 false false #science fiction\n'+
      '</a>,\n' +
      '<a class="tag" href="#tag8">\n' +
        '7 false false #clint eastwood\n'+
      '</a>,\n' +
      '<a class="tag" href="#tag9">\n' +
        '8 false true #looking forward\n'+
      '</a>\n' +
      '</div>\n');
    });
  });
});
