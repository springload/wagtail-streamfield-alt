import json

from django.core.serializers.json import DjangoJSONEncoder
from django.core.exceptions import ValidationError

from wagtail.wagtailadmin.edit_handlers import BaseFieldPanel

from .schema import get_block_schema


class BaseStreamFieldPanel(BaseFieldPanel):
    object_template = "streamfield_alt/streamfield.html"

    def classes(self):
        classes = super(BaseStreamFieldPanel, self).classes()
        classes.append("stream-field")

        # In case of a validation error, BlockWidget will take care of outputting the error on the
        # relevant sub-block, so we don't want the stream block as a whole to be wrapped in an 'error' class.
        if 'error' in classes:
            classes.remove("error")

        return classes

    def parse_blocks(self, json_obj, source_obj):
        to_arr = []
        if isinstance(json_obj['value'], dict) and hasattr(source_obj, 'child_blocks') and source_obj.child_blocks:
            for child_name, child_block in source_obj.child_blocks.items():
                to_arr.append(self.parse_blocks(json_obj, child_block))
            return to_arr
        else:
            if isinstance(json_obj['value'], dict):
                value = json_obj['value'][source_obj.name]
            else:
                value = json_obj['value']

            # TODO: find a better way to access the error messages for each field...
            error = []
            try:
                source_obj.field.clean(value)
            except ValidationError as e:
                error = e.messages

            return {
                'type': source_obj.name,
                'value': value,
                'errors': error,
            }

    def get_data_json(self):
        value = self.bound_field.value()
        json_value = self.block_def.get_prep_value(value)

        # this is to keep the order of children on complex blocks
        for obj in json_value:
            source_obj = self.block_def.child_blocks[obj['type']]
            if obj['type'] == source_obj.name:
                values = self.parse_blocks(json_obj=obj, source_obj=source_obj)
                if isinstance(obj['value'], dict):
                    obj['value'] = values
                else:
                    obj.update(values)

        return json.dumps(json_value, cls=DjangoJSONEncoder)

    @classmethod
    def get_schema_json(cls):
        return json.dumps(get_block_schema(cls.block_def))


class StreamFieldPanel(object):
    def __init__(self, field_name, min_num=None, max_num=None):
        self.field_name = field_name
        self.min_num = min_num
        self.max_num = max_num

    def bind_to_model(self, model):
        return type(str('_StreamFieldPanel'), (BaseStreamFieldPanel,), {
            'model': model,
            'field_name': self.field_name,
            'block_def': model._meta.get_field(self.field_name).stream_block,
            'min_num': self.min_num,
            'max_num': self.max_num,
        })
