describe("Example", function() {

  beforeEach(module("openTableApp.controllers"));

  beforeEach(inject(function($injector) {
    this.get = $injector.get
  }))
    
  it("injector should exist", function() {
    expect(this.get).toBeTruthy()
  });

});
