import React from 'react'
// import { BLOCK_TYPES_REGISTRY } from '../config';

export default class StructBlock extends React.Component {
    constructor(props) {
        super(props);
        this.renderBlock = this.renderBlock.bind(this);
    }

    renderBlock(value, schema, path, errors, preview) {
        const Component = this.props.types[schema.type];
        console.log(Component, schema, schema.type, this.props.types);

        return <Component
            value={value}
            schema={schema}
            path={path}
            errors={errors}
            preview={preview}
        />;
    }

    render() {
        const fields = [];

        for (let idx in this.props.value) {
            const field = this.props.value[idx];
            const value = field.value;
            const preview = field.preview;
            const errors = field.errors;
            const schema = this.props.schema.child_blocks[field.type];
            const path = `${this.props.path}-${field.type}`;

            fields.push(
                <li key={path}>
                    <label for={path}>{schema.label}</label>
                    {this.renderBlock(value, schema, path, errors, preview)}
                </li>
            );
        }

        return <div className="struct-block">
            <ul className="fields">
                {fields}
            </ul>
        </div>;
    }
}
