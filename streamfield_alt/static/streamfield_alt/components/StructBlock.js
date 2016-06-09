import React from 'react'
import { BLOCK_TYPES_REGISTRY } from '../config';

export default class StructBlock extends React.Component {
    renderBlock(value, schema, path) {
        const Component = BLOCK_TYPES_REGISTRY[schema.type];
        return <Component value={value} schema={schema} path={path} />;
    }

    render() {
        const fields = [];

        for (let idx in this.props.value) {
            const field = this.props.value[idx];
            const value = field.value;
            const schema = this.props.schema.child_blocks[field.type];
            const path = `${this.props.path}-${field.type}`;

            fields.push(
                <li key={path}>
                    <label for={path}>{schema.label}</label>
                    {this.renderBlock(value, schema, path)}
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
