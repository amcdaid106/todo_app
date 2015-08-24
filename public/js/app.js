// This stuff will eventually come from the server
var ItemModel = Backbone.Model.extend({
    defaults: {
        isDone: false
    }
});

var ItemsCollection = Backbone.Collection.extend({
    model: ItemModel
});

var allItemsCollection = new ItemsCollection([
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

function createItemView(itemModel) {
    var itemView = new ItemView({
        model: itemModel
    });
    $items.append(itemView.$el);
    itemView.render();
}

allItemsCollection.forEach(createItemView);

allItemsCollection.on('add', createItemView);

var $textarea = $('textarea');
$textarea.focus();
$textarea.on('keyup', function(e) {
    if (e.which === 13) {
        var newItem = $textarea.val().trim();
        allItemsCollection.add({
            item: newItem
        });
        $textarea.val('');
    }
});