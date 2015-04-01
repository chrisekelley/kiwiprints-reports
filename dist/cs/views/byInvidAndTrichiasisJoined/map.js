(function(doc) {
  if (doc.question === "Individual Registration") {
    return emit([doc._id, 0], doc);
  } else if (doc.question === "Trichiasis Surgery") {
    return emit([doc.clientId, 1], doc);
  }
});
