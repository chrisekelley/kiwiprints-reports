(doc) ->
  if doc.question == "Individual Registration"
    emit [doc._id, 0], doc
  else if doc.question == "Trichiasis Surgery"
    emit [doc.clientId, 1], doc

