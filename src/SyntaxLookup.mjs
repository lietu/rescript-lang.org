// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Next from "./bindings/Next.mjs";
import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_dict from "rescript/lib/es6/js_dict.js";
import FuseJs from "fuse.js";
import * as Markdown from "./components/Markdown.mjs";
import * as SearchBox from "./components/SearchBox.mjs";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as GithubSlugger from "github-slugger";

var indexData = (require('index_data/syntax_index.json'));

var render = (function(c) {
      return React.createElement(c, {});
    });

var requireSyntaxFile = (function(name) {
    return require("misc_docs/syntax/" + name + ".mdx").default
  });

function toString(t) {
  switch (t) {
    case /* Decorators */0 :
        return "Decorators";
    case /* Operators */1 :
        return "Operators";
    case /* LanguageConstructs */2 :
        return "Language Constructs";
    case /* SpecialValues */3 :
        return "Special Values";
    case /* Other */4 :
        return "Other";
    
  }
}

function fromString(s) {
  switch (s) {
    case "decorators" :
        return /* Decorators */0;
    case "languageconstructs" :
        return /* LanguageConstructs */2;
    case "operators" :
        return /* Operators */1;
    case "specialvalues" :
        return /* SpecialValues */3;
    default:
      return /* Other */4;
  }
}

function SyntaxLookup$Category(Props) {
  var title = Props.title;
  var children = Props.children;
  return React.createElement("div", undefined, React.createElement("h3", {
                  className: "font-sans font-medium text-gray-100 tracking-wide text-14 uppercase mb-2"
                }, title), React.createElement("div", {
                  className: "flex flex-wrap"
                }, children));
}

function toItem(syntaxData) {
  var file = syntaxData.file;
  var id = syntaxData.id;
  var keywords = syntaxData.keywords;
  var name = syntaxData.name;
  var summary = syntaxData.summary;
  var category = syntaxData.category;
  return {
          id: id,
          keywords: keywords,
          name: name,
          summary: summary,
          category: fromString(category),
          component: requireSyntaxFile(file)
        };
}

var allItems = Belt_Array.map(indexData, toItem);

var fuseOpts = {
  shouldSort: false,
  includeScore: true,
  threshold: 0.2,
  location: 0,
  distance: 30,
  minMatchCharLength: 1,
  keys: [
    "keywords",
    "name"
  ]
};

var fuse = new FuseJs(allItems, fuseOpts);

function getAnchor(path) {
  var match = path.split("#");
  if (match.length !== 2) {
    return ;
  } else {
    return match[1];
  }
}

function SyntaxLookup$Tag(Props) {
  var text = Props.text;
  return React.createElement("span", {
              className: "hover:bg-fire hover:text-white bg-fire-10 py-1 px-3 rounded text-fire text-16"
            }, text);
}

function SyntaxLookup$DetailBox(Props) {
  var summary = Props.summary;
  var children = Props.children;
  var more = summary.split("`");
  var len = more.length;
  var summaryEl;
  if (len !== 3) {
    summaryEl = len !== 0 ? Belt_Array.map(more, (function (s) {
              return s;
            })) : null;
  } else {
    var first = more[0];
    var second = more[1];
    var third = more[2];
    summaryEl = Belt_Array.mapWithIndex([
          first,
          React.createElement("span", {
                className: "text-fire"
              }, second),
          third
        ], (function (i, el) {
            return React.createElement("span", {
                        key: String(i)
                      }, el);
          }));
  }
  return React.createElement("div", undefined, React.createElement("div", {
                  className: "text-21 border-b border-gray-40 pb-4 mb-4 font-semibold"
                }, summaryEl), React.createElement("div", {
                  className: "mt-16"
                }, children));
}

