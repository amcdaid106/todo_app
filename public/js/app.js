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
    { id: 2, item: "Pee", isDone: true },
    { id: 3, item: "Peel potatoes", isDone: false },
    { id: 4, item: "Shave legs", isDone: false }
]);

var ItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<%= item %> | <button class="delete">X</button> | <button class="edit">Edit</button> | <button class="done">√</button>'),
    render: function() {
        var attrs = this.model.attributes;
        var templateHtml = this.template(attrs);
        this.$el.html(templateHtml);

        var isDone = this.model.get('isDone');
        if (isDone) {
            this.$el.css('text-decoration', 'line-through');
        } else {
            this.$el.css('text-decoration', 'none');
        }
    },
    events: {
        'click .delete': 'deleteItem',
        'click .edit': 'editItem',
        'click .done': 'itemDone'
    },
    deleteItem: function(e) {
        this.model.collection.remove(this.model);
        this.remove();
    },
    editItem: function(e) {
        var item = this.model.get('item');
        var newItem = prompt('Edit item below', item);
        this.model.set('item', newItem);
        this.render();
    },
    itemDone: function(e) {
        var isDone = this.model.get('isDone');
        this.model.set('isDone', !isDone);
        this.render();
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


