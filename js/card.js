// KLASA KANBAN CARD
function Card(id, name) {
  var self = this;

  this.id = id;
  this.name = name || "No card name given";
  this.element = generateTemplate("card-template", { description: this.name }, "li");

  this.element.querySelector(".card").addEventListener("click", function(event) {
    event.stopPropagation();

    if (event.target.classList.contains("btn-delete")) {
      self.removeCard();
    }
  });
  //Rename card
  this.element.querySelector(".card-description").addEventListener("keydown", function(event) {
    var esc = event.which == 27,
      nl = event.which == 13,
      el = event.target,
      input = el.nodeName != "INPUT" && el.nodeName != "TEXTAREA",
      newText = el.innerHTML;
    var colId = this.parentElement.parentElement.parentElement.id;
    data = {
      name: newText,
      bootcamp_kanban_column_id: colId
    };

    if (input) {
      if (esc) {
        document.execCommand("undo");
        el.blur();
      } else if (nl) {
        self.modifyCard(data);
        el.blur();
        event.preventDefault();
      }
    }
  });
  //Move card
  this.element.ondragend = function() {
    data = {
      name: self.name,
      bootcamp_kanban_column_id: targetColId
    };
    self.modifyCard(data);
  }
}

Card.prototype = {
  removeCard: function() {
    var self = this;

    fetch(baseUrl + "/card/" + self.id, { method: "DELETE", headers: myHeaders })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  modifyCard: function(data) {
    var self = this;
    fetch(baseUrl + "/card/" + self.id, { method: "PUT", headers: myHeaders, body: JSON.stringify(data) })
      .then(function(resp) {
        return resp.json();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