function SyntaxLookup(Props) {
  var router = Next.Router.useRouter(undefined);
  var match = React.useState(function () {
        return /* ShowAll */0;
      });
  var setState = match[1];
  var state = match[0];
  React.useEffect((function () {
          var anchor = getAnchor(router.asPath);
          if (anchor !== undefined) {
            Belt_Option.forEach(Caml_option.undefined_to_opt(allItems.find(function (item) {
                          return GithubSlugger.slug(item.id) === anchor;
                        })), (function (item) {
                    return Curry._1(setState, (function (param) {
                                  return {
                                          TAG: 1,
                                          _0: item,
                                          [Symbol.for("name")]: "ShowDetails"
                                        };
                                }));
                  }));
          }
          
        }), []);
  React.useEffect((function () {
          var match = getAnchor(router.asPath);
          var exit = 0;
          if (typeof state === "number" || state.TAG === /* ShowFiltered */0) {
            exit = 1;
          } else {
            var item = state._0;
            if (match !== undefined) {
              var slug = GithubSlugger.slug(item.id);
              if (slug !== match) {
                Next.Router.replace(router, "syntax-lookup#" + match);
              }
              
            } else {
              Next.Router.replace(router, "syntax-lookup#" + GithubSlugger.slug(item.id));
            }
          }
          if (exit === 1) {
            if (match !== undefined) {
              Next.Router.replace(router, "syntax-lookup");
            }
            
          }
          
        }), [state]);
  var onSearchValueChange = function (value) {
    return Curry._1(setState, (function (param) {
                  if (value === "") {
                    return /* ShowAll */0;
                  }
                  var filtered = Belt_Array.map(fuse.search(value), (function (m) {
                          return m.item;
                        }));
                  if (filtered.length !== 1) {
                    return {
                            TAG: 0,
                            _0: value,
                            _1: filtered,
                            [Symbol.for("name")]: "ShowFiltered"
                          };
                  }
                  var item = Belt_Array.getExn(filtered, 0);
                  if (item.name === value) {
                    return {
                            TAG: 1,
                            _0: item,
                            [Symbol.for("name")]: "ShowDetails"
                          };
                  } else {
                    return {
                            TAG: 0,
                            _0: value,
                            _1: filtered,
                            [Symbol.for("name")]: "ShowFiltered"
                          };
                  }
                }));
  };
  var details;
  if (typeof state === "number" || state.TAG === /* ShowFiltered */0) {
    details = null;
  } else {
    var item = state._0;
    details = React.createElement("div", {
          className: "mb-16"
        }, React.createElement(SyntaxLookup$DetailBox, {
              summary: item.summary,
              children: render(item.component)
            }));
  }
  var initial = Belt_Array.map([
        /* Decorators */0,
        /* Operators */1,
        /* LanguageConstructs */2,
        /* SpecialValues */3,
        /* Other */4
      ], (function (cat) {
          return [
                  toString(cat),
                  []
                ];
        }));
  var items;
  items = typeof state === "number" ? allItems : (
      state.TAG === /* ShowFiltered */0 ? state._1 : []
    );
  var categories = Belt_Array.reduce(Js_dict.entries(Belt_Array.reduce(items, Js_dict.fromArray(initial), (function (acc, item) {
                  var key = toString(item.category);
                  return Belt_Option.mapWithDefault(Js_dict.get(acc, key), acc, (function (items) {
                                items.push(item);
                                acc[key] = items;
                                return acc;
                              }));
                }))), [], (function (acc, entry) {
          var items = entry[1];
          if (items.length === 0) {
            return acc;
          }
          var title = entry[0];
          var children = Belt_Array.map(items, (function (item) {
                  var onMouseDown = function (evt) {
                    evt.preventDefault();
                    return Curry._1(setState, (function (param) {
                                  return {
                                          TAG: 1,
                                          _0: item,
                                          [Symbol.for("name")]: "ShowDetails"
                                        };
                                }));
                  };
                  return React.createElement("span", {
                              key: item.name,
                              className: "mr-2 mb-2 cursor-pointer",
                              onMouseDown: onMouseDown
                            }, React.createElement(SyntaxLookup$Tag, {
                                  text: item.name
                                }));
                }));
          var el = React.createElement("div", {
                key: title,
                className: "first:mt-0 mt-12"
              }, React.createElement(SyntaxLookup$Category, {
                    title: title,
                    children: children
                  }));
          acc.push(el);
          return acc;
        }));
  var match$1;
  if (typeof state === "number") {
    match$1 = [
      "",
      allItems
    ];
  } else if (state.TAG === /* ShowFiltered */0) {
    match$1 = [
      state._0,
      state._1
    ];
  } else {
    var item$1 = state._0;
    match$1 = [
      item$1.name,
      [item$1]
    ];
  }
  var onSearchClear = function (param) {
    return Curry._1(setState, (function (param) {
                  return /* ShowAll */0;
                }));
  };
  return React.createElement("div", undefined, React.createElement("div", {
                  className: "flex flex-col items-center"
                }, React.createElement("div", {
                      className: "text-center",
                      style: {
                        maxWidth: "21rem"
                      }
                    }, React.createElement(Markdown.H1.make, {
                          children: "Syntax Lookup"
                        }), React.createElement("div", {
                          className: "mb-8 text-gray-60-tr text-14"
                        }, "Enter some language construct you want to know more about.")), React.createElement("div", {
                      className: "w-full",
                      style: {
                        maxWidth: "34rem"
                      }
                    }, React.createElement(SearchBox.make, {
                          completionValues: Belt_Array.map(match$1[1], (function (item) {
                                  return item.name;
                                })),
                          value: match$1[0],
                          onClear: onSearchClear,
                          placeholder: "Enter keywords or syntax...",
                          onValueChange: onSearchValueChange
                        }))), React.createElement("div", {
                  className: "mt-10"
                }, details, categories));
}

var make = SyntaxLookup;

export {
  make ,
  
}
/* indexData Not a pure module */
