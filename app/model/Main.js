Ext.define('test2.model.Main', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['id', 'sencha_text'],

        proxy: {
            type: 'ajax',
            url: 'data/sencha.json',
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    }
});