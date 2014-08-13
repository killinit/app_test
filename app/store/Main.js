Ext.define('test2.store.Main', {
    extend: 'Ext.data.Store',
    requires: 'test2.model.Main',

    config: {
        model: 'test2.model.Main'
    }
});