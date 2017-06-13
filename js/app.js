/**
 * @author julio_c.silva@outlook.com
 * @since 10/06/2017
 */
;(function(Chaordic, window) {
	'use strict';

    window.app = new Chaordic({
							id: 'chaordic',
							width: undefined,
							height: undefined,
							resizible: true,
							numbercards: 4,
							offset: 30,
							url: 'http://roberval.chaordicsystems.com/challenge/challenge.json'
						});

    window.another = new Chaordic({
							id: 'another',
							width: undefined,
							height: undefined,
							resizible: true,
							numbercards: 4,
							offset: 30,
							url: 'http://roberval.chaordicsystems.com/challenge/challenge.json'
						});

})(Chaordic, window);