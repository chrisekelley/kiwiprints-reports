(function(doc) {
  var month, monthName;
  if (doc.question === 'Trichiasis Surgery') {
    if (doc.confirmed !== "false") {
      month = doc.createdAt.split(' ')[0].split('-')[1];
      monthName = '';
      if (month === '01') {
        monthName = 'January';
      } else {
        monthName = 'February';
      }
      if (doc.RefusedSurgeryL === 'true') {
        emit(monthName + 'RefusedSurgery', 1);
      }
      if (doc.RefusedSurgeryR === 'true') {
        emit(monthName + 'RefusedSurgery', 1);
      }
      if (doc.RefusedSurgeryL === null) {
        emit(monthName + 'RefusedSurgery', 0);
      }
      if (doc.RefusedSurgeryR === null) {
        emit(monthName + 'RefusedSurgery', 0);
      }
      if (doc.ProvidedEpilationConsultationL === 'true') {
        emit(monthName + 'ProvidedEpilationConsultation', 1);
      }
      if (doc.ProvidedEpilationConsultationR === 'true') {
        emit(monthName + 'ProvidedEpilationConsultation', 1);
      }
      if ((doc.RefusedSurgeryL === null) && (doc.RefusedSurgeryR === null)) {
        emit(monthName + 'Surgeries', 1);
      }
      if (doc.TypeofOperationL === null && doc.TypeofOperationR !== null) {
        emit(monthName + 'Lateral', 1);
      }
      if (doc.TypeofOperationL !== null && doc.TypeofOperationR === null) {
        emit(monthName + 'Lateral', 1);
      }
      if (doc.TypeofOperationL !== null && doc.TypeofOperationR !== null) {
        return emit(monthName + 'BiLateral', 1);
      }
    }
  }
});
