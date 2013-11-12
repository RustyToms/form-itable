AFB.Views.FormSidebarInputs = Backbone.View.extend({
  initialize: function(){
    console.log("initializing FormSidebarInputs view");
    this.$el = $(JST['forms/sidebars/inputs']());
  },

  render: function(){
    console.log('rendering FormSidebarInputs');
    return this;
  },

  makeSidebarView: function(event) {
    console.log("in FormSidebarInputs#makeSidebarView");
    var that = this;
    // event.preventDefault();
    var fieldChoices = {
      "textbox" : "FormSidebarTextbox",
      "checkbox" : "FormSidebarCheckbox",
      "telnum" : "FormSidebarTelnum",
      "dropdown" : "FormSidebarDropdown",
      "textarea" : "FormSidebarTextarea",
      "numbox" : "FormSidebarNumbox",
      "radio" : "FormSidebarRadio",
      "text" : "FormSidebarText",
      "otherForm": "OtherForm"
    };

    var selection = $(event.target).closest('div').data('inputType');
    if(!selection){
      console.log("no target");
      return;
    }
    return (new AFB.Views[fieldChoices[selection]]({
      model: that.model
    }));
  }
});