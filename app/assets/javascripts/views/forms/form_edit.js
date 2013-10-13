AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
    "click #save-button" : "serverSaveForm"
  },

  initialize: function(){
    this.parentView = this.options.parentView;
    var that = this;
    console.log('FormEdit View initialized');
    this.listenTo(this.model, 'change', function(){
      that.render();
    });
  },

  render: function(){
    console.log("rendering FormEdit view");
    // var formText = (this.model.get('form_text'));
		var formText = this.parseFields();
		
    if(this.$el.find('.form-edit-box').html()){
      console.log("replacing previous text")
      this.$el.find('.form-edit-box').replaceWith(formText);
    } else {
      console.log("adding formText for the first time")
      this.$el.prepend(formText);
    }

    return this;
  },

  localSaveForm: function(){
    var $form = this.$el.find('.form-edit-box');
    var form = $form.prop('outerHTML');
    this.model.set('form_text', form);
  },

  serverSaveForm: function(){
    var name = $(this.model.get('form_text')).find('#formName').html();
    this.model.set('name', name);
    this.model.save({},{
      success: function(response){
        console.log("save successful");
      },
      error: function(response){
        console.log("error");
        console.log(response);
        console.log(response.errors.full_messages)
      }
    });
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");

    $formEl = $(event.target).closest(".formEl");
    $formEl.addClass("start-editing");
    this.localSaveForm();
    AFB.Views.FormMaster.removeActiveEdits(this.model);

    var sidebarName = $formEl.data("sidebar");
    console.log("new sidebar should be " + sidebarName);
    sidebar = new AFB.Views[sidebarName]({
      model: this.model,
      field: $formEl
    });
    this.parentView.render(sidebar);
  },
	
	parseFields: function(){
		console.log("in FormEdit View parseFields");
		that = this;
		var fields = this.model.get('fields');
		var formField = fields.shift();
		var $form = $(this.parseField(formField));
		var formText = "";
		
		console.log(fields);
		
		_.each(fields, function(field) {
			console.log("field is");
			console.log(field);
			formText = formText.concat(that.parseField(field));	
		});
		console.log ("formText from parseFields is " + formText);
		
		$form.html(formText);
		return $form.prop('outerHTML');
	},
	
	parseField: function(field) {
		console.log("parsing field")
		var that = this;
		var $fieldText = $(field.get('outerHtml'));
		 
		_.each(field.get('fieldAttr'), function(f) {
			f.call($fieldText);
		});
		console.log("finished adding field attributes");
		var childHtml = "";
		_.each(field.get('kids'), function(kid){
			console.log("kid is");
			console.log(kid);
			childHtml = childHtml.concat(that.parseField(kid));
		});
		console.log(childHtml);
		$fieldText.html(field.get('innerHtml').concat(childHtml));
		console.log("finished setting html");
		console.log($fieldText.html());
		console.log($fieldText.prop('outerHTML') || "");
		return ($fieldText.prop('outerHTML') || "");
	}
});
