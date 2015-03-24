(function(head, req) {
  var List, Mustache, ddoc;
  ddoc = this;
  Mustache = require("lib/mustache");
  List = require("vendor/couchapp/lib/list");
  return provides("html", function() {
    var key, report, row, stash, value;
    report = {};
    stash = {
      title: "KiwiPrints Summaries",
      report: report,
      test: JSON.stringify(report),
      stringify: function() {
        return function(object, render) {
          return "pow: " + JSON.stringify(render(object));
        };
      }
    };
    while ((row = getRow())) {
      value = row.value;
      key = row.key;
      stash[key] = value;
      if (key === 'FebruaryBiLateral') {
        report.FebruaryBiLateral = value;
        report["FebruaryBiLateral"] = value;
      } else if (key === 'FebruaryProvidedEpilationConsultation') {
        report.FebruaryProvidedEpilationConsultation = value;
      } else if (key === 'FebruaryRefusedSurgery') {
        report.FebruaryRefusedSurgery = value;
      } else if (key === 'FebruarySurgeries') {
        report.FebruarySurgeries = value;
      } else if (key === 'JanuaryBiLateral') {
        report.JanuaryBiLateral = value;
      } else if (key === 'JanuaryLateral') {
        report.JanuaryLateral = value;
      } else if (key === 'JanuaryRefusedSurgery') {
        report.JanuaryRefusedSurgery = value;
      } else if (key === 'JanuarySurgeries') {
        report.JanuarySurgeries = value;
      }
    }
    return Mustache.to_html(ddoc.templates.summaries, stash, ddoc.templates.partials, List.send);
  });
});
