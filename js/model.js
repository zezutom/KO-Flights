function WizardViewModel() {
  var self = this;
  
  // Wizard Data
  self.steps = ['Personal Details', 'Seat Selection', 'Extras', 'Summary'];
  self.selectedStep = ko.observable();

  self.availableSeats = [
    {location: 'Anywhere is fine', price: 5},  
    {location: 'That dark corner', price: 20},  
    {location: 'Get me a sofa!', price: 500}  
  ];

  self.movies = [
    {name: 'Frankenweenie', price: 10},  
    {name: 'The Amazing Spider-Man', price: 10},  
    {name: 'Wreck-it Ralph', price: 10}  
  ];
  self.movie = ko.observable(self.movies[0]);
  
  self.headsets = [
    {name: 'Standard', price: 5},
    {name: 'Waterproof', price: 15},
    {name: '4D-Experience', price: 50}
  ];
  self.headset = ko.observable(self.headsets[0]);

  self.vehicles = [
	{name: 'No thanks, just let me go', price: 0},
	{name: 'Get me a bike', price: 5},
	{name: 'An amazing 17-century buggy', price: 40},
	{name: 'A Roadster and shades', price: 60}
  ];

  // Booking Data
  self.personalDetails = {
    firstName: ko.observable("Kermit"),
    lastName: ko.observable("The Frog")			   
  };

  self.seat = ko.observable(self.availableSeats[0]);

  self.extras = {
    movie: ko.observable(self.movies[0]),
    headset: ko.observable(self.headsets[0]),
	vehicle: ko.observable(self.vehicles[0])
  };

  self.bookings = ko.observableArray([]);

  // Behaviours
  self.showPersonalDetails = ko.observable(false);
  self.showSeatSelection = ko.observable(false);
  self.showExtras = ko.observable(false);
  self.showSummary = ko.observable(false);
  self.showBack = ko.observable(false);
  self.showNext = ko.observable(true);
  self.showSend = ko.observable(false);

  self.selectStep = function(step) {	
	if (step == self.steps[1]) {
	  var personalDetailsForm = $("#personalDetails");

	  // Trigger validation
	  personalDetailsForm.validate();
	  if (!personalDetailsForm.valid()) {		  
	    return; 
	  }
	}

	self.selectedStep(step);
	
	// Show the appropriate form
	self.showPersonalDetails(step == self.steps[0]);
	self.showSeatSelection(step == self.steps[1]);
	self.showExtras(step == self.steps[2]);
	self.showSummary(step == self.steps[3]);
	self.showBack(step != self.steps[0]);
	self.showNext(step != self.steps[3]);
	self.showSend(step == self.steps[3]);
  };

  // Show 'Personal Details' by default
  self.selectStep('Personal Details');

  self.takeNextStep = function() {
	  var step = self.steps[0];	  
	  
	  if (self.showPersonalDetails()) {
	    step = self.steps[1];
	  } else if (self.showSeatSelection()) {
	    step = self.steps[2];
	  } else {
	    step = self.steps[3];
	  }     
	  self.selectStep(step);
  };

  self.stepBack = function() {
    var step = self.steps[0];

	if (self.showSummary()) {
	  step = self.steps[2];
	} else if (self.showExtras()) {
	  step = self.steps[1];
	}
	self.selectStep(step);
  };

  self.addBooking = function() {
	self.bookings.push("You have just booked!");
	self.showSend(false);

	// Highligh the new message
	self.animateMailbox();
  }

  self.animateMailbox = function() {
    var mailbox = $("#mailbox");
	for (var i = 0; i < 3; i++) {
	  mailbox.fadeTo("slow", 0.25);
	  mailbox.fadeTo("slow", 1);
	}
  }
};
    
ko.applyBindings(new WizardViewModel());

