(head,req) ->
#  List = require("vendor/couchapp/lib/list");
#  start {'headers':{'Content-Type' : 'text/csv; charset=utf-8; header=present'}}
#  List.withRows((row) ->
#    record = row.value
#    key = row.key
#    if  !headers
#      headers = Object.keys(record)
#      send('"' + headers.join('","') + '"\n');
#    headers.forEach (v,i) ->
#      send  String(record[v]).replace(/\"/g,'""').replace(/^|$/g,'"')
#      if (i + 1 < headers.length) then send(',') else send('\n');
#  )

#  headers = "id, clientId, Gender, DOB, Surgeon, question, createdAt, lastModifiedAt, registrationLocation, currentPosition,
#  latitude, longitude, RefusedSurgeryR, RefusedSurgeryL, ProvidedEpilationConsultationL, ProvidedEpilationConsultationR,
#  TypeofOperationL, SutureTypeL, ClampusedL, ExcessbleedingL, MarginfragmantseveredL, GlobePunctureL , TypeofOperationR,
#  SutureTypeR, ClampusedR, ExcessbleedingR, MarginfragmantseveredR, GlobePunctureR, tetracyclineEyeOintmentL, tetracyclineEyeOintmentR,
#  azithromycinL, azithromycinR, ComplicationsReferralL, ComplicationsReferralR, complete, savedBy, user"

  headers = ["id","clientId","Gender","DOB","Surgeon","question","createdAt","lastModifiedAt","registrationLocation","currentPosition", "latitude","longitude","RefusedSurgeryR","RefusedSurgeryL","ProvidedEpilationConsultationL","ProvidedEpilationConsultationR", "TypeofOperationL","SutureTypeL","ClampusedL","ExcessbleedingL","MarginfragmantseveredL","GlobePunctureL ","TypeofOperationR"," SutureTypeR","ClampusedR","ExcessbleedingR","MarginfragmantseveredR","GlobePunctureR","tetracyclineEyeOintmentL","tetracyclineEyeOintmentR", "azithromycinL","azithromycinR","ComplicationsReferralL","ComplicationsReferralR","complete","savedBy","user"];
  sep = '\n'
  headerSent = false
  startedOutput = false
  start({"headers":{"Content-Type" : "text/csv; charset=utf-8"}});
#  send('"' + headers.join('","') + '"\n');
#  send(headers + '"\n');
  send('"' + headers.join('","') + '"\n');
  assignValue = (row, header)->
    if row.value[headers[header]]
      if startedOutput
        send(",")
      value = row.value[headers[header]];
      if typeof(value) == "object"
        value = JSON.stringify(value)
      if typeof(value) == "string"
        value = value.replace(/\"/g, '""')
      send("\"" + value + "\"");
    else
      if (startedOutput)
        send(",")
    startedOutput = true;
    return true

  while row = getRow()
    assignValue row, header for header of headers
    startedOutput = false;
    send  '\n'
  return null


