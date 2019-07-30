function Column(id, name) {
  //var self = this;

  this.id = id;
  this.name = name || "No column name given";
  this.element = generateTemplate("column-template", { name: this.name, id: this.id });
  // Remove column
  this.element.querySelector(".column").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-delete")) {
      this.removeColumn();
    }
    // Add card
    if (event.target.classList.contains("add-card")) {
      var cardName = prompt("Enter the name of the card");
      event.preventDefault();
      if (cardName === null) {
        return;
      } else {
        var data = {
          name: cardName,
          bootcamp_kanban_column_id: this.id
        };
        fetch(baseUrl + "/card", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(data)
        })
          .then((res) => res.json())
          .then((resp) => {
            var card = new Card(resp.id, cardName);
            this.addCard(card);
          })
          .catch((error) =>  console.log(error));
      }
    } //end of addCard
  });
  //Rename column
  this.element.querySelector(".column-title").addEventListener("keydown", (event) => {
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
        this.renameColumn(data);
        el.blur();
        event.preventDefault();
      }
    }
  });
}

Column.prototype = {
  addCard: function (card) {
    this.element.querySelector("ul").appendChild(card.element);
  },
  removeColumn: function () {
    //var self = this;
    fetch(baseUrl + "/column/" + this.id, { method: "DELETE", headers: myHeaders })
      .then((resp) =>resp.json())
      .then((resp) => this.element.parentNode.removeChild(this.element))
      .catch((error) => console.log(error));
  },
  renameColumn: function (data) {
    //var self = this;
    fetch(baseUrl + "/column/" + this.id, { method: "PUT", headers: myHeaders, body: JSON.stringify(data) })
      .then((resp) => resp.json())
      .catch((error) => console.log(error))
  },
};
