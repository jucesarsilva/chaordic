/**
 * @author julio_c.silva@outlook.com
 * @since 10/06/2017
 */
function Core() {
	'use strict';

	var _this = this;
	var slider = {
		width: undefined,
		height: undefined,
		card: {
			width: undefined,
			height: undefined,
		}
    };
    var config;
    var timer = null;
    var sliderElem;
    var visitElem;
    var chaordicElem;
    var errorBoxElem;
    var animatorElem;
    var margin = 200;
    var commandLeft;
    var commandRight;
    var pagination = {
    	offset: 0,
    	total: 0
    }
    var collection;

    var ready = function _ready() {
    	config = window.Chaordic.config;

    	window.Chaordic.requester.getData().then(function(res) {
    		collection = JSON.parse(JSON.stringify(res.data));
    		if (!configElements()) {
    			console.error("Ids do component não encontrados.");
    			return;
    		}
    		chaordicElem.classList.remove('hide');
    		chaordicElem.classList.add('show');
    		calculate();
    		createVisit();
    		createSlider();
    		setInterval(calculate, 100);
    	}, function(res) {
			errorBoxElem.classList.remove('hide');
			errorBoxElem.classList.add('show');
    	});
	}

    this.init = function _init() {
	    var attacher = document.addEventListener ? {
	        add: 'addEventListener',
	        remove: 'removeEventListener'
	    } : {
	        add: 'attachEvent',
	        remove: 'detachEvent'
	    };

	    function completed() {
	        document[attacher.remove]("DOMContentLoaded", completed);
	        window[attacher.remove]("load", completed);
	        ready();
	    }

	    if (document.readyState === "complete" ||
	        (document.readyState !== "loading" && !document.documentElement.doScroll)) {
	        ready();
	    } else {
	        document[attacher.add]("DOMContentLoaded", completed);
	        window[attacher.add]("load", completed);
	    }
	};

	this.init();

	function calculate() {
		slider.width = sliderElem.clientWidth;
		slider.height = sliderElem.clientHeight;

		var offset = (slider.width - (config.offset * config.numbercards));
		slider.card.width = offset / config.numbercards;
		slider.card.height = slider.card.width * 1.35;

		update();
	}

	function update() {
		var cards = document.getElementsByClassName("card");
		for (var i = 0; i < cards.length; i++) {
		    cards[i].style.width = (slider.card.width).toString() + 'px';
		    if (i === 0) cards[i].style.margin = 'auto';
		}

		var images = document.getElementsByTagName("img");
		for (var i = 0; i < images.length; i++) {
		    images[i].width = slider.card.width - 10;
			images[i].height = slider.card.height - 10;
		}

		commandLeft = document.getElementById('command-left');
		if (commandLeft) commandLeft.style.height = (slider.height + 15).toString() + 'px';
		commandRight = document.getElementById('command-right');
		if (commandRight) commandRight.style.height = (slider.height + 15).toString() + 'px';
	}

	function configElements() {
		chaordicElem = document.getElementById(config.id);
		visitElem = document.getElementById(config.elements.visit);
		sliderElem = document.getElementById(config.elements.slider);
		errorBoxElem = document.getElementById(config.elements.errorBox);
		animatorElem = document.getElementById(config.elements.animator);
		return chaordicElem && visitElem && sliderElem && errorBoxElem;
	}

	function createVisit() {
		var card = createCard();
		var img  = document.createElement("img");
		var img  = createImage(img, collection.reference.item.imageName);
		var link = document.createElement("a");
		link.href = collection.reference.item.detailUrl;
		link.appendChild(img);
		link = createDetails(link, 
			collection.reference.item.name, 
			collection.reference.item.oldPrice, 
			collection.reference.item.price, 
			collection.reference.item.productInfo.paymentConditions);
		card.appendChild(link);
		visitElem.appendChild(card);
	}

	function createSlider() {
		
		for (var i = 0, len = config.numbercards; i < len; i++) {
			var card = createCard();
			card.classList.add('slide-card');
			var img  = createImage(img, collection.recommendation[i].imageName);
			var link = document.createElement("a");
			link.href = collection.recommendation[i].detailUrl;
			link.appendChild(img);
			link = createDetails(link, 
			collection.recommendation[i].name, 
			collection.recommendation[i].oldPrice, 
			collection.recommendation[i].price, 
			collection.recommendation[i].productInfo.paymentConditions);
			card.appendChild(link);
			animatorElem.appendChild(card);
		}

		sliderElem.appendChild(animatorElem);

		createCommands();
	}

	function createCommands() {

		commandRight = document.createElement("div");
		commandRight.classList.add('command-right');
		commandRight.setAttribute("id", 'command-right');

		if (commandRight.addEventListener) {
	  		commandRight.addEventListener('click', onRight, false); 
		} else if (commandRight.attachEvent)  {
	 		commandRight.attachEvent('onclick', onRight);
		}
		
		commandLeft = document.createElement("div");
		commandLeft.classList.add('command-left');
		commandLeft.setAttribute("id", 'command-left');

		if (commandLeft.addEventListener) {
	  		commandLeft.addEventListener('click', onLeft, false); 
		} else if (commandLeft.attachEvent)  {
	 		commandLeft.attachEvent('onclick', onLeft);
		}

		sliderElem.appendChild(commandRight);
		sliderElem.appendChild(commandLeft);
	}

	function onRight(e) {
		animatorElem.classList.add('animation');
		animatorElem.classList.remove('left');
		animatorElem.classList.add('right');
		removeAnimation();
		pagination.offset += 1;
		if (pagination.offset > (collection.recommendation.length - config.numbercards)) {
			pagination.offset = collection.recommendation.length - config.numbercards;
		}
		sync();
	}

	function onLeft(e) {
		animatorElem.classList.add('animation');
		animatorElem.classList.remove('right');
		animatorElem.classList.add('left');
		removeAnimation();
		pagination.offset -= 1;
		if (pagination.offset < 0) {
			pagination.offset = 0;
		}
		sync();
	}

	function removeAnimation() {
		var loop = setTimeout(function() {
			clearTimeout(loop);
			animatorElem.classList.remove('left');
			animatorElem.classList.remove('right');
		}, 500);
	}

	function sync() {
		var details = document.querySelectorAll(".slide-card .detail");
		var oldPrices = document.querySelectorAll(".slide-card .old-price");
		var prices = document.querySelectorAll(".slide-card .price");
		var conditions = document.querySelectorAll(".slide-card .condition");
		var images = document.querySelectorAll(".slide-card img");
		var links = document.querySelectorAll(".slide-card a");
		var i = 0;
		for (var j = pagination.offset, len = config.numbercards + pagination.offset; j < len; j++) {
		    details[i].textContent = minimize(collection.recommendation[j].name);
	    	conditions[i].innerHTML = collection.recommendation[j].productInfo.paymentConditions;
			images[i].src = collection.recommendation[j].imageName;
			links.href = collection.recommendation[j].detailUrl;
	    	if (oldPrices[i]) {
	    		if (oldPrices[i].oldPrice)
					oldPrices[i].textContent = "De: " + collection.recommendation[j].oldPrice;
			}
	    	if (prices[i].oldPrice) {
				prices[i].innerHTML = "Por: " + '<span class="destaque">' + collection.recommendation[j].price + '</span>';
			} else {
				prices[i].innerHTML = collection.recommendation[j].price;
			}
			i++;
		}
	}

	function createCard() {
		var card = document.createElement("div"); 
		card.classList.add('card');
		card.style.width = (slider.card.width).toString() + 'px';
		return card;
	}

	function createImage(img, url) {
		var img  = document.createElement("img");
		img.src = url;
		img.width = slider.card.width - 10;
		img.height = slider.card.height - 10;
		return img;
	}

	function createDetails(link, detail, oldPrice, price, condition) {
		var _detail = document.createElement("p");
		_detail.textContent = minimize(detail);
		_detail.classList.add('tooltip');
		_detail.classList.add('content');
		_detail.classList.add('detail');
		_detail.setAttribute("data-tooltip", detail);
		link.appendChild(_detail);

		if (oldPrice) {
			var _oldPrice = document.createElement("p");
			_oldPrice.textContent = "De: " + oldPrice;
			_oldPrice.classList.add('content');
			_oldPrice.classList.add('old-price');
			link.appendChild(_oldPrice);
		}

		var _price = document.createElement("p");
		if (oldPrice) {
			_price.innerHTML = "Por: " + '<span class="destaque">' + price + '</span>';
			var span = document.createElement("span");
		} else {
			_price.innerHTML = price;
		}
		_price.classList.add('content');
		_price.classList.add('price');
		link.appendChild(_price);

		var _condition = document.createElement("p");
		_condition.innerHTML  = condition;
		_condition.classList.add('content');
		_condition.classList.add('condition');
		link.appendChild(_condition);

		link.target = "_blank";

		return link;
	}

	function minimize(text) {
		if (text) {
			return text.substring(0, 100).concat('...');
		} else {
			return '';
		}
	}

	window.onbeforeunload = function (e) {
		clearInterval(timer);
	};
}