(head, req) ->
  ddoc = this;
  Mustache = require  "lib/mustache"
#  KiwiUtilsReq = require  "vendor/couchapp/lib/KiwiUtilsReq"
  List = require("vendor/couchapp/lib/list");
  provides  "html", () ->
#     render the html head using a template
    report = {}
    stash =
      title: "KiwiPrints Summaries"
      report:report
      test:JSON.stringify(report)
      stringify:()->
        (object, render) ->
          "pow: " + JSON.stringify(render(object))
    while(row = getRow())
      value = row.value
      key = row.key
      #      test = test + "\n" + JSON.stringify(report)
      #      log('chrislog: ' + key)
      stash[key] = value
      if key == 'FebruaryBiLateral'
        report.FebruaryBiLateral = value
        report["FebruaryBiLateral"] = value
      else if key == 'FebruaryProvidedEpilationConsultation'
        report.FebruaryProvidedEpilationConsultation = value
      else if key == 'FebruaryRefusedSurgery'
        report.FebruaryRefusedSurgery = value
      else if key == 'FebruarySurgeries'
        report.FebruarySurgeries = value
      else if key == 'JanuaryBiLateral'
        report.JanuaryBiLateral = value
      else if key == 'JanuaryLateral'
        report.JanuaryLateral = value
      else if key == 'JanuaryRefusedSurgery'
        report.JanuaryRefusedSurgery = value
      else if key == 'JanuarySurgeries'
        report.JanuarySurgeries = value
    Mustache.to_html(ddoc.templates.summaries, stash, ddoc.templates.partials, List.send)

