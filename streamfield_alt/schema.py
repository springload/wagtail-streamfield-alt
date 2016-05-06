from wagtail.wagtailcore import blocks
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtaildocs.blocks import DocumentChooserBlock
from wagtail.wagtailsnippets.blocks import SnippetChooserBlock

from collections import OrderedDict

class UnrecogisedBlockTypeError(RuntimeError):
    pass


def get_block_schema(block):
    if isinstance(block, blocks.StreamBlock):
        child_blocks = OrderedDict()
        for name, child_block in block.child_blocks.items():
            child_blocks[name] = get_block_schema(child_block)

        return {
            'type': 'wagtail.core.StreamBlock',
            'label': block.label,
            'child_blocks': child_blocks,
            'default_value': [],
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.StructBlock):
        return {
            'type': 'wagtail.core.StructBlock',
            'label': block.label,
            'child_blocks': {
                name: get_block_schema(child_block)
                for name, child_block in block.child_blocks.items()
            },
            'default_value': {
                name: get_block_schema(child_block)['default_value']
                for name, child_block in block.child_blocks.items()
            },
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.ListBlock):
        return {
            'type': 'wagtail.core.ListBlock',
            'label': block.label,
            'child_block': get_block_schema(block.child_block),
            'default_value': [],
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.CharBlock):
        return {
            'type': 'wagtail.core.CharBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'max_length': block.field.max_length,
            'min_length': block.field.min_length,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.TextBlock):
        return {
            'type': 'wagtail.core.TextBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'max_length': block.field.max_length,
            'min_length': block.field.min_length,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.URLBlock):
        return {
            'type': 'wagtail.core.URLBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'max_length': block.field.max_length,
            'min_length': block.field.min_length,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.BooleanBlock):
        return {
            'type': 'wagtail.core.BooleanBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.DateBlock):
        return {
            'type': 'wagtail.core.DateBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.TimeBlock):
        return {
            'type': 'wagtail.core.TimeBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.DateTimeBlock):
        return {
            'type': 'wagtail.core.DateTimeBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.ChoiceBlock):
        return {
            'type': 'wagtail.core.ChoiceBlock',
            'label': block.label,
            'choices': block.field.choices,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.RichTextBlock):
        return {
            'type': 'wagtail.core.RichTextBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.RawHTMLBlock):
        return {
            'type': 'wagtail.core.RawHTMLBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.PageChooserBlock):
        return {
            'type': 'wagtail.core.PageChooserBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, ImageChooserBlock):
        return {
            'type': 'wagtail.images.ImageChooserBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, DocumentChooserBlock):
        return {
            'type': 'wagtail.documents.DocumentChooserBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, SnippetChooserBlock):
        return {
            'type': 'wagtail.snippets.SnippetChooserBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    elif isinstance(block, blocks.FieldBlock):
        return {
            'type': 'wagtail.core.FieldBlock',
            'label': block.label,
            'required': block.field.required,
            'help_text': block.field.help_text,
            'default_value': block.meta.default,
            'classname': block.meta.classname,
            'icon': block.meta.icon,
        }
    else:
        raise UnrecogisedBlockTypeError()
