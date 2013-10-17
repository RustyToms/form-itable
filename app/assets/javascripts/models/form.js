AFB.Models.Form = Backbone.Model.extend ({
  updateAttribute: function(selector, attribute, value){
    console.log("updating form attribute values");
    $form = $(this.get('form_text'));
    $form.find(selector).attr(attribute, value);
    this.set('form_text', $form.prop('outerHTML'));
  },

  updateHTML: function(selector, value){
    console.log("updating form element html");
		console.log(selector);
    $form = $(this.get('form_text'));
    $form.find(selector).html(value);
    this.set('form_text', $form.prop('outerHTML'));
  },
	
	updateCSS: function(selector, key, value){
		console.log("updating form element CSS");
		console.log(selector);
		console.log(key + ": " + value);
    $form = $(this.get('form_text'));
    $form.find(selector).css(key, value);
    this.set('form_text', $form.prop('outerHTML'));
	},

  removeActiveEdits: function(){
    console.log('removing all editing classes');
    var $form = $(this.get('form_text'));
    $form.find('.editing').removeClass('editing');
    $form.find('.delete-field').remove();

    $form.find('.start-editing').
      addClass('editing').
      removeClass('start-editing').
      append("<button class='delete-field'>X</button>");

    this.set('form_text', $form.prop('outerHTML'))
  },

  updateValues: function(event) {
    console.log("in formmodel#updateValues");

    var selector = '.editing .' + $(event.target).attr('name');
    var value = $(event.target).val();
    var attribute = $(event.target).data('attribute');
		var cssAttribute = $(event.target).data('css');

    if (attribute) {
      this.updateAttribute(selector, attribute, value);
    } else if(cssAttribute) {
			this.updateCSS(selector, cssAttribute, value);
		} else {
      this.updateHTML(selector, value);
    }
  },

  addField: function(field){
    var $form = $(this.get('form_text'));
    $form.append(field);
    this.set('form_text', $form.prop('outerHTML'));
  }
});