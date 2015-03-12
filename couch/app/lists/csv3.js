(function(head, req) {
  var assignValue, header, headerSent, headers, row, sep, startedOutput, _i, _len, _results;
  headers = ["id", "clientId", "Gender", "DOB", "Surgeon", "question", "createdAt", "lastModifiedAt", "registrationLocation", "currentPosition", "latitude", "longitude", "RefusedSurgeryR", "RefusedSurgeryL", "ProvidedEpilationConsultationL", "ProvidedEpilationConsultationR", "TypeofOperationL", "SutureTypeL", "ClampusedL", "ExcessbleedingL", "MarginfragmantseveredL", "GlobePunctureL ", "TypeofOperationR", " SutureTypeR", "ClampusedR", "ExcessbleedingR", "MarginfragmantseveredR", "GlobePunctureR", "tetracyclineEyeOintmentL", "tetracyclineEyeOintmentR", "azithromycinL", "azithromycinR", "ComplicationsReferralL", "ComplicationsReferralR", "complete", "savedBy", "user"];
  sep = '\n';
  headerSent = false;
  startedOutput = false;
  start({
    "headers": {
      "Content-Type": "text/csv; charset=utf-8"
    }
  });
  send('"' + headers.join('","') + '"\n');
  assignValue = function(row, header) {
    var value;
    if (row.value[headers[header]]) {
      if (startedOutput) {
        send(",");
      }
      value = row.value[headers[header]];
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      if (typeof value === "string") {
        value = value.replace(/\"/g, '""');
      }
      send("\"" + value + "\"");
    } else {
      if (startedOutput) {
        send(",");
      }
    }
    return startedOutput = true;
  };
  while (row = getRow()) {
    for (header in headers) {
      assignValue(row, header);
    }
    startedOutput = false;
    send('\n');
  }
  return null;
});
