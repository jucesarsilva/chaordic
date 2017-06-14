/**
 * @author julio_c.silva@outlook.com
 * @since 10/06/2017
 */
function Chaordic(config) {
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
    var animatorElem;
    var margin = 200;
    var commandLeft;
    var commandRight;
    var pagination = {
    	offset: 0,
    	total: 0
    }
    var collection;

    this.init = init;
    this.calculate = calculate;
    this.updateImgHeight = updateImgHeight;
    this.update = update;
    this.configElements = configElements;
    this.createVisit = createVisit;
    this.createSlider = createSlider;
    this.onRight = onRight;
    this.onLeft = onLeft;
    this.minimize = minimize;
    this.ready = ready;
    this.getData = getData;
    this.getXHR;

    function ready() {
    	if(!config) {
    		console.error("Objeto de configuração não encontrado.");
    	}
    	
    	/**
    	 * overwrite url (API possui limitações de acesso no header: CORs)
    	 * para tanto um mock foi introduzido
    	 */
		config.url = "mockup.json";

		
    	_this.getData().then(function(res) {
    		collection = JSON.parse(JSON.stringify(res.data));
    		if (!_this.configElements()) return;
    		_this.calculate();
    		_this.createVisit();
    		_this.createSlider();
    		setInterval(calculate, 100);
    	}, function(res) {
    		console.error('Não foi possivel obter os dados do servidor.')
    	});
	}

    function init() {
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
	}

	function getXHR() {
		var isIE = !!document.attachEvent;
		
		if(isIE) {
		      var msxml = [
		        'MSXML2.XMLHTTP.3.0',
		        'MSXML2.XMLHTTP',
		        'Microsoft.XMLHTTP'
		      ];
			for (var i=0, len = msxml.length; i < len; ++i) {
		        try {
		          	getXHR = function() {
		            	return new ActiveXObject(msxml[i]);
		          	};
		          	break;
		        }
		        catch(e) {}
		    }
		};

		return new XMLHttpRequest;
	}

	function calculate() {
		slider.width = sliderElem.clientWidth;
		slider.height = sliderElem.clientHeight;

		var offset = (slider.width - (config.offset * config.numbercards));
		slider.card.width = offset / config.numbercards;
		slider.card.height = slider.card.width * 1.35;

		_this.update();
	}

	function updateImgHeight(images) {
		var img = images.firstChild;
		for (var i = 0; i < img.childNodes.length; i++) { 
		    if (img.childNodes[i].className === 'card-thumb') {
	    		img.childNodes[i].style.width = (parseInt(slider.card.width - 5)).toString() + 'px';
				img.childNodes[i].style.height = (parseInt(slider.card.height - 10)).toString() + 'px';
		    }    
		}
	}

	function update() {
		for (var i = 0; i < animatorElem.childNodes.length; i++) { 
		    if (animatorElem.childNodes[i].firstChild.className === 'card slide-card') {
	    		animatorElem.childNodes[i].firstChild.style.width = (parseInt(slider.card.width)).toString() + 'px';
	    		_this.updateImgHeight(animatorElem.childNodes[i].firstChild);
		    }    
		}

		for (var i = 0; i < visitElem.childNodes.length; i++) { 
		    if (visitElem.childNodes[i].firstChild.className === 'card slide-card') {
	    		visitElem.childNodes[i].firstChild.style.width = (parseInt(slider.card.width)).toString() + 'px';
	    		_this.updateImgHeight(visitElem.childNodes[i].firstChild);
		    }    
		}

		if (commandLeft) {
			commandLeft.style.height = (slider.height).toString() + 'px';
		}
		if (commandRight) {
			commandRight.style.height = (slider.height).toString() + 'px';
		}
	}

	function configElements() {
		chaordicElem = document.getElementById(config.id);

		if (!chaordicElem) {
			console.error("Não foi possivel obter o elemento do Id especificado.");
			return false;
		}

		chaordicElem.innerHTML = '<div class="container">' +
									'<div class="visit"></div>'+
									'<div class="slider">' +
										'<div class="animator"></div>' +
										'<div class="command-right"></div>' +
										'<div class="command-left"></div>' +
									'</div>' +
								'</div>';

		var container = chaordicElem.childNodes[0];

		for (var i = 0; i < container.childNodes.length; i++) { 
		    switch(container.childNodes[i].className) {
		    	case 'visit':
		    		visitElem = container.childNodes[i];
		    		break;
	    		case 'slider':
		    		sliderElem = container.childNodes[i];
		    		break;
		    }    
		}

		for (var i = 0; i < sliderElem.childNodes.length; i++) { 
		    switch(sliderElem.childNodes[i].className) {
		    	case 'animator':
		    		animatorElem = sliderElem.childNodes[i];
		    		break;
	    		case 'command-left':
		    		commandLeft = sliderElem.childNodes[i];
		    		if (commandLeft.addEventListener) {
				  		commandLeft.addEventListener('click', onLeft, false); 
					} else if (commandLeft.attachEvent)  {
				 		commandLeft.attachEvent('onclick', onLeft);
					}
		    		break;
	    		case 'command-right':
		    		commandRight = sliderElem.childNodes[i];
		    		if (commandRight.addEventListener) {
				  		commandRight.addEventListener('click', onRight, false); 
					} else if (commandRight.attachEvent)  {
				 		commandRight.attachEvent('onclick', onRight);
					}
		    		break;
		    }    
		}

		return chaordicElem;
	}

	function createVisit() {
		var template = '<div class="card slide-card" style="width:'+ slider.card.width +'px;">' +
							'<a href="'+ collection.reference.item.detailUrl +'" target="_blank">' +
								'<img class="card-thumb" src="'+ collection.reference.item.imageName +'">'+
								'</a>' +
								'<p class="tooltip content detail" data-tooltip="'+ collection.reference.item.name +'">'+ 
									minimize(collection.reference.item.name) +
								'</p>'+
								'<p class="content old-price">' +
									(collection.reference.item.oldPrice = !collection.reference.item.oldPrice ? '' : "De: " + collection.reference.item.oldPrice) +
								'</p>'+ 
								'<p class="content price">' +
									(collection.reference.item.price = !collection.reference.item.oldPrice ? collection.reference.item.price : "Por: " + '<span class="destaque">' + collection.reference.item.price + '</span>') +
								'</p>'+ 
								'<p class="content condition">' +
									collection.reference.item.productInfo.paymentConditions +
								'</p>'+ 
							'</a>' +
						'<div>';
		var card = document.createElement("div");
		card.innerHTML = template;
		visitElem.appendChild(card);	
	}

	function createSlider() {
		for (var i = 0, len = collection.recommendation.length; i < len; i++) {
		var template = '<div class="card slide-card" style="width:'+ slider.card.width +'px;">' +
							'<a href="'+ collection.recommendation[i].detailUrl +'" target="_blank">' +
								'<img class="card-thumb" src="'+ collection.recommendation[i].imageName + 
									 '" style="width:'+ (slider.card.width - 10) +'px;height:'+ (slider.card.height - 10) +'px;">'+
								'</a>' +
								'<p class="tooltip content detail" data-tooltip="'+ collection.recommendation[i].name +'">'+ 
									minimize(collection.recommendation[i].name) +
								'</p>'+
								'<p class="content old-price">' +
									(collection.recommendation[i].oldPrice = !collection.recommendation[i].oldPrice ? '' : "De: " + collection.recommendation[i].oldPrice) +
								'</p>'+ 
								'<p class="content price">' +
									(collection.recommendation[i].price = !collection.recommendation[i].oldPrice ? collection.recommendation[i].price : "Por: " + '<span class="destaque">' + collection.recommendation[i].price + '</span>') +
								'</p>'+ 
								'<p class="content condition">' +
									collection.recommendation[i].productInfo.paymentConditions +
								'</p>'+ 
							'</a>' +
						'<div>';	
			var card = document.createElement("div");
			card.innerHTML = template;
			animatorElem.appendChild(card);
		}
		sliderElem.appendChild(animatorElem);
	}

	function onRight(e) {
		pagination.offset += 1;
		if (pagination.offset > (collection.recommendation.length - config.numbercards)) {
			pagination.offset = collection.recommendation.length - config.numbercards;
		}
		var offset = animatorElem.clientWidth / collection.recommendation.length;
		animatorElem.classList.add('animation');
		var transform = 'translateX(-' + offset * pagination.offset + 'px)';
		animatorElem.style.webkitTransform = transform;
		animatorElem.style.MozTransform = transform;
		animatorElem.style.msTransform = transform;
		animatorElem.style.OTransform = transform;
		animatorElem.style.transform = transform;
	}

	function onLeft(e) {
		pagination.offset -= 1;
		if (pagination.offset < 0) {
			pagination.offset = 0;
		}
		var offset = animatorElem.clientWidth / collection.recommendation.length;
		animatorElem.classList.add('animation');
		var transform = 'translateX(-' + offset * pagination.offset + 'px)';
		animatorElem.style.webkitTransform = transform;
		animatorElem.style.MozTransform = transform;
		animatorElem.style.msTransform = transform;
		animatorElem.style.OTransform = transform;
		animatorElem.style.transform = transform;
	}

	function minimize(text) {
		if (text) {
			return text.substring(0, 100).concat('...');
		} else {
			return '';
		}
	}

	function getData() {
		return new Promise(function (resolve, reject) {
			var request = getXHR();
			request.onreadystatechange = onReady;
			request.open("GET", config.url, true);
			request.responseType = "json";
			request.setRequestHeader('Access-Control-Allow-Headers', '*');
			request.send();

			function onReady() {
				if(request.readyState == 4) {
	        		if(request.status === 200) {
	            		resolve(request.response);
	        		} else {
	        			var reason = new Error('Houve um problema ou obter os dados do servidor.');
            			reject(reason);
	        		}
    			}
			}
    	});
	}

	window.onbeforeunload = function (e) {
		clearInterval(timer);
	};

	this.init();
}