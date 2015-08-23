// This stuff will eventually come from the server
var allItemsCollection = new Backbone.Collection([
    { id: 0, item: "Walk the dog", isDone: false },
    { id: 1, item: "Schedule doctor's appointment", isDone: false },
    { id: 2, item: "Pee", isDone: false },
    { id: 3, item: "Peel potatoes", isDone: false },
    { id: 4, item: "Shave legs", isDone: false }
]);

var ItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<%= item %> | <button>X</button> | <button>Edit</button> | <button>√</button>'),
    render: function() {
        var attrs = this.model.attributes;
        var templateHtml = this.template(attrs);
        this.$el.html(templateHtml);
    }
});

var $items = $('.items');
allItemsCollection.forEach(function(itemModel) {
    var itemView = new ItemView({
        model: itemModel
    });
    $items.append(itemView.$el);
    itemView.render();
});
