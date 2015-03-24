(function(head, req) {
  headers = ["_id","clientId","Gender","DOB","Surgeon","question","createdAt","lastModifiedAt","registrationLocation","currentPosition", "latitude","longitude","RefusedSurgeryR","RefusedSurgeryL","ProvidedEpilationConsultationL","ProvidedEpilationConsultationR", "TypeofOperationL","SutureTypeL","ClampusedL","ExcessbleedingL","MarginfragmantseveredL","GlobePunctureL ","TypeofOperationR"," SutureTypeR","ClampusedR","ExcessbleedingR","MarginfragmantseveredR","GlobePunctureR","tetracyclineEyeOintmentL","tetracyclineEyeOintmentR", "azithromycinL","azithromycinR","ComplicationsReferralL","ComplicationsReferralR","complete","savedBy","user"];
  var row, sep = '\n', headerSent = false, startedOutput = false;
  var gpsCities = [];
  var gpsCitiesObject = {};
  start({"headers":{"Content-Type" : "text/csv; charset=utf-8"}});
  //send(headers + '"\n');
  send('"' + headers.join('","') + '"\n');
  assignValue = function(row, header) {
    var id = row.value[headers[0]];
    if (row.value[headers[header]]) {
      if (startedOutput) send(",");
      var value = row.value[headers[header]];
      if (typeof(value) == "object") {
        if ((headers[header]) == "currentPosition") {
          var latitude = value.coords.latitude
          var longitude = value.coords.longitude
          gpsCity = {};
          gpsCity.id = id
          gpsCity.latitude = latitude
          gpsCity.longitude = longitude
          gpsCitiesObject[id] = gpsCity;
        }
        value = JSON.stringify(value);
      }
      if (typeof(value) == "string") value = value.replace(/\"/g, '""');
      send("\"" + value + "\"");
    } else {
      if (startedOutput) {send(",");
        if ((headers[header]) == "latitude") {
          if (gpsCitiesObject.hasOwnProperty(id)) {
            var gpsCity = gpsCitiesObject[id];
            latitude = gpsCity.latitude
            value = JSON.stringify(latitude);
            value = value.replace(/\"/g, '""');
            send("\"" + value + "\"");
          }
        } else if ((headers[header]) == "longitude") {
          if (gpsCitiesObject.hasOwnProperty(id)) {
            var gpsCity = gpsCitiesObject[id];
            longitude = gpsCity.longitude
            value = JSON.stringify(longitude);
            value = value.replace(/\"/g, '""');
            send("\"" + value + "\"");
          }
        }
      }
    }
    startedOutput = true;
    return value;
  }

  while (row = getRow()) {
    for (var header in headers) {
      var value = assignValue(row, header);
    }
    startedOutput = false;
    send('\n');
  }
});
