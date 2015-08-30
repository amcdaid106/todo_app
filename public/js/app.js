// This stuff will eventually come from the server
var ItemModel = Backbone.Model.extend({
    defaults: {
        isDone: false
    }
});

var ItemsCollection = Backbone.Collection.extend({
    model: ItemModel,
    url: '/items'
});

var allItemsCollection = new ItemsCollection();
allItemsCollection.fetch();

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
        this.model.destroy();
        this.remove();
    },
    editItem: function(e) {
        var item = this.model.get('item');
        var newItem = prompt('Edit item below', item);
        this.update('item', newItem);
    },
    itemDone: function(e) {
        var isDone = this.model.get('isDone');
        this.update('isDone', !isDone);
    },
    update: function(key, val) {
        this.model.set(key, val);
        this.model.sync('update', this.model, {silent: true});
        this.render();        
    }
});

var $items = $('.items');

function createItemView(itemModel) {
    var itemView = new ItemView({
        model: itemModel
    });
    $items.append(itemView.el);
    itemView.render();
}

allItemsCollection.on('sync', function(model, response, options) {
    if (model.models) {
        model.forEach(createItemView);
    } else {
        createItemView(model);
    }
});


var $textarea = $('textarea');

$textarea.focus();

var returnKey = 13;

$textarea.on('keyup', function(e) {
    if (e.which === returnKey) {
        var newItem = $textarea.val().trim();
        allItemsCollection.create({
            item: newItem
        });
        $textarea.val('');
    }
});


