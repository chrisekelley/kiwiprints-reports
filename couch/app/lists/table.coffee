(head, req) ->
  ddoc = this;
  Mustache = require  "lib/mustache"
#  KiwiUtilsReq = require  "vendor/couchapp/lib/KiwiUtilsReq"
  List = require("vendor/couchapp/lib/list");
  provides  "html", () ->
#    send  template(templates.index.head
#      title : "KiwiPrints Reports",
#    )
#  var row, key;
#    while row = getRow()
#      record = row.value;
#      key = row.key;

  #  send  template(templates.index.row
  #    id : record._id,
  #    question : record.question,
  #    createdAt : record.createdAt,
  #  )
#    template(templates.index.tail
#    );
#    Mustache.to_html(ddoc.templates.index, stash, ddoc.templates.partials, List.send);


#     render the html head using a template
    gpsCities = []
    gpsCitiesString = []
    stash =
      title: "KiwiPrints Reports"
      gpsCities:gpsCities
      gpsCitiesString:gpsCitiesString
#      gpsCitiesString2:'[' + gpsCitiesString + ']'
      records : List.withRows((row) ->
        record = row.value
        key = row.key
        if typeof record.currentPosition != 'undefined'
          timestamp = new Date(record.currentPosition.timestamp)
          coords = record.currentPosition.coords
          latitude = record.currentPosition.coords.latitude
          longitude = record.currentPosition.coords.longitude
          gpsCity =
            id: record._id
            latitude:latitude
            longitude:longitude
          gpsCities.push(gpsCity)
          gpsCityString = JSON.stringify(gpsCity)
          gpsCitiesString.push(gpsCityString)
#          gpsCitiesString2 = JSON.stringify(gpsCitiesString);
        return {
          id: record._id,
          clientId: record.clientId,
          question: record.question,
          createdAt: record.createdAt,
          lastModifiedAt: record.lastModifiedAt,
          Gender: record.Gender,
          DOB: record.DOB,
          Surgeon: record.Surgeon,
          registrationLocation: record.registrationLocation
          Surgeon: record.Surgeon
          user: record.user
          serviceLocation: record.serviceLocation,
          DateTime: record.DateTime,
          RefusedSurgeryL:record.RefusedSurgeryL ,
          ProvidedEpilationConsultationL: record.ProvidedEpilationConsultationL,
          TypeofOperationL: record.TypeofOperationL,
          ClampusedL:record.ClampusedL,
          SutureTypeL: record.SutureTypeL,
          ExcessbleedingL: record.ExcessbleedingL,
          MarginfragmantseveredL: record.MarginfragmantseveredL,
          GlobePunctureL: record.GlobePunctureL,
          ComplicationsReferralL: record.ComplicationsReferralL,
          ReferralHospitalL: record.ReferralHospitalL,
          RefusedSurgeryR:record.RefusedSurgeryR ,
          ProvidedEpilationConsultationR:record.ProvidedEpilationConsultationR ,
          TypeofOperationR: record.TypeofOperationR,
          ClampusedR: record.ClampusedR,
          SutureTypeR: record.SutureTypeR,
          ExcessbleedingR: record.ExcessbleedingR,
          MarginfragmantseveredR: record.MarginfragmantseveredR,
          GlobePunctureR: record.GlobePunctureR,
          ComplicationsReferralR: record.ComplicationsReferralR,
          ReferralHospitalR:record.ReferralHospitalR ,
          azithromycinR: record.azithromycinR,
          tetracyclineEyeOintmentR: record.tetracyclineEyeOintmentR,
          complete: record.complete,
          savedBy: record.savedBy,
          currentPosition: record.currentPosition,
          timestamp: timestamp,
          coords: coords,
          latitude: latitude,
          longitude: longitude,
          currentPositionString: JSON.stringify(record.currentPosition)
        }
      )
    Mustache.to_html(ddoc.templates.index, stash, ddoc.templates.partials, List.send)
