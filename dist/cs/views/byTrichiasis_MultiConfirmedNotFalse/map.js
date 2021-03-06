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
        emit(monthName + ' RefusedSurgery', 1);
      }
      if (doc.TypeofOperationL === 'BTRP') {
        emit(monthName + ' BTRP', 1);
        emit(monthName + ' BTRP-L', 1);
      }
      if (doc.TypeofOperationR === 'BTRP') {
        emit(monthName + ' BTRP', 1);
        emit(monthName + ' BTRP-R', 1);
      }
      if (doc.TypeofOperationL === 'Trabut') {
        emit(monthName + ' Trabut', 1);
        emit(monthName + ' Trabut-L', 1);
      }
      if (doc.TypeofOperationR === 'Trabut') {
        emit(monthName + ' Trabut', 1);
        emit(monthName + ' Trabut-R', 1);
      }
      if (doc.SutureTypeL === 'Silk') {
        emit(monthName + ' Silk', 1);
        emit(monthName + ' Silk-L', 1);
      }
      if (doc.SutureTypeR === 'Silk') {
        emit(monthName + ' Silk', 1);
        emit(monthName + ' Silk-R', 1);
      }
      if (doc.SutureTypeL === 'Absorbable') {
        emit(monthName + ' Absorbable', 1);
        emit(monthName + ' Absorbable-L', 1);
      }
      if (doc.SutureTypeR === 'Absorbable') {
        emit(monthName + ' Absorbable', 1);
        emit(monthName + ' Absorbable-R', 1);
      }
      if (doc.ClampusedL === 'true') {
        emit(monthName + ' Clampused', 1);
        emit(monthName + ' Clampused-L', 1);
      }
      if (doc.ClampusedR === 'true') {
        emit(monthName + ' Clampused', 1);
        emit(monthName + ' Clampused-R', 1);
      }
      if (doc.ComplicationsL === 'true') {
        emit(monthName + ' Complications', 1);
        emit(monthName + ' Complications-L', 1);
      }
      if (doc.ComplicationsR === 'true') {
        emit(monthName + ' Complications', 1);
        emit(monthName + ' Complications-R', 1);
      }
      if (doc.azithromycinL === 'true') {
        emit(monthName + ' Azithromycin', 1);
        emit(monthName + ' Azithromycin-L', 1);
      }
      if (doc.azithromycinR === 'true') {
        emit(monthName + ' Azithromycin', 1);
        emit(monthName + ' Azithromycin-R', 1);
      }
      if (doc.tetracyclineEyeOintmentL === 'true') {
        emit(monthName + ' tetracyclineEyeOintment', 1);
        emit(monthName + ' tetracyclineEyeOintment-L', 1);
      }
      if (doc.tetracyclineEyeOintmentR === 'true') {
        emit(monthName + ' tetracyclineEyeOintment', 1);
        return emit(monthName + ' tetracyclineEyeOintment-R', 1);
      }
    }
  }
});
