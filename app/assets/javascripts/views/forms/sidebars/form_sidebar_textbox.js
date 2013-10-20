AFB.Views.FormSidebarTextbox = Backbone.View.extend({
  field: (JST['forms/fields/textbox']()),

  addField: function(){
    this.model.addField(this.field);
  },

  render: function(){
    console.log("rendering FormSidebarTextbox");
    this.$el.html(JST['forms/sidebars/textbox_options']({
      field: (this.options.field || this.field)
    }));

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextbox#updateValues");
    if ($(event.target).attr('name') === 'textbox-label' ){
      var name = 'results[' + event.target.value + ']'
      this.model.updateAttribute('.editing .textbox', 'name', name);
    }
    this.model.updateValues(event);
  }
})