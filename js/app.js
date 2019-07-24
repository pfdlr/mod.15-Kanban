//Mustache template
function generateTemplate(name, data, basicElement) {
	var template = document.getElementById(name).innerHTML;
	var element = document.createElement(basicElement || 'div');

	Mustache.parse(template);
	element.innerHTML = Mustache.render(template, data);

	return element;
}
// OGÓLNA FUNKCJA
var prefix = "https://cors-anywhere.herokuapp.com/";
var baseUrl = prefix + 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '4241',
	'X-Auth-Token': '9f363cc65e90f9994ff68a36893eff0c',
	'Content-Type': 'application/json',
};
//query API data
fetch(prefix + baseUrl + '/board', { headers: myHeaders })
	.then(function (resp) {
		return resp.json();
	})
	.then(function (resp) {
		setupColumns(resp.columns);
	})
	.catch(function(error) {
        console.log(error);
      });
//set up colums from API data
function setupColumns(columns) {
	columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
		board.addColumn(col);
		setupCards(col, column.cards);
	});
}
//set up cards from API data
function setupCards(col, cards) {
	cards.forEach(function (card) {
    var cardObj = new Card(card.id, card.name);
  	col.addCard(cardObj);
	});
}