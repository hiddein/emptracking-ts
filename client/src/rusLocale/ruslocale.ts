export const rusLocale = {
  toolbarExport: "Экспорт",
  toolbarExportLabel: "Экспорт",
  toolbarExportCSV: "Экспорт в CSV",
  // Filters toolbar button text
  toolbarFilters: "Фильтр",
  toolbarFiltersLabel: "Показать фильтры",
  toolbarFiltersTooltipHide: "Спрятать фильтры",
  toolbarFiltersTooltipShow: "Показать фильтры",
  toolbarFiltersTooltipActive: (count: any) =>
    count !== 1 ? `${count} активных фильтров` : `${count} активный фильтр`,
  // Filter panel text
  filterPanelAddFilter: "Добавить фильтр",
  filterPanelDeleteIconLabel: "Удалить",
  filterPanelOperators: "Оператор",
  filterPanelOperatorAnd: "И",
  filterPanelOperatorOr: "ИЛИ",
  filterPanelColumns: "Столбец",
  filterPanelInputLabel: "Значение",
  filterPanelInputPlaceholder: "Параметр фильтра",
  // Filter operators text
  filterOperatorContains: "содержит",
  filterOperatorEquals: "равен",
  filterOperatorStartsWith: "начинается с",
  filterOperatorEndsWith: "заканчивается на",
  filterOperatorIs: "равен",
  filterOperatorNot: "не равен",
  filterOperatorAfter: "после",
  filterOperatorOnOrAfter: "включает или после",
  filterOperatorBefore: "перед",
  filterOperatorOnOrBefore: "включает или перед",
   // Root
   rootGridLabel: 'Таблица',
   noRowsLabel: 'Нет совпадений',
   errorOverlayDefaultLabel: 'An error occurred.',
}
export const rusLocaleChart = {
  "name": "RU",
  "options": {
    "months": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    "shortMonths": ["Янв", "Фев", "Мар", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "shortDays": ["Вск", "Пн", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
    "toolbar": {
        "exportToSVG": "Загрузить SVG",
        "exportToPNG": "Загрузить PNG",
        "exportToCSV": "Загрузить CSV",
        "menu": "Меню",
        "selection": "Выбор",
        "selectionZoom": "Лупа",
        "zoomIn": "Приблизить",
        "zoomOut": "Отдалить",
        "pan": "Переместить",
        "reset": "Сброс"
    }
  }
}