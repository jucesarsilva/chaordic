/**
 * @author julio_c.silva@outlook.com
 * @since 10/06/2017
 */
;(function(Core, Requester, window) {
	'use strict';

    window.Chaordic = {
    	config: {
			id: 'chaordic',
			width: undefined,
			height: undefined,
			resizible: true,
			numbercards: 4,
			offset: 30,
			elements: {
				visit: 'visit',
				slider: 'slider',
				errorBox: 'error-box'
			}
		},
    	core: new Core(),
    	requester: new Requester()
    };
})(Core, Requester, window);