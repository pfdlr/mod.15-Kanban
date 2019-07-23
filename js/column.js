function Column(id, name) {
  var self = this;

  this.id = id;
  this.name = name || "No column name given";
  this.element = generateTemplate("column-template", { name: this.name, id: this.id });
  // Remove column
  this.element.querySelector(".column").addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-delete")) {
      self.removeColumn();
    }
    // Add card
    if (event.target.classList.contains("add-card")) {
      var cardName = prompt("Enter the name of the card");
      event.preventDefault();
      if (name === null) {
        alert("Cancel pressed");
      } else {
        var data = {
          name: cardName,
          bootcamp_kanban_column_id: self.id
        };
        fetch(baseUrl + "/card", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(data)
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (resp) {
            var card = new Card(resp.id, cardName);
            self.addCard(card);
          });
      }
    } //end of addCard
  });
  //Rename column
  this.element.querySelector(".column-title").addEventListener("keydown", function (event) {
    var esc = event.which == 27,
      nl = event.which == 13,
      el = event.target,
      input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
      newText = el.innerHTML;
    data = {
      name: newText
    };

    if (input) {
      if (esc) {
        document.execCommand('undo');
        el.blur();
      } else if (nl) {
        self.renameColumn(data);
        el.blur();
        event.preventDefault();
      }
    }
  });
////////////////////////

/////////////////////////
}


Column.prototype = {
  addCard: function (card) {
    this.element.querySelector("ul").appendChild(card.element);
  },
  removeColumn: function () {
    var self = this;
    fetch(baseUrl + "/column/" + self.id, { method: "DELETE", headers: myHeaders })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (resp) {
        self.element.parentNode.removeChild(self.element);
      });
  },
  renameColumn: function (data) {
    var self = this;
    fetch(baseUrl + "/column/" + self.id, { method: "PUT", headers: myHeaders, body: JSON.stringify(data) })
      .then(function (resp) {
        return resp.json();
      })
  },
};
