(function(head, req) {
  headers = ["id","clientId","Gender","DOB","Surgeon","question","createdAt","lastModifiedAt","registrationLocation","currentPosition", "latitude","longitude","RefusedSurgeryR","RefusedSurgeryL","ProvidedEpilationConsultationL","ProvidedEpilationConsultationR", "TypeofOperationL","SutureTypeL","ClampusedL","ExcessbleedingL","MarginfragmantseveredL","GlobePunctureL ","TypeofOperationR"," SutureTypeR","ClampusedR","ExcessbleedingR","MarginfragmantseveredR","GlobePunctureR","tetracyclineEyeOintmentL","tetracyclineEyeOintmentR", "azithromycinL","azithromycinR","ComplicationsReferralL","ComplicationsReferralR","complete","savedBy","user"];
  var row, sep = '\n', headerSent = false, startedOutput = false;
  start({"headers":{"Content-Type" : "text/csv; charset=utf-8"}});
  //send(headers + '"\n');
  send('"' + headers.join('","') + '"\n');
  assignValue = function(row, header) {
    if (row.value[headers[header]]) {
      if (startedOutput) send(",");
      var value = row.value[headers[header]];
      if (typeof(value) == "object") value = JSON.stringify(value);
      if (typeof(value) == "string") value = value.replace(/\"/g, '""');
      send("\"" + value + "\"");
    } else {
      if (startedOutput) send(",");
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
