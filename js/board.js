var board = {
  name: "Tablica Kanban",
  addColumn: function(column) {
    this.element.appendChild(column.element);
    initSortable(column.id);
  },
  element: document.querySelector("#board .column-container")
};

document.querySelector("#board .create-column").addEventListener("click", function() {
  var name = prompt("Enter a column name");
  if (name === null) {
    return;
  } else {
    var data = {
      name: name
    };

    fetch(baseUrl + "/column", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data)
    })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        var column = new Column(resp.id, name);
        board.addColumn(column);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});

function initSortable(id) {
  var el = document.getElementById(id);
  var sortable = Sortable.create(el, {
    group: "kanban",
    sort: true,
    handle: ".handle",
    animation: 150
  });
}