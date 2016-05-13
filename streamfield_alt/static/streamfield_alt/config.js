import StreamBlock from './components/StreamBlock';
// import StructBlock from './';
import CharBlock from './components/CharBlock';
import TextBlock from './components/TextBlock';
import URLBlock from './components/URLBlock';
import DateBlock from './components/DateBlock';
import DateTimeBlock from './components/DateTimeBlock';
import PageChooserBlock from './components/PageChooserBlock';
import DocumentChooserBlock from './components/DocumentChooserBlock';
import SnippetChooserBlock from './components/SnippetChooserBlock';
import TimeBlock from './components/TimeBlock';
import BooleanBlock from './components/BooleanBlock';
import RawHTMLBlock from './components/RawHTMLBlock';
import RichTextBlock from './components/RichTextBlock';
import ImageChooserBlock from './components/ImageChooserBlock';
import ChoiceBlock from './components/ChoiceBlock';


export const BLOCK_TYPES_REGISTRY = {
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

// export const BLOCK_REDUCER_BUILDERS_REGISTRY = {
//     'wagtail.core.StreamBlock': streamBlockReducerBuilder,
//     'wagtail.core.StructBlock': structBlockReducerBuilder,
//     'wagtail.core.CharBlock': fieldBlockReducerBuilder,
//     'wagtail.core.TextBlock': fieldBlockReducerBuilder,
//     'wagtail.core.URLBlock': fieldBlockReducerBuilder,
//     'wagtail.core.RawHTMLBlock': fieldBlockReducerBuilder,
//     'wagtail.core.BooleanBlock': fieldBlockReducerBuilder,
//     'wagtail.core.RichTextBlock': fieldBlockReducerBuilder,
//     'wagtail.wagtailimages.ImageChooserBlock': fieldBlockReducerBuilder,
//     'wagtail.core.ChoiceBlock': fieldBlockReducerBuilder,
//     'wagtail.core.DateBlock': fieldBlockReducerBuilder,
//     'wagtail.core.TimeBlock': fieldBlockReducerBuilder,
//     'wagtail.core.PageChooserBlock': fieldBlockReducerBuilder,
//     'wagtail.wagtaildocs.DocumentChooserBlock': fieldBlockReducerBuilder,
//     'wagtail.wagtailsnippets.SnippetChooserBlock': fieldBlockReducerBuilder,
// };
