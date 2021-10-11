var typeahead = {};
typeahead.ready = false;

var dataXHR = new XMLHttpRequest() || new window.ActiveXObject("Microsoft.XMLHTTP");
dataXHR.open('GET', '/typeahead.json', true);
dataXHR.send(null);
dataXHR.onreadystatechange = function() {
    if (this.status === 200 && this.readyState === 4) {
        // this.response = this.response.replace("'", '')..replace("'", '');
        typeahead.data = JSON.parse(this.response);
        typeahead.ready = true;
    }
};

typeahead.search = function(keyword, itemType = 0) {
    var outputdata = [];

    keyword = decodeURIComponent(keyword).toLowerCase();

    if (typeahead.ready) {
        for (var i = 0; i < typeahead.data.length; i++) {
            var item = typeahead.data[i];
            if ((itemType == 0 || item.itemType == itemType) && (item.title.toLowerCase().indexOf(keyword) != -1 || item.extraFields.toLowerCase().indexOf(keyword) != -1)) {
                outputdata.push({
                    id: item.pageUrl,
                    value: item.title
                });
            }
        }
    }

    return outputdata;
}