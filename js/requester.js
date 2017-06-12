/**
 * @author julio_c.silva@outlook.com
 * @since 10/06/2017
 */
function Requester() {
	var _this = this;

	_this.url = "http://roberval.chaordicsystems.com/challenge/challenge.json";
	_this.url = "/js/mockup.json";

	var getXHR = function() {
		return new XMLHttpRequest;
	}
	
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

	_this.getData = function() {
		return new Promise(function (resolve, reject) {
			var request = getXHR();
			request.onreadystatechange = _onReady;
			request.open("GET", _this.url, true);
			request.responseType = "json";
			request.setRequestHeader('Access-Control-Allow-Headers', '*');
			request.send();

			function _onReady() {
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
	};
}