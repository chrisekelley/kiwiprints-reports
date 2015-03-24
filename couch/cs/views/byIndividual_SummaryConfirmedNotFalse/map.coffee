(doc)  ->
  if (doc.question == 'Individual Registration')
    if (doc.confirmed != "false")
      month = doc.createdAt.split(' ')[0].split('-')[1]
      monthName = '';
      if (month == '01')
        monthName = 'January';
      else
        monthName = 'February';

      emit(monthName + " " + doc.Gender, 1)

