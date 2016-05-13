import * as React from 'react';

import {StreamBlock, streamBlockReducerBuilder} from './stream_block';
import {StructBlock, structBlockReducerBuilder} from './struct_block';
import {
    CharBlock,
    TextBlock,
    URLBlock,
    DateBlock,
    DateTimeBlock,
    PageChooserBlock,
    DocumentChooserBlock,
    SnippetChooserBlock,
    TimeBlock,
    BooleanBlock,
    RawHTMLBlock,
    RichTextBlock,
    ImageChooserBlock,
    ImageFormatChoiceBlock,
    ChoiceBlock,
    fieldBlockReducerBuilder
} from './field_block';


const BLOCK_TYPES_REGISTRY = {
    'wagtail.core.StreamBlock': StreamBlock,
    'wagtail.core.StructBlock': StructBlock,
    'wagtail.core.CharBlock': CharBlock,
    'wagtail.core.TextBlock': TextBlock,
    'wagtail.core.URLBlock': URLBlock,
    'wagtail.core.BooleanBlock': BooleanBlock,
    'wagtail.core.RawHTMLBlock': RawHTMLBlock,
    'wagtail.core.RichTextBlock': RichTextBlock,
    'wagtail.wagtailimages.ImageChooserBlock': ImageChooserBlock,
    'wagtail.core.ChoiceBlock': ChoiceBlock,
    'wagtail.core.DateBlock': DateBlock,
    'wagtail.core.DateTimeBlock': DateTimeBlock,
    'wagtail.core.TimeBlock': TimeBlock,
    'wagtail.core.PageChooserBlock': PageChooserBlock,
    'wagtail.wagtaildocs.DocumentChooserBlock': DocumentChooserBlock,
    'wagtail.wagtailsnippets.SnippetChooserBlock': SnippetChooserBlock,
};

const BLOCK_REDUCER_BUILDERS_REGISTRY = {
    'wagtail.core.StreamBlock': streamBlockReducerBuilder,
    'wagtail.core.StructBlock': structBlockReducerBuilder,
    'wagtail.core.CharBlock': fieldBlockReducerBuilder,
    'wagtail.core.TextBlock': fieldBlockReducerBuilder,
    'wagtail.core.URLBlock': fieldBlockReducerBuilder,
    'wagtail.core.RawHTMLBlock': fieldBlockReducerBuilder,
    'wagtail.core.BooleanBlock': fieldBlockReducerBuilder,
    'wagtail.core.RichTextBlock': fieldBlockReducerBuilder,
    'wagtail.wagtailimages.ImageChooserBlock': fieldBlockReducerBuilder,
    'wagtail.core.ChoiceBlock': fieldBlockReducerBuilder,
    'wagtail.core.DateBlock': fieldBlockReducerBuilder,
    'wagtail.core.TimeBlock': fieldBlockReducerBuilder,
    'wagtail.core.PageChooserBlock': fieldBlockReducerBuilder,
    'wagtail.wagtaildocs.DocumentChooserBlock': fieldBlockReducerBuilder,
    'wagtail.wagtailsnippets.SnippetChooserBlock': fieldBlockReducerBuilder,
};


// TEMPORARY: A placeholder to stop code from crashing due to missing blocks
class UnknownBlock extends React.Component {
    render() {
        return <p>yay</p>;
    }
}


export function renderBlock(store, value, schema, path) {
    const Component = BLOCK_TYPES_REGISTRY[schema.type] || UnknownBlock;
    return <Component store={store} value={value} schema={schema} path={path} />;
}


export function getBlockReducer(schema) {
    const builder = BLOCK_REDUCER_BUILDERS_REGISTRY[schema.type] || ((schema) => ((state, action) => state));
    return builder(schema);
}
