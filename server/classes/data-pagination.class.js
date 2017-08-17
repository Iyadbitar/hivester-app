var DataPagination = function() {};

DataPagination.DEFAULT_PAGE_SIZE = 50;

DataPagination.prototype.getPage = function(data, page, pageSize){
  var start, end;
  var meta = {};

  pageSize = pageSize || DataPagination.DEFAULT_PAGE_SIZE;
  totalPages = Math.ceil(data.length / pageSize);

  if(page > totalPages) page = totalPages;
  if(page < 1) page = 1;

  start = (page-1) * pageSize;
  end = start + pageSize;

  meta.pageSize = pageSize;
  meta.pagesTotal = totalPages;
  meta.page = page;
  meta.total = data.length;
  meta.startIndex = start;
  meta.endIndex = end;

  return { meta: meta, data: data.slice( start , end ) };
}

module.exports = DataPagination;
