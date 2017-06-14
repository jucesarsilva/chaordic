describe( "chaordic.component", function () {
	var chaordic;

	beforeEach(function () {
		document.body.innerHTML = '<div id="chaordic"></div>'; 
		chaordic = new Chaordic({
							id: 'chaordic',
							width: undefined,
							height: undefined,
							resizible: true,
							numbercards: 4,
							offset: 30,
							url: 'http://roberval.chaordicsystems.com/challenge/challenge.json'
						});
	});

    describe( "functions definitions", function () {
    	it("should exist init()", function () {
        	expect(chaordic.init).toBeDefined();
    	});

    	it("should exist calculate()", function () {
        	expect(chaordic.calculate).toBeDefined();
    	});

    	it("should exist updateImgHeight()", function () {
        	expect(chaordic.updateImgHeight).toBeDefined();
    	});

    	it("should exist update()", function () {
        	expect(chaordic.update).toBeDefined();
    	});

    	it("should exist configElements()", function () {
        	expect(chaordic.configElements).toBeDefined();
    	});

    	it("should exist createVisit()", function () {
        	expect(chaordic.createVisit).toBeDefined();
    	});

    	it("should exist createSlider()", function () {
        	expect(chaordic.createSlider).toBeDefined();
    	});

    	it("should exist onRight()", function () {
        	expect(chaordic.onRight).toBeDefined();
    	});

    	it("should exist onLeft()", function () {
        	expect(chaordic.onLeft).toBeDefined();
    	});

    	it("should exist minimize()", function () {
        	expect(chaordic.minimize).toBeDefined();
    	});

    	it("should exist ready()", function () {
        	expect(chaordic.ready).toBeDefined();
    	});

    	it("should exist getData()", function () {
        	expect(chaordic.getData).toBeDefined();
    	});

    	it("should exist getXHR()", function () {
        	expect(chaordic.ready).toBeDefined();
    	});
    });

    describe( "minimize function", function () {
    	it("should substring when text bigger than 100 chars", function () {
    		var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris' + 
    		' ut turpis vestibulum, tristique libero quis, tristique quam. Donec feugiat id neque id'+
    		' viverra. Nunc ultricies, metus id congue commodo, urna ex convallis libero, sit amet '+
    		' vehicula quam justo pretium turpis. Sed id turpis vestibulum, commodo metus at, iaculis magna. '+
    		' Maecenas molestie malesuada erat id sodales. Pellentesque fringilla velit et.';
        	expect(chaordic.minimize(text).length).toEqual(103);
    	});
    });
});